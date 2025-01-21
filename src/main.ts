import express, { Request, Response } from "express";
import { createProxyMiddleware } from "http-proxy-middleware";

function authService() {
  return createProxyMiddleware<Request, Response>({
    target: "http://localhost:3000/api/v1/auth",
    changeOrigin: true,
  });
}

function utilsService() {
  return createProxyMiddleware<Request, Response>({
    target: "http://localhost:3001/api/v1/utils",
    changeOrigin: true,
  });
}

function commercialService() {
  return createProxyMiddleware<Request, Response>({
    target: "http://localhost:3002/api/v1/commercial",
    changeOrigin: true,
  });
}

function pnoService() {
  return createProxyMiddleware<Request, Response>({
    target: "http://localhost:3003/api/v1/pno",
    changeOrigin: true,
  });
}

async function main() {
  try {
    const app = express();
    const port = process.env.PORT || 8000;

    app.use("/api/v1/auth", authService());
    app.use("/api/v1/utils", utilsService());
    app.use("/api/v1/commercial", commercialService());
    app.use("/api/v1/pno", pnoService());

    console.log(`Run reverse proxy server on port: ${port}`);

    app.listen(port);
  } catch (e) {
    console.log(e);
  }
}

main();
