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
const authenticateAdmin = require('./middleware/authenticationAdmin')

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
const officerRouter = require('./routes/officer')
const complaintsRouter = require('./routes/complaints')
const tasksRouter = require('./routes/tasks');
const adminRouter = require('./routes/admin')
const { roleAuthenticationMiddleware } = require('./middleware/roleAuthentication.js');

// routes

app.use('/api/v1/auth', authRouter)
app.use('/api/v1/user', authenticateUser, roleAuthenticationMiddleware('user'), userRouter)
app.use('/api/v1/complaints', authenticateUser, roleAuthenticationMiddleware('user'), complaintsRouter)
app.use('/api/v1/officer', authenticateOfficer, roleAuthenticationMiddleware('officer'), officerRouter)
app.use('/api/v1/tasks', authenticateOfficer, roleAuthenticationMiddleware('officer'), tasksRouter)
app.use('/api/v1/manage', authenticateAdmin, roleAuthenticationMiddleware('admin'), adminRouter)


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
