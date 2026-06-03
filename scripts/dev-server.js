const http = require("http");
const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const port = process.env.PORT || 3000;

const mime = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".svg": "image/svg+xml; charset=utf-8"
};

function send(res, status, file) {
  fs.readFile(file, (error, data) => {
    if (error) {
      res.writeHead(500, { "Content-Type": "text/plain; charset=utf-8" });
      res.end("Server error");
      return;
    }

    res.writeHead(status, { "Content-Type": mime[path.extname(file)] || "application/octet-stream" });
    res.end(data);
  });
}

http
  .createServer((req, res) => {
    const requestPath = decodeURIComponent(req.url.split("?")[0]);
    const safePath = path.normalize(requestPath).replace(/^(\.\.[/\\])+/, "");
    const staticFile = path.join(root, safePath);

    if (requestPath !== "/" && fs.existsSync(staticFile) && fs.statSync(staticFile).isFile()) {
      send(res, 200, staticFile);
      return;
    }

    send(res, 200, path.join(root, "index.html"));
  })
  .listen(port, () => {
    console.log(`Gandhinagar City Guide running at http://localhost:${port}`);
  });
