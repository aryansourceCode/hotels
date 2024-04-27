const express=require('express');
const bodyParser=require('body-parser');
const app=express();
const db=require('./db')
const personRoutes=require('./routes/personRoutes')
const itemRoutes=require('./routes/itemRoutes')


app.use(bodyParser.json());
app.get('/',(req,res)=>{
    res.send("welcome to the first page");
});
app.get('/biryani',(req,res)=>{
    res.send("biryani is availablee");
})

app.use('/items',itemRoutes);

app.use('/person',personRoutes);
app.listen(2000,()=>{
    console.log("listening to port 2000");
})