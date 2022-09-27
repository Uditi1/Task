import express from 'express';
const router = express.Router();
import {create, hotels} from "../controllers/hotel";
import formidable from 'express-formidable'




//router.get("/:message", (req, res) => {
   // res.status(200).send(`Here is your message: ${req.params.message}`);

    
//});

// middleware
import {requireSignin} from "../middlewares"


// controller

router.post("/create-hotel", requireSignin, formidable(), create);

router.get('/hotels', hotels);




module.exports = router;