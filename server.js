const express=require('express');
const mongoose=require('mongoose');
const dotenv=require('dotenv');
const cookieParser = require('cookie-parser');
const authRoutes = require('./routes/auth');
const cors=require('cors');

dotenv.config();
const app=express();
app.use(cors({origin:'http://localhost:3000',credentials:true}));
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());

(async ()=>{
  try{
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected');
  }
  catch(error){
    console.log('error');
    console.log(error.message);
  }
  
})();

app.use('/api/auth',authRoutes);

const PORT=process.env.PORT||5000;
app.listen(PORT,()=>{
  console.log(`server running on port:${PORT}`);
});
