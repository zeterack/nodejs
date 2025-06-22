import express from 'express';
import * as userController from '../controllers/user.controller.js';
import * as authController from '../controllers/auth.controller.js';

const userRouter = express.Router();

// Public routes for authentication
userRouter.post('/signup', authController.signup);
userRouter.post('/login', authController.login);

// All routes after this middleware require authentication
userRouter.use(authController.protect);

// Routes for logged in users to manage their own account
userRouter.get('/me', userController.getMe, userController.getUser);
userRouter.patch('/update-my-password', authController.updatePassword);
userRouter.patch('/update-me', userController.updateMe);
userRouter.delete('/delete-me', userController.deleteMe);

// All routes after this middleware require admin role
userRouter.use(authController.restrictTo('admin'));

// Admin-only routes for user management
userRouter
    .route('/')
    .get(userController.getAllUsers)
    .post(userController.createUser);

userRouter
    .route('/:id')
    .get(userController.getUser)
    .patch(userController.updateUser)
    .delete(userController.deleteUser);

export { userRouter }