import express, { Request, Response } from 'express';
import cors from "cors"
import cookieParser from 'cookie-parser';
import rateLimit from 'express-rate-limit';
import ApiError from './utils/ApiError';
import globalErrorHandler from './middlewares/globalErrorHandler.middleware';

// Start the express app
const app = express();

// Middlewares

//1.
// app.use(cors({
//     origin: process.env.CORS_ORIGIN,
//     credentials: true
// }))

app.use(cors());
app.use(express.json({ limit: '100kb' }));
app.use(express.urlencoded({ extended: true, limit: '100kb' }));
app.use(cookieParser());

// Limit requests from same API
const limiter = rateLimit({
    max: 100,
    windowMs: 60 * 60 * 1000,
    message: 'Too many requests from this IP, please try again in an hour!'
});
app.use('/api', limiter);


//Routes Import
import userRoutes from './routes/user.route';
import authRoutes from './routes/auth.route';
import uploadRoutes from './routes/upload.route';
import blogRoutes from './routes/blog.route'

//Mount the routes
app.get('/', (req: Request, res: Response) => {
    res.send('Dummy Route!');
});

app.use('/api/v1', authRoutes);
app.use('/api/v1/upload',uploadRoutes);
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/blogs', blogRoutes);

app.all('*', (req, res, next) => {
    res.status(404).send(`Can't find ${req.originalUrl} on this server!`)
    next(new ApiError(404, `Can't find ${req.originalUrl} on this server!`));
});

// Global Error Handler
app.use(globalErrorHandler)


export { app };