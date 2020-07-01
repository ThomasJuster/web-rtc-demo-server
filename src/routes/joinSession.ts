import { RouteParameters, extractSessionNameAndPasswordFromURL } from '../utils'

export function joinSession ({ request, response, sessions }: RouteParameters): unknown {
  const { sessionName, password } = extractSessionNameAndPasswordFromURL(request.url);
  return sessions.get(sessionName)?.password === password
    ? response.writeHead(200).end()
    : response.writeHead(403).end();
}