const fs = require('fs');
const http = require('http');
const url = require('url');
const path = require('path');

const root = path.resolve(process.argv[2] || '.')

const server = http.createServer((request, response) => {

  let url_pathname = url.parse(request.url).pathname
  let file_path = path.join(root, url_pathname)

  fs.stat(file_path, (err, stat) => {
    if (!err && stat.isFile()) {
      console.log('200 ' + request.url)
      response.writeHead(200)
      fs.createReadStream(file_path).pipe(response)
    } else {
      console.log('404 ' + request.url)
      response.writeHead(404)
      response.end('404 not found')
    }
  })
})

server.listen('8080')