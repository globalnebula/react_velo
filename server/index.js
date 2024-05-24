import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import multer from 'multer';
import { register, login } from './controllers/authController.js';

dotenv.config();

const app = express();

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB');
}).catch(err => {
  console.error('Failed to connect to MongoDB', err);
});

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const storage = multer.memoryStorage();
const upload = multer({ storage });

app.post('/signup', upload.single('avatar'), register);
app.post('/login', login);

const PORT = process.env.PORT || 5173;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
