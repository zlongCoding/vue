const express = require('express')
const app = express()
const compression = require('compression')
const path = require('path')
const fs = require('fs')
const resolve = file => path.resolve(__dirname, file)

const serve = (path, cache) => express.static(resolve(path), {
  maxAge: 0
})

app.use(compression({ threshold: 0 }))
app.use('/', serve('./dist'))

app.get(/\.json$/, function (req, res) {
  var json = null;
  var path = __dirname + '/data' + req.url;
  if (fs.existsSync(path)) {
    json = fs.readFileSync(path, 'utf8');
  } else {
    json = '{"status":404}'
  }
  res.set('Content-Type', 'application/json; charset=utf-8');
  res.end(json)
});


app.use(compression());
app.use(express.static(__dirname+'/dist'));

app.listen(8080)

console.log("😄.....let's Rock N' Roll 🍺.🍺.🍺..✨...🔥.....")
