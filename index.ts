import express from 'express';
import { userRouter, } from './src/routes';
import { connectMongoose } from "./src/db/mangoose";
import "dotenv/config";

const app = express();

app.use(express.json());

connectMongoose().catch(err => {
  console.error("Mongo connection failed", err);
  process.exit(1);
});

app.get('/api', (req, res) => {    
    res.send('eat planner');
});

app.use('/api/auth', userRouter);

app.listen(3000, () => {
    console.log(`Server is running at http://localhost:3000`);
});