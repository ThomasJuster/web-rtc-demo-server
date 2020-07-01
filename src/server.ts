import { createServer, IncomingMessage } from "http";
import WebSocket from "ws";
import { ok } from 'assert'
import { SocketMessage } from '@web-rtc-demo/shared'
import { routes } from './routes'
import { extractSessionNameAndPasswordFromURL, parseSocketMessage, cors } from './utils'

export type SessionName = string;
export type SessionPassword = string | null;
interface Session {
  password: SessionPassword;
  peers: Map<string, WebSocket>;
  settings: {
    [PeerId: string]: SessionPeerSettings;
  }
}

interface SessionPeerSettings {
  muted: boolean;
  volume: number;
  // probably others.
}

export type Sessions = Map<SessionName, Session>;

const sessions: Sessions = new Map();

const server = createServer((request, response) => {
  cors(response)
  if (request.method?.toUpperCase() === 'OPTIONS') return response.writeHead(204).end();
  
  const route = `${request.method?.toUpperCase()} ${request.url}`;
  const [_, handler] = Object.entries(routes).find(([pattern]) => new RegExp(pattern).test(route)) || [null, null];
  console.info('route', route)
  console.info('handler', handler?.name)
  if (!handler) {
    return response.writeHead(404).end();
  }
  console.info('execute handler', handler)
  handler({ request, response, sessions });
});


function send (client: WebSocket, data: SocketMessage): void {
  return client.send(JSON.stringify(data))
}

const webSocketServer = new WebSocket.Server({ server });

webSocketServer.on('connection', (client: WebSocket, request: IncomingMessage) => {
  const url = new URL(request.url, 'http://whatever.com')
  const { sessionName } = extractSessionNameAndPasswordFromURL(request.url);
  console.info('sessions', sessions, 'sessionName', sessionName)
  const session = sessions.get(sessionName)
  ok(session);
  const { peers } = session;
  const newPeerId = url.searchParams.get('peerId');
  ok(newPeerId);
  console.info('new connection of peer:', newPeerId);
  
  send(client, { type: "connected-peers-id", peerIds: Array.from(peers.keys()) });
  peers.set(newPeerId, client);

  client.on('close', () => {
    console.info('on close', newPeerId)
    peers.delete(newPeerId);
    if (peers.size === 0) {
      sessions.delete(sessionName);
    }
  })

  client.on('message', (message: WebSocket.Data) => {
    const socketMessage = parseSocketMessage(message);

    switch (socketMessage.type) {
      case 'offer':
        // send the offerer’s offer to the answerer
        const answererSocket = session.peers.get(socketMessage.answererId);
        ok(answererSocket);
        return send(answererSocket, socketMessage);
      case 'answer':
        // send the answerer’s answer to the offerer
        const offererSocket = session.peers.get(socketMessage.offererId);
        ok(offererSocket);
        return send(offererSocket, socketMessage);
      case 'ice-candidate':
        // exchange ice candidates
        const peerSocket = session.peers.get(socketMessage.toPeerId);
        ok(peerSocket);
        return send(peerSocket, socketMessage);
      case 'keep-alive':
        return console.info('maintain client socket', newPeerId);
      default:
        throw new Error(`unknown data: ${JSON.stringify(socketMessage, null, 2)}`);
    }
  })
})

const PORT = 43210
server.listen(PORT, () => console.info('listening on port', PORT))
