import express from 'express';
import { 
    getAllToursController, 
    getTourByIdController, 
    createTourController, 
    updateTourController, 
    deleteTourController,
    checkBody, 
    checkID,
    getTourStatsController,
    getMonthlyPlanController,
    getTop5ToursController
} from '../controllers/tour.controller.js';
import * as authController from '../controllers/auth.controller.js';

const tourRouter = express.Router();
// A router object is an isolated instance of middleware and routes. 
// You can think of it as a "mini-application," capable only of performing middleware and routing functions. 

tourRouter.param('id', checkID);

// Public routes - accessible to everyone
// Alias route for top 5 cheap tours
tourRouter
    .route('/top-5-cheap')
    .get(getTop5ToursController);

// Tour stats route
tourRouter
    .route('/tour-stats')
    .get(getTourStatsController);

// Routes below require authentication
tourRouter.use(authController.protect);

// Monthly plan route - Protected and restricted to admin, moderator
tourRouter
    .route('/monthly-plan/:year')
    .get(
        authController.restrictTo('admin', 'moderator'),
        getMonthlyPlanController
    );

// Basic routes for all tours
tourRouter
    .route('/')
    .get(getAllToursController) // Authenticated users can view all tours
    .post(
        authController.restrictTo('admin', 'moderator'),
        checkBody,
        createTourController
    ); // Only admin and moderator can create tours

// Routes for specific tour with ID
tourRouter
    .route('/:id')
    .get(getTourByIdController) // Authenticated users can view tour details
    .patch(
        authController.restrictTo('admin', 'moderator'),
        updateTourController
    ) // Only admin and moderator can update tours
    .delete(
        authController.restrictTo('admin'), // Only admin can delete tours
        deleteTourController
    );

export { tourRouter };

//A router object is an isolated instance of middleware and routes. You can think of it as a “mini-application,” capable only of performing middleware and routing functions. Every Express application has a built-in app router.