import { Sessions } from '../server'
import { IncomingMessage, ServerResponse } from 'http'

export interface RouteParameters {
  sessions: Sessions;
  request: IncomingMessage;
  response: ServerResponse;
}