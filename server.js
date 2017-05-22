var express = require('express');
var httpProxy = require('http-proxy');
var Agent = require('agentkeepalive');

var agent = new Agent({
  maxSockets: 100,
  keepAlive: true,
  maxFreeSockets: 10,
  keepAliveMsecs: 100000,
  timeout: 6000000,
  keepAliveTimeout: 90000 // free socket keepalive for 90 seconds
});

var proxy = httpProxy.createProxy({ target: 'http://10.134.116.186:1521', agent: agent });

// Modify headers of the request before it gets sent
proxy.on('proxyRes', function(proxyRes) {
  var key = 'www-authenticate';
  proxyRes.headers[key] = proxyRes.headers[key] && proxyRes.headers[key].split(',');
});

var app = express();

app.use(function(req, res) {
  proxy.web(req, res);
});

app.listen(4000);
