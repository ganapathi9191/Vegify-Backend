const express = require('express');
const router = express.Router();
const {login, forgotPassword, } = require('../controller/userController');
const {
    generateOTP,
    verifyOTP, 
    registerAccount
} = require('../controller/newAccountCont');
const { createLocation, getAllLocations } = require('../controller/locationController');



//Registration router
router.post('/login' , login);
router.put('/forgot-password', forgotPassword);



router.post('/register_Account', registerAccount);
router.post('/generate-otp', generateOTP);
router.post('/verify-otp', verifyOTP);


//  Location router
router.post('/create', createLocation);
router.get('/all', getAllLocations);



module.exports = router;
