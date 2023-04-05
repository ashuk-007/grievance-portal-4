require('dotenv').config();
require('express-async-errors');

//extra security packages
const helmet = require('helmet');
const cors = require('cors');
const xss = require('xss-clean');
const rateLimiter = require('express-rate-limit');



const express = require('express');
const app = express();

const connectDB = require('./db/connect.js')
const authenticateUser = require('./middleware/authentication')
const authenticateOfficer = require('./middleware/authenticationOfficer')

// error handler
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

app.use(express.json());

app.set('trust proxy', 1);
app.use(rateLimiter({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
}));

app.use(helmet());
app.use(cors());
app.use(xss());

// extra packages

const authRouter = require('./routes/auth')
const userRouter = require('./routes/user')
const complaintsRouter = require('./routes/complaints')
const tasksRouter = require('./routes/tasks')

// routes

app.use('/api/v1/auth', authRouter)
app.use('/api/v1/user', authenticateUser, userRouter)
app.use('/api/v1/complaints', authenticateUser, complaintsRouter)
app.use('/api/v1/tasks', authenticateOfficer, tasksRouter)


app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);


const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI)
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
