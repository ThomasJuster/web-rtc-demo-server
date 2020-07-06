import { Sessions } from '../server'
import { IncomingMessage, ServerResponse } from 'http'

export interface RouteParameters<Params extends {} = {}> {
  sessions: Sessions;
  request: IncomingMessage;
  response: ServerResponse;
  params: Params;
}