import express from 'express';
import cors from 'cors';


const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Health check / root route
app.get('/', (req, res) => {
  res.json({ message: '🚀 Shoply API is running!' });
});



export default app;
