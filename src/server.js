import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import helmet from 'helmet';

// import authRoutes from './routes/authRoutes.js';
import connectToDatabase from './config/db.js';
import todoRoutes from './routes/todoRoutes.js';
import authRoutes from './routes/authRoutes.js';


dotenv.config();

const PORT = process.env.PORT || 3000;

const app = express();

console.log("MONGO_URI:", process.env.MONGO_URI);

app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use('/api/auth', authRoutes);
  

// app.use('/api/user',);
app.use('/api/todo',todoRoutes);

await connectToDatabase();
    


app.listen(PORT, () => {
    console.log(`💻Server running on http://localhost:${PORT}`);
});


