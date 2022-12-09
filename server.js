var fs = require("fs"),
  http = require("http");

http
  .createServer(function (req, res) {
    const headers = {
      "Access-Control-Allow-Origin": "*" /* @dev First, read about security */,
      "Access-Control-Allow-Methods": "OPTIONS, GET",
      "Access-Control-Max-Age": 2592000, // 30 days
      /** add other headers as per requirement */
    };
    if (req.method === "OPTIONS") {
      res.writeHead(204, headers);
      res.end();
      return;
    }

    if (["GET"].indexOf(req.method) > -1) {
      fs.readFile(__dirname + req.url, function (err, data) {
        if (err) {
          res.writeHead(404);
          res.end(JSON.stringify(err));
          return;
        }
        res.writeHead(200, headers);
        res.end(data);
        return;
      });

      return;
    }
    res.writeHead(405, headers);
    res.end(`${req.method} is not allowed for the request.`);
  })
  .listen(8080);

console.log("serving");
