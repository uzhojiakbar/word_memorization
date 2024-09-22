// netlify/functions/register.js
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
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
    let user = await User.findOne({ username });
    if (user) {
      return {
        statusCode: 400,
        body: JSON.stringify({ msg: "User already exists" }),
      };
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    user = new User({ username, password: hashedPassword });
    await user.save();

    return {
      statusCode: 200,
      body: JSON.stringify({ msg: "User registered successfully" }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ msg: "Server error" }),
    };
  }
};
