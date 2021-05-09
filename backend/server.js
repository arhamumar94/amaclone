import express from 'express'
import mongoose from 'mongoose';
import dotenv from 'dotenv'
import productRouter from './routers/productRouter.js';
import userRouter from './routers/userRouter.js';
import cors from 'cors';
import orderRouter from './routers/orderRouter.js';
dotenv.config();
const app=express();
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))
mongoose.connect('mongodb+srv://user-123:user-123@cluster0.qkfu0.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',{
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useCreateIndex:true
})


app.use('/api/user',userRouter)
app.use('/api/products',productRouter)
app.use('/api/order',orderRouter)


app.get('/',(req,res)=>{
    res.send('server is connected')
})
app.use((err,req,res,next)=>{
    res.status(500).send({message:err.message})
})


const PORT=process.env.PORT||5000;
app.listen(PORT,()=>{
    console.log(`server listeing at http://localhost:${PORT}`)
})