const express = require('express');
const router = express.Router();
const { loginByUsername } = require('../controller/userController');
const {generateOTP,verifyOTP, registerAccount} = require('../controller/newAccountCont');
const { createLocation, getAllLocations } = require('../controller/locationController');
const notificationController = require('../controller/notificationController');





// 👤 Login with username and password
router.post('/login', loginByUsername);

//register
router.post('/register_Account', registerAccount);
router.post('/generate-otp', generateOTP);
router.post('/verify-otp', verifyOTP);


//  Location router
router.post('/locations', createLocation);
router.get('/locations', getAllLocations);


//Notification router
router.post('/notification', notificationController.createNotification);
router.get('/notification/:userId', notificationController.getNotificationsByUser);
router.put('/notification/read/:id', notificationController.markNotificationAsRead);
router.delete('/notification/:id', notificationController.deleteNotification);



module.exports = router;
