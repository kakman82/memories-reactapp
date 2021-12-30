import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const verifyToken = async (req, res, next) => {
  try {
    const token = req.headers?.authorization.split(' ')[1];
    // check token comes from google or our app
    // google token'S length more than 500
    const isCustomToken = token.length < 500;

    if (!token)
      return res.status(400).json({
        alert: {
          status: 'fail',
          msg: 'No token provided, authorization denied',
        },
      });
    let decoded;
    if (token && isCustomToken) {
      // if token is not from google
      decoded = await jwt.verify(token, process.env.JWT_SECRET);
      req.userId = decoded?.id;
    } else {
      // if it is from google;
      // for decode not need jwt secret
      decoded = await jwt.decode(token);
      req.userId = decoded?.sub; // sub is google id name for users
    }
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({
      alert: {
        status: 'fail',
        msg: 'Token is not valid. Please logout and sign-in again!',
      },
    });
  }
};

export default verifyToken;
