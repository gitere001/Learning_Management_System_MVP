import express from 'express';
import dotenv from 'dotenv';
import corsMiddleware from './config/cors.js'
import connectDB from './config/db.js';
import authRouter from './routes/auth.routes.js';
import cookieParser from 'cookie-parser'
import courseRouter from './routes/course.router.js';
import mpesaRouter from './routes/mpesa.routes.js'
import path from 'path'


dotenv.config();
connectDB()


const app = express();
const PORT = process.env.PORT || 3000;


app.use(corsMiddleware);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())
app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));

app.use('/api/v1/auth', authRouter)
app.use('/api/v1/courses', courseRouter)
app.use(mpesaRouter)


app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the API' });
});


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
