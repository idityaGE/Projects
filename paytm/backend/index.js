import express from 'express';
import apiRouter from './routes/index.js';
import cors from 'cors';

const app = express();
const port = 3000;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/api/v1', apiRouter)