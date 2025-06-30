const Notification = require('../models/notificationModel');

//Create a new notification
const createNotification=async(req,res)=>{
    try{
        const{userId,message}=req.body;
        if(!userId||!message){
            return res.status(400).json({message:"userId and message are required"});
        }
        const notification = await Notification.create({
            userId,message,type
    });
    res.status(200).json({message:"Notification created",notification})
    }catch(error){
        console.error("notification sending error",error);
        res.status(500).json({message:"server error"});
    }
}