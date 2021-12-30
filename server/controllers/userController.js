import User from '../models/userModel.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
dotenv.config();

//* /api/users/signup - Register&Sign up a user - Public
export const signup = async (req, res) => {
  if (Object.keys(req.body).length === 0)
    return res
      .status(400)
      .json({ alert: { status: 'fail', msg: 'No data provided!' } });

  try {
    const { firstName, lastName, email, password, passwordConfirm } = req.body;
    // check field are empty
    if (!(firstName && lastName && email && password))
      return res.status(400).json({
        alert: {
          status: 'fail',
          msg: 'All fields are required! Please provide all informations.',
        },
      });

    // check passwordConfirm is same with password - are matched
    if (password !== passwordConfirm)
      return res
        .status(400)
        .json({ alert: { status: 'fail', msg: 'Passwords do not match!' } });

    // check existing user
    const existingUser = await User.findOne({ email });

    if (existingUser)
      return res
        .status(400)
        .json({ alert: { status: 'fail', msg: 'User already exist!' } });

    // password hash
    const hashedPassword = await bcrypt.hash(password, 12);

    // save user into Db
    const newUser = await User.create({
      email: email.toLowerCase(),
      password: hashedPassword,
      name: `${firstName} ${lastName}`,
    });

    // Create token
    const jwtPayload = { email: newUser.email, id: newUser._id };
    const token = jwt.sign(jwtPayload, process.env.JWT_SECRET, {
      expiresIn: '90d',
    });

    res.status(200).json({
      alert: {
        status: 'success',
        msg: `Account created. Welcome ${newUser.name}`,
      },
      result: newUser,
      token,
    });
  } catch (error) {
    res.status(500).json({
      alert: {
        status: 'fail',
        msg: error.message,
      },
    });
  }
};

//* /api/users/signin - Login&Sign in a user - Public
export const signin = async (req, res) => {
  try {
    const { email, password } = req.body;
    // check fields are empty
    if (!(email && password))
      return res.status(400).json({
        alert: {
          status: 'fail',
          msg: 'Both fields are required! Please provide email and password.',
        },
      });

    const user = await User.findOne({ email: email.toLowerCase() });
    // check user
    if (!user)
      return res.status(400).json({
        alert: {
          status: 'fail',
          msg: 'User does not exist! Please sign up.',
        },
      });

    // check password
    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect)
      return res
        .status(400)
        .json({ alert: { status: 'fail', msg: 'Invalid credentials!' } });

    // everythin is ok, create token
    const token = jwt.sign({ email, id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '90d',
    });

    res.status(200).json({
      alert: {
        status: 'success',
        msg: `Sign in successful. Welcome ${user.name}!`,
      },
      result: user,
      token,
    });
  } catch (error) {
    res.status(500).json({
      alert: {
        status: 'fail',
        msg: error.message,
      },
    });
  }
};
