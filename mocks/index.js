// async function initMocks() {
//   if (typeof window === 'undefined') {
//     const { server } = await import('./server');
//     server.listen();
//   } else {
//     const { worker } = await import('./browser');
//     worker.start();
//   }
// }

// initMocks();

if (typeof window === 'undefined') {
  const { server } = require('./server');
  server.listen();
} else {
  const { worker } = require('./browser');
  worker.start();
}
