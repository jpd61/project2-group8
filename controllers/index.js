const router = require('express').Router();

const apiRoutes = require('./api');
const homeRoutes = require('./home-routes.js');
const whiskeyRoutes = require('./whiskey_routes');

router.use('/api', apiRoutes);
router.use('/', homeRoutes);
router.use('/whiskey/', whiskeyRoutes);

router.use((req, res) => {
  res.status(404).end();
});

module.exports = router;