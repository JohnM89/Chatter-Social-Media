const router = require('express').Router();
const userRoutes = require('./userRoutes'); // Import user routes
const thoughtRoutes = require('./thoughtRoutes'); // Import thought routes

router.use('/user', userRoutes);

router.use('/thought', thoughtRoutes);

module.exports = router;
