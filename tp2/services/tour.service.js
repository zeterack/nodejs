import { Tour } from '../models/tour.model.js';
import APIFeatures from '../utils/apiFeatures.js';

const getAllTours = async (queryObj) => {
    try {
        // BUILD QUERY
        const features = new APIFeatures(Tour.find(), queryObj)
            .filter()
            .sort()
            .limitFields()
            .paginate();
        
        // EXECUTE QUERY
        const tours = await features.query;
        
        return tours;
    } catch (err) {
        throw err;
    }
};

const getTourById = async (id) => {
    try {
        const tour = await Tour.findById(id);
        return tour;
    } catch (err) {
        throw err;
    }
};

const createTour = async (tourData) => {
    try {
        const newTour = await Tour.create(tourData);
        return newTour;
    } catch (err) {
        throw err;
    }
};

const updateTour = async (id, tourData) => {
    try {
        const updatedTour = await Tour.findByIdAndUpdate(id, tourData, {
            new: true,
            runValidators: true
        });
        return updatedTour;
    } catch (err) {
        throw err;
    }
};

const deleteTour = async (id) => {
    try {
        const deletedTour = await Tour.findByIdAndDelete(id);
        return deletedTour;
    } catch (err) {
        throw err;
    }
};

const getToursStats = async () => {
    try {
        const stats = await Tour.aggregate([
            {
                $match: { ratingsAverage: { $gte: 4.5 } }
            },
            {
                $group: {
                    _id: { $toUpper: '$difficulty' },
                    numTours: { $sum: 1 },
                    numRatings: { $sum: '$ratingsQuantity' },
                    avgRating: { $avg: '$ratingsAverage' },
                    avgPrice: { $avg: '$price' },
                    minPrice: { $min: '$price' },
                    maxPrice: { $max: '$price' }
                }
            },
            {
                $sort: { avgPrice: 1 }
            }
        ]);
        
        return stats;
    } catch (err) {
        throw err;
    }
};

const getMonthlyPlan = async (year) => {
    try {
        const plan = await Tour.aggregate([
            {
                $unwind: '$startDates'
            },
            {
                $match: {
                    startDates: {
                        $gte: new Date(`${year}-01-01`),
                        $lte: new Date(`${year}-12-31`)
                    }
                }
            },
            {
                $group: {
                    _id: { $month: '$startDates' },
                    numToursStarts: { $sum: 1 },
                    tours: { $push: '$name' }
                }
            },
            {
                $addFields: { month: '$_id' }
            },
            {
                $project: {
                    _id: 0
                }
            },
            {
                $sort: { numToursStarts: -1 }
            }
        ]);
        
        return plan;
    } catch (err) {
        throw err;
    }
};

const getTop5Tours = async () => {
    try {
        const tours = await Tour.find()
            .sort('-ratingsAverage price')
            .limit(5)
            .select('name price ratingsAverage summary difficulty');
        
        return tours;
    } catch (err) {
        throw err;
    }
};

export { getAllTours, getTourById, createTour, updateTour, deleteTour, getToursStats, getMonthlyPlan,getTop5Tours };