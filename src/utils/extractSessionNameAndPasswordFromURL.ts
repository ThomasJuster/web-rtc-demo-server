import { ok } from 'assert'
import { URL } from 'url'
import { SessionName, SessionPassword } from '../server'

interface SessionNameAndPassword {
  sessionName: SessionName;
  password: SessionPassword;
}

export function extractSessionNameAndPasswordFromURL (url: string | undefined): SessionNameAndPassword {
  ok(url);
  const { pathname, searchParams } = new URL(url, 'http://localhost');
  return {
    sessionName: pathname.replace('/sessions/', ''),
    password: searchParams.get('password') || null,
  }
}