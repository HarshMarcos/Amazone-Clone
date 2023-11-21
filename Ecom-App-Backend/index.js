import cookieParser from "cookie-parser";
import express from "express";
import cors from 'cors';
import env from 'dotenv';
import mongoose from "mongoose";
import router from "./routes/router.js";
import DefaultData from "./defaultdata.js";
// import 'dbconnection.js';
// import mongoose from "mongoose";



env.config();


const app = express();


//username : harshkurulkar7
//pwd : amzonclone
//mongodb+srv://harshkurulkar7:<password>@cluster0.tnpzptp.mongodb.net/?retryWrites=true&w=majority


app.use(express.json());
app.use(cookieParser(""));
app.use(cors());
// const corsOptions = {
//    origin:'*',
//    credentials:true,
//    optionSuccessStatus:200,
// }
// app.use(cors(corsOptions));
// app.use(function(req, res, next) {
//    res.header("Access-Control-Allow-Origin", "YOUR-DOMAIN.TLD"); // Update to match the domain you will make the request from
//    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//    next();
//  });
app.use(router)


const port = process.env.PORT || 8005
const DB = process.env.DATABASE_URL

// app.listen(port, () => {
//     console.log(`Server is running on port number ${port}`);
// })



mongoose.connect(DB, {useNewUrlParser: true, useUnifiedTopology: true})
   .then(() => app.listen(port, () => console.log(`Server Running On Port: ${port}`)))
   .catch((error) => console.log(error.message));

app.get("/", (req, res) =>{
   res.send("API running..");
})


DefaultData();
