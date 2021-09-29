import express, {json} from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import {dirname, join} from 'path';
import {fileURLToPath} from 'url';
import usersRouter from './routes/users-routes.js';
import authRouter from './routes/auth-routes.js'

dotenv.config(); 

const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const corsOptions = {Credentials:true, origin:process.env.URL || '*'};

app.use(cors(corsOptions));
app.use(json());
app.use(cookieParser());

app.use('/', express.static(join(__dirname, 'public')));
app.use('/api/users', usersRouter);
app.use('/api/auth', authRouter);

app.listen(3000, () => {
	console.log("server is listening on port 3000")
});