const express=require('express');
const mongoose=require('mongoose');
const dotenv=require('dotenv');
const cookieParser = require('cookie-parser');
const authRoutes = require('./routes/auth');
const contactRoutes=require('./routes/contact');
const adminRoutes=require('./routes/admin');
const blogRoutes=require('./routes/blog');
const propertyRoutes=require('./routes/property');
const cors=require('cors');

dotenv.config();
const app=express();
app.use(cors({origin:`${process.env.FRONTEND_URL}`,credentials:true}));
// app.use(cors({origin:'https://project1-frontend-beta.vercel.app',credentials:true}));
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
app.use('/api',contactRoutes);
app.use('/api/admin',adminRoutes);
app.use('/api/blogs',blogRoutes);
app.use('/api/properties',propertyRoutes);


const PORT=process.env.PORT||5000;
app.listen(PORT,()=>{
  console.log(`server running on port:${PORT}`);
});

