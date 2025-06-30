const Account = require('../models/newAccount');

// Register User
const registerAccount = async (req, res) => {
  const { firstName, lastName, email, phoneNumber } = req.body;

  if (!firstName || !lastName || !email || !phoneNumber) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const existingAccount = await Account.findOne({ phoneNumber });
    if (existingAccount) {
      return res.status(400).json({ message: 'Account already exists' });
    }

    const newAccount = new Account({ firstName, lastName, email, phoneNumber });
    await newAccount.save();

    res.status(201).json({
      message: 'Account registered successfully',
      account: newAccount
    });
  } catch (err) {
    res.status(500).json({ message: 'Registration failed', error: err.message });
  }
};

// Generate OTP
const generateOTP = async (req, res) => {
  const { phoneNumber } = req.body;
  if (!phoneNumber) {
    return res.status(400).json({ message: 'Phone number is required' });
  }

  const otp = Math.floor(1000 + Math.random() * 9000); // 4-digit OTP

  try {
    const updatedAccount = await Account.findOneAndUpdate(
      { phoneNumber },
      { otp, createdAt: Date.now() },
      { new: true }
    );

    if (!updatedAccount) {
      return res.status(404).json({ message: 'Account not found' });
    }

    console.log(`Generated OTP for ${phoneNumber}: ${otp}`);
    res.status(200).json({ message: 'OTP generated successfully (check console)' });
  } catch (error) {
    res.status(500).json({ message: 'OTP generation failed', error: error.message });
  }
};

// Verify OTP
const verifyOTP = async (req, res) => {
  const { phoneNumber, otp } = req.body;

  if (!phoneNumber || !otp) {
    return res.status(400).json({ message: 'Phone and OTP are required' });
  }

  try {
    const account = await Account.findOne({ phoneNumber });

    if (!account) {
      return res.status(404).json({ message: 'Account not found' });
    }

    if (account.otp === parseInt(otp)) {
      account.otp = null;
      await account.save();
      return res.status(200).json({ message: 'OTP verified successfully' });
    } else {
      return res.status(400).json({ message: 'Invalid OTP' });
    }
  } catch (error) {
    res.status(500).json({ message: 'OTP verification failed', error: error.message });
  }
};

module.exports = { registerAccount, generateOTP, verifyOTP };
