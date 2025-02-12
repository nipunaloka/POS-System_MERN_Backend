require('dotenv').config();
const express = require("express");
const connectDB = require("./config/database");
const config = require('./config/config');
const globalErrorHandler = require('./middlewares/globalErrorHandler');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const app = express();

const PORT = config.port;
connectDB();

//Middlewares
app.use(cors({
    credentials: true,
    origin: ['http://localhost:5173']
}));
app.use(express.json());
app.use(cookieParser());


app.get('/', (req, res) => {

    res.json({message: "Hello form POS server!"});
})

//other Endpoint
app.use('/api/user', require('./routes/userRoute'));

app.use('/api/order', require('./routes/orderRute'));

app.use('/api/table', require('./routes/tableRoute'));

//Global error handeler
app.use(globalErrorHandler);

app.listen(PORT, ()=> {
    console.log(`POS server is Listening on port ${PORT}`);
})