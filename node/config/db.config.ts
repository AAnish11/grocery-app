// 
import mongoose from 'mongoose';
export default () => {
  const connect = () => {
    const db = process.env.DB_URL || 'mongodb://localhost:27017/grocery-app'; // If defult url not found in env than static used
    mongoose
      .connect(
        db,
        { useNewUrlParser: true }
      )
      .then(() => {
        return console.info(`Successfully connected to ${db}`);
      })
      .catch(error => {
        console.error('Error connecting to database: ', error);
        return process.exit(1);
      });
  };
  connect();
  mongoose.connection.on('disconnected', connect);
}