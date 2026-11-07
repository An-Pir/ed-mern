import mongoose from 'mongoose';

export const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URL);
        console.log(`MongoDB подключена: ${conn.connection.host}`)
    } catch (error) {
        console.error(`Ошибка подключения к БД: ${error.message}`);
        process.exit(1)
    }
};