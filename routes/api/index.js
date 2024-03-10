const router = require('express').Router();
const userRoutes = require('./userRoutes'); // Import user routes
const thoughtRoutes = require('./thoughtRoutes'); // Import thought routes

// Mount user routes under the /user base path
router.use('/user', userRoutes);

// Mount thought routes under the /thought base path
router.use('/thought', thoughtRoutes);

module.exports = router;
