import express from 'express';
const router = express.Router();
import {register, login} from "../controllers/auth";


//router.get("/:message", (req, res) => {
   // res.status(200).send(`Here is your message: ${req.params.message}`);

    
//});

// controller

router.post("/register", register);
router.post("/login", login);


module.exports = router;