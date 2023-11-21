import jwt from 'jsonwebtoken';
import User from '../models/userSchema';

const secretKey = process.env.SECRET_KEY


const authenticate = async(req, res, next) => {
    try {
        const token = req.cookies.Amazonweb;

        const verifyToken = jwt.verify(token, secretKey); 

        const rootUser = await User.findOne({_id: verifyToken._id, "tokens.token": token});

        if(!rootUser){
            throw new Error("User Not Found");
        }

        req.token = token;
        req.rootUser = rootUser;
        req.userID = rootUser._id;

        next();

    } catch (error) {
        console.log(error);
        res.status(401).send("Unauthorized: No token provided");
    }
}

export default authenticate;