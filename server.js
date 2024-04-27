const express=require('express');
const bodyParser=require('body-parser');
const app=express();
const db=require('./db')
const personRoutes=require('./routes/personRoutes')
const itemRoutes=require('./routes/itemRoutes')
require('dotenv').config();

app.use(bodyParser.json());
app.get('/',(req,res)=>{
    res.send("welcome to the first page");
});
app.get('/biryani',(req,res)=>{
    res.send("biryani is availablee");
})

app.use('/items',itemRoutes);

app.use('/person',personRoutes);

const PORT= process.env.PORT || 2000;
app.listen(PORT,()=>{
    console.log("listening to port 2000");
})