import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/user.model.js';

dotenv.config();

// Set up environment variables with defaults if not provided
if (!process.env.JWT_SECRET) {
    process.env.JWT_SECRET = 'my-ultra-secure-secret-key-that-should-be-in-env-file';
    console.warn('WARNING: JWT_SECRET not set in environment variables. Using default secret (not secure for production).');
}

const DATABASE = process.env.DATABASE || process.env.LOCAL_DATABASE;

mongoose.connect(DATABASE)
    .then(() => console.log('DB connection successful!'))
    .catch(err => {
        console.error('Database connection error:', err);
        process.exit(1);
    });

const createAdmin = async () => {
    try {
        // Check if admin already exists
        const existingAdmin = await User.findOne({ email: 'admin@example.com' });
        
        if (existingAdmin) {
            console.log('Admin user already exists!');
            return process.exit();
        }
        
        // Create admin user
        const adminUser = await User.create({
            name: 'Admin User',
            email: 'admin@example.com',
            password: 'adminpass123',
            passwordConfirm: 'adminpass123',
            role: 'admin'
        });
        
        console.log('Admin user created successfully:', adminUser);
        process.exit();
    } catch (err) {
        console.error('Error creating admin user:', err);
        process.exit(1);
    }
};

createAdmin();
