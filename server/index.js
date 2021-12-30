import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import connectDB from './config/db.js';

import postRoutes from './routes/postRoutes.js';
import userRoutes from './routes/userRoutes.js';

const app = express();

app.use(express.json());
app.use(cors()); // must be defined before routes...
app.use(morgan('dev'));

//* Connet to DB;
connectDB();

//* Define routes
app.use('/api/posts', postRoutes);
app.use('/api/users', userRoutes);

app.get('/', (req, res) =>
  res.json({
    author: 'Kerem Akman',
    msg: 'Welcome to MERV Stack App server side!',
  })
);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server is running on port: ${PORT}`));
