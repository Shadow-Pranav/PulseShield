const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { User } = require("../storage/mysqlStorage.js");

async function signup(req, res, next) {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return next({
        statusCode: 400,
        message: "Name, email, and password are required"
      });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return next({
        statusCode: 409,
        message: "User already exists"
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      email,
      password: hashedPassword
    });

    const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET || "dev_secret", {
      expiresIn: "7d"
    });

    return res.status(201).json({
      message: "User created successfully",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      }
    });
  } catch (error) {
    return next(error);
  }
}

async function login(req, res, next) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return next({
        statusCode: 400,
        message: "Email and password are required"
      });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return next({
        statusCode: 401,
        message: "Invalid email or password"
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return next({
        statusCode: 401,
        message: "Invalid email or password"
      });
    }

    const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET || "dev_secret", {
      expiresIn: "7d"
    });

    return res.json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      }
    });
  } catch (error) {
    return next(error);
  }
}

module.exports = {
  signup,
  login
};
