import { RouteParameters, extractSessionNameAndPasswordFromURL } from '../utils'

export function createSession ({ request, response, sessions }: RouteParameters): unknown {
  const { sessionName, password } = extractSessionNameAndPasswordFromURL(request.url);

  if (sessions.has(sessionName)) {
    return response.writeHead(401, "Session is already taken").end();
  }
  sessions.set(sessionName, { password, peers: new Map(), settings: {} });
  return response.writeHead(201).end();
}