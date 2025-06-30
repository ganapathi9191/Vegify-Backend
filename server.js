const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const authroutes = require('./routes/authroutes');

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());


mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB Connected')
  })
  .catch((err) => {
    console.log('Mongo Error:', err)}
);

app.use('/api', authroutes);


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`server running on port${PORT}`)
});
