// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();
var dotenv = require('dotenv').config();
// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 }));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
    res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
    console.log(req.body)
    res.json({ greeting: 'hello API' });
});

app.get("/api/:date", (req, res) => {
    const date = req.params.date
    const unix = new Date().getTime()
    const reg = /^[a-zA-Z]+$/
    if (date.match(reg)) {
        console.log("Oh oh")
        res.json({ error: "Invalid Date" })
    }
    if (date.includes("-")) {
        res.json({ "unix": new Date(date).getTime(), "utc": new Date(date).toUTCString() });
    } else {
        res.json({ "unix": date, "utc": new Date(Number(date)).toUTCString() });
    }
})

app.get("/api", (req, res) => {
    res.json({ "unix": new Date().getTime(), "utc": new Date().toUTCString() })
})


// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
    console.log('Your app is listening on port ' + listener.address().port);
});
