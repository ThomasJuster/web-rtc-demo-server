import WebSocket from 'ws'
import { ok } from 'assert'
import { SocketMessage } from '@web-rtc-demo/shared'

export function parseSocketMessage (data: WebSocket.Data): SocketMessage {
  const messageAsString = data.toString('utf-8')
  const message: SocketMessage = JSON.parse(messageAsString) // let it throw, a message should be JSON.
  ok(message.type, 'SocketMessage must have a "type" property')
  switch (message.type) {
    case "connected-peers-id":
      ok(Array.isArray(message.peerIds), 'peerIds must be an array');
      break
    case "offer":
    case "answer":
      ok(message.answererId, 'SocketMessage must have property "answererId"');
      ok(message.description, 'SocketMessage must have property "description"');
      ok(message.offererId, 'SocketMessage must have property "offererId"');
      break;
    case "ice-candidate":
      ok(message.fromPeerId);
      ok(message.toPeerId);
      ok(message.candidate);
      break;
    case "keep-alive":
      break;
    default:
      throw new Error('SocketMessage must have a valid "type" property');
  }

  return message;
}