import { 
    getAllTours, 
    getTourById, 
    createTour, 
    updateTour, 
    deleteTour,
    getToursStats,
    getMonthlyPlan,
    getTop5Tours
} from '../services/tour.service.js';
import { Tour } from '../models/tour.model.js';

const checkBody = (req, res, next) => {
    if (!req.body.name || !req.body.price) {
        return res.status(400).json({
            status: "fail",
            message: "Missing name or price"
        });
    }
    next();
};

const checkID = (req, res, next, val) => {
    console.log(`Tour ID : ${val}`);
    if (!val.match(/^[0-9a-fA-F]{24}$/)) {
        return res.status(400).json({
            status: 'fail',
            message: 'Invalid ID format'
        });
    }
    next();
};

const getTop5ToursController = async (req, res, next) => {
    try {
        const tours = await getTop5Tours();
        console.log(`Top 5 tours returned ${tours.length} tours`);
        
        res.status(200).json({
            status: "success",
            requestedTime: req.requestTime,
            results: tours.length,
            data: { tours }
        });
    } catch (err) {
        res.status(404).json({
            status: "fail",
            message: err.message
        });
    }
}

const getAllToursController = async (req, res) => {
    try {
        console.log('In getAllToursController, query:', req.query);
        // EXECUTE QUERY
        const tours = await getAllTours(req.query);
        console.log(`Query returned ${tours.length} tours`);
        
        // SEND RESPONSE
        res.status(200).json({
            status: "success",
            requestedTime: req.requestTime,
            results: tours.length,
            data: { tours }
        });
    } catch (err) {
        res.status(404).json({
            status: "fail",
            message: err.message
        });
    }
};

const getTourByIdController = async (req, res) => {
    try {
        const tour = await getTourById(req.params.id);
        
        if (!tour) {
            return res.status(404).json({
                status: "fail",
                message: "Resource not found on the server"
            });
        }
        
        res.status(200).json({
            status: "success",
            data: { tour }
        });
    } catch (err) {
        res.status(404).json({
            status: "fail",
            message: err.message
        });
    }
};

const createTourController = async (req, res) => {
    try {
        const newTour = await createTour(req.body);
        
        res.status(201).json({
            status: 'success',
            data: {
                tour: newTour
            }
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err.message
        });
    }
};

const updateTourController = async (req, res) => {
    try {
        const tour = await updateTour(req.params.id, req.body);
        
        if (!tour) {
            return res.status(404).json({
                status: "fail",
                message: "Resource to update not found on the server"
            });
        }
        
        res.status(200).json({
            status: "success",
            data: {
                tour
            }
        });
    } catch (err) {
        res.status(400).json({
            status: "fail",
            message: err.message
        });
    }
};

const deleteTourController = async (req, res) => {
    try {
        const tour = await deleteTour(req.params.id);
        
        if (!tour) {
            return res.status(404).json({
                status: "fail",
                message: "Resource to delete not found on the server"
            });
        }
        
        res.status(204).json({
            status: "success",
            data: null
        });
    } catch (err) {
        res.status(400).json({
            status: "fail",
            message: err.message
        });
    }
};

const getTourStatsController = async (req, res) => {
    try {
        const stats = await getToursStats();
        
        res.status(200).json({
            status: "success",
            data: {
                stats
            }
        });
    } catch (err) {
        res.status(404).json({
            status: "fail",
            message: err.message
        });
    }
};

const getMonthlyPlanController = async (req, res) => {
    try {
        const year = parseInt(req.params.year);
        const plan = await getMonthlyPlan(year);
        
        res.status(200).json({
            status: "success",
            data: {
                plan
            }
        });
    } catch (err) {
        res.status(404).json({
            status: "fail",
            message: err.message
        });
    }
};

export { 
    checkID, 
    checkBody, 
    getAllToursController, 
    getTourByIdController, 
    createTourController, 
    updateTourController, 
    deleteTourController,
    getTourStatsController,
    getMonthlyPlanController,
    getTop5ToursController
};
