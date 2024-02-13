const cluster = require('cluster');
const http = require('http');
const numCPUs = require('os').cpus().length;
const httpProxy = require('http-proxy');

if (cluster.isMaster) {
  const proxy = httpProxy.createProxyServer({});

  // Fork workers.
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  // Create a load balancer
  const balancer = http.createServer((req, res) => {
    const worker = Object.values(cluster.workers)[Math.floor(Math.random() * numCPUs)];
    proxy.web(req, res, { target: `http://localhost:${worker.process.env.PORT}` });
  });

  balancer.listen(4000, () => {
    console.log('Load balancer listening on port 4000');
  });
} else {
  // Workers can share any TCP connection
  // In this case it is an HTTP server
  const app = require('./app');
  const PORT = 4001 + cluster.worker.id;

  app.set('port', PORT);

  const server = http.createServer(app);
  server.listen(PORT);

  console.log(`Worker ${process.pid} started. Listening on port ${PORT}`);
}
