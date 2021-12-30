import mongoose from 'mongoose';
import donenv from 'dotenv';

donenv.config();

const db = process.env.MONGO_URL;

const connectDB = async () => {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connection is successful!');
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
};

export default connectDB;
