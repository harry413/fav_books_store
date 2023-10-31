import express from "express";
import { PORT, MongoURL } from "./config.js";
import mongoose from "mongoose";
import bookRouter from "./router/bookRouter.js";
import cors from "cors";


const app = express();

app.get("/", (req, res) => {
    console.log(req);   
    return res.status(234).json("wellcome to harry book store");
});

app.use(express.json());
app.use(cors());

// importing routes
app.use("/book", bookRouter);

mongoose.connect(MongoURL,{
    useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(()=>{
        console.log("app connected to tha database!!!!!!!");
        app.listen(PORT, () => {
            console.log(`app is listening at port ${PORT}`);
        });
    }).catch((error) =>{
    console.log(error);
});