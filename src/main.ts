import express, {Request, Response} from "express"
import {createProxyMiddleware} from "http-proxy-middleware";

function proxyMiddleware() {
  return createProxyMiddleware<Request, Response>({
    target: 'http://localhost:3000/api/v1/auth',
    changeOrigin: true
  })
}

async function main() {
  try {
    const app = express()
    const port = process.env.PORT || 8000

    app.use('/api/v1/auth', proxyMiddleware());

    console.log(`Run reverse proxy server on port: ${port}`)

    app.listen(port);
  } catch (e) {
    console.log(e)
  } 
}

main()
