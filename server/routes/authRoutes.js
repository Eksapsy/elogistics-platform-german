const passport = require('passport');

module.exports = (app) => {
  app.get(
    '/api/login',
    (req, res) => {
      res.send(false);
    }
  );

  app.post(
    '/api/login',
    passport.authenticate('local', {
      failureRedirect: '/api/login'
    }),
    (req, res) => {
      res.redirect('/');
    }
  )

  app.get(
    '/api/logout',
    (req, res) => {
      req.logout();
      res.redirect('/');
    }
  );

  app.get(
    '/api/profile',
    require('connect-ensure-login').ensureLoggedIn('/api/login'),
    (req, res) => {
      res.send({
        user: {
          id: req.user.id,
          displayName: req.user.displayName,
          username: req.user.username
        }
      });
    }
  )
};