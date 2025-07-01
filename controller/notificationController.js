const Notification = require('../models/notificationModel');

// Create Notification
const createNotification = async (req, res) => {
    const { userId, message } = req.body;
    try {
        const notification = await Notification.create({ userId, message });
        res.status(201).json({ message: 'Notification created', data: notification });
    } catch (err) {
        res.status(500).json({ message: 'Error creating notification', error: err.message });
    }
};

// Get Notifications by User ID
const getNotificationsByUser = async (req, res) => {
    try {
        const notifications = await Notification.find({ userId: req.params.userId });
        res.status(200).json({ data: notifications });
    } catch (err) {
        res.status(500).json({ message: 'Error fetching notifications', error: err.message });
    }
};

// Mark Notification as Read
const markNotificationAsRead = async (req, res) => {
    try {
        const notification = await Notification.findByIdAndUpdate(
            req.params.id,
            { read: true },
            { new: true }
        );
        if (!notification) {
            return res.status(404).json({ message: 'Notification not found' });
        }
        res.status(200).json({ message: 'Notification marked as read', data: notification });
    } catch (err) {
        res.status(500).json({ message: 'Error updating notification', error: err.message });
    }
};

// Delete Notification
const deleteNotification = async (req, res) => {
    try {
        const notification = await Notification.findByIdAndDelete(req.params.id);
        if (!notification) {
            return res.status(404).json({ message: 'Notification not found' });
        }
        res.status(200).json({ message: 'Notification deleted' });
    } catch (err) {
        res.status(500).json({ message: 'Error deleting notification', error: err.message });
    }
};

module.exports = {
    createNotification,
    getNotificationsByUser,
    markNotificationAsRead,
    deleteNotification,
};