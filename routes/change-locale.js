var express = require('express');
var router = express.Router();

router.get('/:locale', function (req, res, next) {
  const locale = req.params.locale;

  res.cookie('nodeCasa-locale', locale, {
    maxAge: 1000 * 60 * 60 * 24 * 30,
  });

  res.redirect(req.get('referer'));
});

module.exports = router;
