const http = require("http");
const db = require('./models/index');

const port = 9000;

const app = http.createServer((request, response) => {
    if (request.url === "/movies") {
        response.writeHead(200, {"Content-Type" : "text/html"});
        response.write("<h1>All Movies Data in JSON format from Mongo DB</h1>");
        response.end();
    }
    else if (request.url === "/genres") {
        response.writeHead(200, {"Content-Type" : "text/html"});
        response.write("<h1>All Genres Data in JSON format from Mongo DB</h1>");
        response.end();
    }
    else if (request.url === "/artists") {
        response.writeHead(200, {"Content-Type" : "text/html"});
        response.write("<h1>All Artists Data in JSON format from Mongo DB</h1>");
        response.end();
    }
    else {
        response.writeHead(404, {"Content-Type" : "text/html"});
        response.write("<h1>Not Found</h1>");
        response.end();
    }
});

db.mongoose.connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
.then(() => {
    console.log("Connected to the database!");
})
.catch(err => {
    console.log("Cannot connect to the database!", err);
    process.exit();
});

app.listen(port, () => {
    `App started at port ${port}`
});