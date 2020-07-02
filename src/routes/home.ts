import { RouteParameters } from 'src/utils'

export function home ({ response, sessions }: RouteParameters): void {
  response.setHeader('Content-Type', 'text/html')
  response.write(`
    <h1>Current connections: ${sessions.size}</h1>
    <h3>Copy this Server URL below</h3>
    <input>
    <script type="text/javascript">
      (() => {
        document.querySelector('input').value = window.location.href
      })()
    </script>
  `)
  response.end()
}
