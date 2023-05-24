import express from 'express';
import mongoose from 'mongoose';
import multer from 'multer';
import {
  registerValidator,
  loginValidator,
  postCreateValidator,
} from './validations/validations.js';
import checkAuth from './utils/checkAuth.js';
import { UserController, PostController } from './controllers/index.js';
import handelValidationErrors from './utils/handelValidationErrors.js';

const PORT = 4444;
const CONNECT_STR = 'mongodb://localhost:27017/ToDo';
const app = express();

const storage = multer.diskStorage({
  destination: (_, __, cb) => {
    cb(null, 'uploads');
  },
  filename: (_, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

mongoose
  .connect(CONNECT_STR)
  .then(() => console.log('DB OK!'))
  .catch((err) => console.log('Errror:' + err));

app.use(express.json());
app.use('/uploads', express.static('uploads'));

app.post('/auth/register/', registerValidator, handelValidationErrors, UserController.register);

app.post('/auth/login/', loginValidator, handelValidationErrors, UserController.login);

app.get('/auth/me/', checkAuth, UserController.getMe);

app.post('/posts/', checkAuth, postCreateValidator, PostController.create);

app.get('/posts/', PostController.getAll);

app.get('/posts/:id', PostController.getOne);

app.delete('/posts/:id', checkAuth, PostController.remove);

app.patch('/posts/:id', checkAuth, postCreateValidator, PostController.update);

app.post('/uploads/', checkAuth, upload.single('image'), (req, res) => {
  res.json({
    url: `/uploads/${req.file.originalname}`,
  });
});

app.listen(PORT, (err) => {
  err ? console.log('Error:' + err) : console.log('server OK!');
});
