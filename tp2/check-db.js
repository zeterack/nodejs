import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { Tour } from './models/tour.model.js';

dotenv.config();

// Force using MongoDB Atlas for testing
const connectString = process.env.DATABASE;
console.log("Using connection string:", connectString);

async function connectAndCheck() {
  try {
    await mongoose.connect(connectString);
    console.log('Connected to MongoDB');

    // Count all tours
    const totalCount = await Tour.countDocuments();
    console.log(`Total tours in database: ${totalCount}`);

    // Test the top 5 query
    const top5Tours = await Tour.find()
      .sort('-ratingsAverage price')
      .limit(5)
      .select('name price ratingsAverage summary difficulty');
    
    console.log('TOP 5 TOURS:');
    console.log(`Found ${top5Tours.length} tours`);
    top5Tours.forEach((tour, i) => {
      console.log(`${i+1}. ${tour.name} - Rating: ${tour.ratingsAverage}, Price: ${tour.price}`);
    });
    
    // Check with API Features class
    const APIFeatures = (await import('./utils/apiFeatures.js')).default;
    const mockQuery = { limit: 5, sort: '-ratingsAverage,price', fields: 'name,price,ratingsAverage,summary,difficulty' };
    
    const features = new APIFeatures(Tour.find(), mockQuery)
      .filter()
      .sort()
      .limitFields()
      .paginate();
    
    const apiFeaturesTours = await features.query;
    
    console.log('\nAPI FEATURES TOP 5 TOURS:');
    console.log(`Found ${apiFeaturesTours.length} tours`);
    apiFeaturesTours.forEach((tour, i) => {
      console.log(`${i+1}. ${tour.name} - Rating: ${tour.ratingsAverage}, Price: ${tour.price}`);
    });
    
    process.exit(0);
  } catch (err) {
    console.error('Error connecting to database:', err);
    process.exit(1);
  }
}

connectAndCheck();
