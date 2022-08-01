const http = require('http');
const jwt = require('jsonwebtoken');

const hostname = '0.0.0.0';
const port = 3000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/html');
  let out = `Hello World, lots of love, from ${process.env.LOCATION}<hr/>`;
  if (req.headers.authorization) {
    let authHeader = req.headers.authorization;
    out += `Raw Auth = ${authHeader} <hr/>`;
    if (authHeader.startsWith("Bearer ")) {
      let token = authHeader.substring(7, authHeader.length);
      let decoded = jwt.decode(token, {complete: true});
      if (decoded && decoded.payload) {
        out += JSON.stringify(decoded.payload);
      }
    }
  } else {
    out += "No auth header";
  }
  res.end(out);
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
