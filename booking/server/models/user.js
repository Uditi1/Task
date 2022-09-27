import mongoose from "mongoose";
import bcrypt from 'bcrypt'
const {Schema} = mongoose

const userScheme = new Schema({
    name: {
        type: String,
        trim: true,
        required: 'Name is required'
    },
    email: {
        type: String,
        trim: true,
        required: 'Email is required',
        unique: true,
    },
    password: {
        type: String,
        min: 6,
        max: 64
    },
    stripe_acount_id: '',
    stripe_seller: {},
    stripeSession: {}
},
{timestamps: true}
);

userScheme.pre('save', function(next){
    let user = this;

    //hash the password only if password or registering for the first time or changes
    //make sure to use this otherwise each time use.save() is exected 
    //will get auto updated and you can't login with the original  password
    if(user.isModified('password')) {
        return bcrypt.hash(user.password, 12, function(err, hash){
            if(err) {
                console.log('BCRYPT HASH ERR', err);
                return next(err);
            }
            user.password = hash;
            return next();
        });
    }else{
        return next();
    }
});

userScheme.methods.comparePassword = function (password, next){
    bcrypt.compare(password, this.password, function(err, match){
        if(err){
            console.log('COMPARE PASSWORD ERR',err);
            return next(err, false);
        }

        console.log("MATCH PASSWORD", match);
        return next(null, match);
    })
}

export default mongoose.model('User', userScheme);