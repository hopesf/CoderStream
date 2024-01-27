import http from 'http';
import hmr from 'node-hmr';
import dotenv from 'dotenv';

let app: http.RequestListener;

// Configuration
dotenv.config({ path: `.env.${process.env.NODE_ENV}` });

hmr(async () => {
  // eslint-disable-next-line no-console
  console.log('Reloading app...');
  ({ default: app } = await import('./app'));
});

const server = http.createServer((req, res) => app(req, res));

try {
  if (!process.env.PORT) {
    throw new Error('Lütfen .env dosyasını kontrol ediniz. PORT değeri bulunamadı.');
  }

  server.listen(process.env.PORT, () => {
    // eslint-disable-next-line no-console
    console.log(`[CoderStream] developer için hazır!, port: ${process.env.PORT}`);
  });
} catch (error) {
  // eslint-disable-next-line no-console
  console.error(error);
}
