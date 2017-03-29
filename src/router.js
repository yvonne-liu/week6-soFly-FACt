const handler = require('./handler.js');
const _url = require('url');

const router = (req, res) => {
  const url = req.url;
  const pathname = _url.parse(url).pathname;

  const page = {
    '/' : 'index.html',
    '/user' : 'user.html',
  }[pathname];

  const api = {
    '/teams' : handler.teamSearch,
    '/users' : handler.userSearch,
  }[pathname];

  // ROUTES:
  if (page) {
    handler.serveStatic(req, res, page);

  } else if (api) {
    api(req, res);

  } else if (url.indexOf('/public')===0) {
    handler.servePublic(req, res);

  } else {
    handler.serveError(req, res);

  }
};

module.exports = router;