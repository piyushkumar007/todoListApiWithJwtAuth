import express, { Application } from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db';
import authRoutes from './routes/authRoutes';
import todoRoutes from './routes/todoRoutes';
import bodyParser from 'body-parser';

dotenv.config();

export const app: Application = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use('/api/auth', authRoutes);
app.use('/api', todoRoutes);

connectDB().then(() => {
  // app.listen(PORT, () => {
  //   console.log(`Server running on http://localhost:${PORT}`);
  // });

  console.log("Database Connected ")

});
