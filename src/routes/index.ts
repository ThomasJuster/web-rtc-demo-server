import { createSession } from './createSession'
import { joinSession } from './joinSession'
import { sessionExists } from './sessionExists'
import { home } from './home'
import { API_ROUTES } from '@web-rtc-demo/shared'

type ApiRouteName = keyof typeof API_ROUTES
type ApiRoute = (typeof API_ROUTES)[ApiRouteName]

interface Route extends ApiRoute {
  handler:
    | typeof createSession
    | typeof joinSession
    | typeof sessionExists
    | typeof home;
}
export const routes: { [Key in ApiRouteName | 'home']: Route } = {
  createSession: {
    ...API_ROUTES.createSession,
    handler: createSession,
  },
  joinSession: {
    ...API_ROUTES.joinSession,
    handler: joinSession,
  },
  sessionExists: {
    ...API_ROUTES.sessionExists,
    handler: sessionExists,
  },
  home: {
    method: 'GET',
    pathname: '/',
    query: {},
    handler: home,
  },
}
