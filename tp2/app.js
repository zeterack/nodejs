
import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import { tourRouter } from './routes/tour.routes.js'
import { userRouter } from './routes/user.routes.js'

dotenv.config();
const app = express();

// Set up security-related environment variables with defaults if not provided
if (!process.env.JWT_SECRET) {
    process.env.JWT_SECRET = 'my-ultra-secure-secret-key-that-should-be-in-env-file';
    console.warn('WARNING: JWT_SECRET not set in environment variables. Using default secret (not secure for production).');
}

if (!process.env.JWT_EXPIRES_IN) {
    process.env.JWT_EXPIRES_IN = '24h';
    console.warn('WARNING: JWT_EXPIRES_IN not set in environment variables. Using default expiry time.');
}

const DATABASE = process.env.DATABASE;

// Utilisez LOCAL_DATABASE pour le développement local ou DATABASE pour MongoDB Atlas
const connectString = DATABASE;

mongoose.connect(connectString)
    .then(() => {
        console.log("Connection to MongoDB has succeeded !!")
    })
    .catch((err) => {
        console.log("Connection to MongoDB has failed", err)
    })


// 1) MIDDLEWARES 

app.use(express.json())
app.use(express.static(`${process.cwd()}/public`))

app.use(/\/.*\/tours(\/.*)?$/, (req, res, next) => {
    //console.log('Time:', new Date().toISOString())
    req.requestTime = new Date().toISOString();

    next();
}, (req, res, next) => {
    console.log('Request Type:', req.method)
    next()
});



// 3) ROUTES 

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter)


/* app.post('/api/v1/tours', (req, res) => {
    if (Object.keys(req.body).length > 0) {
        const newId = tours[tours.length - 1].id + 1;
        const newTour = { id: newId, ...req.body };
        tours.push(newTour);
        // writeDataToFile(tours);
        res.status(201).json({
            status: "success",
            data: { tour: newTour }
        });
    } else {
        res.status(400).json({
            status: "error",
            message: "No data transmitted"
        });
    }
}) */

export { app } 
