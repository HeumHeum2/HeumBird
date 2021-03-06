const express = require('express');
const path = require('path');
const next = require('next');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const expressSession = require('express-session');
const dotenv = require('dotenv');
const https = require('https');
const http = require('http');

const dev = process.env.NODE_ENV !== 'production';
const prod = process.env.NODE_ENV === 'production';

const app = next({ dev });
const handle = app.getRequestHandler();
dotenv.config();

app.prepare().then(() => {
  const server = express();

  server.use(morgan('dev'));
  server.use('/', express.static(path.join(__dirname, 'public')));
  server.use(express.json());
  server.use(express.urlencoded({ extended: true }));
  server.use(cookieParser(process.env.COOKIE_SECRET));
  server.use(
    expressSession({
      resave: false,
      saveUninitialized: false,
      secret: process.env.COOKIE_SECRET,
      cookie: {
        httpOnly: true,
        secure: prod,
      },
    }),
  );

  server.get('/p/:id', (req, res) => {
    return app.render(req, res, '/p', {
      id: req.params.id,
      nickname: req.params.nickname,
    });
  });

  server.get('/tag/:tag', (req, res) => {
    return app.render(req, res, '/tag', {
      tag: req.params.tag,
    });
  });

  server.get('/post/:id', (req, res) => {
    return app.render(req, res, '/post', { id: req.params.id });
  });

  server.get('/profile/:nickname', (req, res) => {
    return app.render(req, res, '/profile', {
      nickname: req.params.nickname,
    });
  });

  server.get('*', (req, res) => {
    return handle(req, res);
  });

  if (prod) {
    const lex = require('greenlock-express').create({
      version: 'draft-11',
      configDir: '/etc/letsencrypt',
      server: 'https://acme-v02.api.letsencrypt.org/directory',
      email: 'jwh6295@gmail.com',
      approveDomains: (opts, certs, cb) => {
        if (certs) {
          opts.domains = ['heumbird.com', 'www.heumbird.com'];
        } else {
          opts.email = 'jwh6295@gmail.com';
          opts.agreeTos = true;
        }
        cb(null, { options: opts, certs });
      },
      renewWithin: 81 * 24 * 60 * 60 * 1000,
      renewBy: 80 * 24 * 60 * 60 * 1000,
    });
    https.createServer(lex.httpsOptions, lex.middleware(server)).listen(443);
    http.createServer(lex.middleware(require('redirect-https')())).listen(80);
  } else {
    server.listen(prod ? process.env.PORT : 3000, () => {
      console.log(
        `next+express running on port ${prod ? process.env.PORT : 3000}`,
      );
    });
  }
});
