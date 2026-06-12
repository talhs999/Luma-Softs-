const { createServer } = require("http");
const { parse } = require("url");
const next = require("next");
const { loadEnvConfig } = require('@next/env');

const projectDir = process.cwd();
loadEnvConfig(projectDir);

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev, hostname: 'localhost', port: 3000 });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  createServer((req, res) => {
    const parsedUrl = parse(req.url, true);
    handle(req, res, parsedUrl);
  }).listen(process.env.PORT || 3000, (err) => {
    if (err) throw err;
    console.log("> Ready on http://localhost:" + (process.env.PORT || 3000));
  });
});
