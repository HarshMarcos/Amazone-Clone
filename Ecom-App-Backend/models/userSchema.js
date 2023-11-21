import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const secretKey = process.env.SECRET_KEY;

const userSchema = new mongoose.Schema({
    fname: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    mobile: {
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true,
        minlength: 6
    },
    cpassword:{
        type: String,
        required: true,
        minlength: 6
    },
    tokens:[
        {
            token:{
                type: String,
                required: true,
            },
        },
    ],

    carts: Array,
});


userSchema.pre("save", async function (next) {

    if(this.isModified("password")){
        this.password = await bcrypt.hash(this.password, 12);
        this.cpassword = await bcrypt.hash(this.cpassword, 12);
    }
    next();    
});


userSchema.methods.generateAuthtoken = async function(){
    try {
        let token = jwt.sign({ _id: this._id }, secretKey, {
            expiresIn: "1d",
        });

        this.tokens = this.tokens.concat({ token: token });

    //save methode for storing data in database
        await this.save();

        return token;    
    } catch (error) {
        console.log(error);        
    }
};

userSchema.methods.addcartdata = async function(cart) {
    try {
        this.carts = this.carts.concat(cart);
        await this.save();
        return this.carts;
    } catch (error) {
        console.log(error +" Error at the time of cart addition")        
    }
};

const User = new mongoose.model("USER", userSchema);
export default User;