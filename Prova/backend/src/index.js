const dotenv = require('dotenv')
dotenv.config()
const express = require('express')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const authRouter = require('./auth/routes')
const middleware = require('./auth/middleware')
const userRouter = require('./user/routes')
const peopleRouter = require('./people/routes')
const recordRouter = require('./record/routes')
const unitRouter = require('./unit/routes')
const vaccineRouter = require('./vaccine/routes')

const app = express()
app.use(express.json())
app.use(cookieParser())
const corsOptions ={
    origin:'http://localhost:3000', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}
app.use(cors(corsOptions));

app.use('/auth', authRouter)
app.use(middleware)
app.use('/user', userRouter)
app.use('/people', peopleRouter)
app.use('/units', unitRouter)
app.use('/vaccines', vaccineRouter)

app.use('/records', recordRouter)

app.listen(3001, () => {
  console.log('Listening on port 3001')
})