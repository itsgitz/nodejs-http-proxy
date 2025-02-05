import express, { Request, Response } from "express";
import { createProxyMiddleware } from "http-proxy-middleware";

const servicesUrl: Record<string, string> = {
  UTILS: "http://localhost:3001/api/v1/utils",
  COMMERCIAL: "http://localhost:3002/api/v1/commercial",
  PNO: "http://localhost:3003/api/v1/pno",
  AUTH: "http://localhost:3004/api/v1/auth",
};

function runService(target: string) {
  return createProxyMiddleware<Request, Response>({
    target,
    changeOrigin: true,
    logger: console,
  });
}

async function main() {
  try {
    const app = express();
    const port = process.env.PORT || 8000;

    app.use("/api/v1/auth", runService(servicesUrl["AUTH"]));
    app.use("/api/v1/utils", runService(servicesUrl["UTILS"]));
    app.use("/api/v1/commercial", runService(servicesUrl["COMMERCIAL"]));
    app.use("/api/v1/pno", runService(servicesUrl["PNO"]));

    console.log(`Run reverse proxy server on port: ${port}`);

    app.listen(port);
  } catch (e) {
    console.log(e);
  }
}

main();
