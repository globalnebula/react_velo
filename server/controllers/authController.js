import User from '../models/User.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const avatar = req.file;

    if (!username || !email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a username, email, and password.',
      });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'An account with this email already exists.',
      });
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      avatar: avatar ? avatar.buffer.toString('base64') : null,
    });

    const savedUser = await newUser.save();
    res.status(201).json({
      success: true,
      message: 'Account created successfully.',
      user: savedUser,
    });
  } catch (error) {
    console.error('Error in registration:', error);
    res.status(500).json({
      success: false,
      message: 'An error occurred while creating the account.',
    });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: 'Please provide an email and password.',
    });
  }

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).json({
      success: false,
      message: 'Invalid email or password.',
    });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(400).json({
      success: false,
      message: 'Invalid email or password.',
    });
  }

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: 86400, 
  });

  res.json({
    success: true,
    message: 'Logged in successfully.',
    token,
    user: {
      id: user._id,
      username: user.username,
      email: user.email,
      avatar: user.avatar,
    },
  });
};
