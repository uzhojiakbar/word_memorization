// netlify/functions/login.js
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("./userModel"); // User schema kerak bo'ladi

const mongoURI = process.env.MONGO_URI; // Atlas ulanish URI

let conn = null;

async function connectToDB() {
  if (conn == null) {
    conn = await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  }
}

exports.handler = async (event, context) => {
  await connectToDB();

  const { username, password } = JSON.parse(event.body);

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return {
        statusCode: 400,
        body: JSON.stringify({ msg: "Invalid credentials" }),
      };
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return {
        statusCode: 400,
        body: JSON.stringify({ msg: "Invalid credentials" }),
      };
    }

    const token = jwt.sign({ userId: user._id }, "yourSecretKey", {
      expiresIn: "1h",
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ token }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ msg: "Server error" }),
    };
  }
};
