import fs from "fs";
import http2 from "http2";

const server = http2.createSecureServer(
  {
    key: fs.readFileSync("./keys/server.key"),
    cert: fs.readFileSync("./keys/server.crt"),
  },
  (req, res) => {
    console.log(req.url);

    // res.writeHead(200, { "Content-Type": "text/html" });
    // res.write("<h1>Hello, World!</h1>");

    // const data = { name: "Jhon Doe", age: 30, city: "New York" };
    // res.writeHead(200, { "Content-Type": "application/json" });
    // res.end(JSON.stringify(data));
    // res.end();

    if (req.url === "/api") {
      const htmlFile = fs.readFileSync("./public/index.html", "utf-8");
      res.writeHead(200, { "Content-Type": "text/html" });
      res.end(htmlFile);
      return;
    }

    if (req.url?.endsWith(".js")) {
      res.writeHead(200, { "Content-Type": "application/javascript" });
      res.end();
      return;
    }

    if (req.url?.endsWith(".css")) {
      res.writeHead(200, { "Content-Type": "text/css" });
      res.end();
      return;
    }

    try {
      const repsonseContent = fs.readFileSync(`./public${req.url}`, "utf-8");
      res.end(repsonseContent);
    } catch (error) {
      res.writeHead(404, { "Content-Type": "text/html" });
      res.end("<h1>Page not found</h1>");
    }
  }
);

server.listen(8080, () => {
  console.log("Server is running on port https://localhost:8080");
});
