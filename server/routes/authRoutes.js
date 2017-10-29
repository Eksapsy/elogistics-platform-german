const passport = require('passport');

module.exports = (app) => {
  app.get(
    '/api/login',
    (req, res) => {
      res.render('login');
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
    require('connect-ensure-login').ensureLoggedIn(),
    (req, res) => {
      res.send('profile', {
        user: req.user
      });
    }
  )
};