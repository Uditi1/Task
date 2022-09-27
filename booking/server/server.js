const express = require('express');
require('dotenv').config();
const morgan = require ('morgan');
import cors from 'cors';
import mongoose from 'mongoose';


// import router from './routes/auth'
import fs from 'fs';

const app = express();

//middleware
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

// route middleware
fs.readdirSync('./routes').map((r) => app.use('/api', require(`./routes/${r}`)))

//app.use('/api', router)


//db connection it give a promise
mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,    
    useUnifiedTopology: true,
   
})
.then(() => console.log('DB Connected'))
.catch((err) => console.log('DB Connection Error:', err));


const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`server is running on port ${port}`));

