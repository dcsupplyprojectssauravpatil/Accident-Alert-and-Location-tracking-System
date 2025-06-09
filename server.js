const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect("mongodb://localhost:27017/profileDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Schema
const ProfileSchema = new mongoose.Schema({
  name: String,
  age: Number,
  mobile: String,
  email: String,
  address: String,
});

const Profile = mongoose.model("Profile", ProfileSchema);

// Route to add new profile
app.post("/add-profile", async (req, res) => {
  try {
    const profile = new Profile(req.body);
    await profile.save();
    res.json({ message: "Profile added successfully" });
  } catch (err) {
    res.status(500).json({ message: "Failed to add profile", error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
// server.js
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const twilio = require('twilio');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const accountSid = 'AC0b300d4c957733549cba331d640ed98a'; // replace
const authToken = '69725871e882e30f45007e08047c23c4';   // replace
const client = twilio(accountSid, authToken);

app.post('/send-sms', (req, res) => {
  const { toPhone, message } = req.body;

  client.messages
    .create({
      body: message,
      from: '7720891406', // e.g., +12055551234
      to: toPhone, // e.g., +919876543210
    })
    .then(message => {
      console.log('SMS sent:', message.sid);
      res.status(200).send({ success: true });
    })
    .catch(error => {
      console.error('SMS failed:', error);
      res.status(500).send({ success: false, error });
    });
});

app.listen(3000, () => console.log('SMS backend running on port 3000'));
<script>
  function sendSMS() {
    const phone = document.getElementById('phoneInput').value.trim();
    const message = "🚨 Accident Detected!\nLocation: Latitude: 19.0760° N, Longitude: 72.8777° E";

    if (!phone.startsWith("+")) {
      alert("⚠️ Please enter the number with country code (e.g., +91...).");
      return;
    }

    fetch("http://localhost:3000/send-sms", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ toPhone: phone, message }),
    })
    .then(res => res.json())
    .then(data => {
      if (data.success) {
        alert("📩 SMS sent successfully to " + phone);
      } else {
        alert("❌ Failed to send SMS.");
      }
    })
    .catch(err => {
      console.error(err);
      alert("⚠️ Error while sending SMS.");
    });
  }
</script>
