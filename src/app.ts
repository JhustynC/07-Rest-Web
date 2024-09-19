import http from "http";

const server = http.createServer((req, res) => { 
  

  console.log(req.url);


  // res.writeHead(200, { "Content-Type": "application/json" });
  // res.write(JSON.stringify({ message: "Hello, World!" }));
  res.write("Hello, World!");
  res.end();
});

server.listen(8080, () => {
  console.log("Server is running on port 8080");
});