const express = require("express"); // Express app
const router = express.Router(); // Router logic
//const jwt = require('jsonwebtoken'); // Enable JSON Web Tokens

const tripsController = require("../controllers/trips");
const authController = require("../controllers/authentication");

router.route("/register").post(authController.register);
router.route("/login").post(authController.login);

// define route for our trips endpoint
router
    .route("/trips")
    .get(tripsController.tripsList) // GET Method routes tripList
    .post(authController.authenticateJWT, tripsController.tripsAddTrip); // POST Method Adds a Trip

// GET method routes tripsFindByCode - requires parameter
// PUT Method routes tripsUpdateTrip - requres parameter
router
    .route('/trips/:tripCode')
    .get(tripsController.tripsFindByCode)
    .put(authController.authenticateJWT, tripsController.tripsUpdateTrip);


module.exports = router;