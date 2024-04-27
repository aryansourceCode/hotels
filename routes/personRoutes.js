const express=require('express');
const router=express.Router();
const Person=require('./../models/Person')
router.get('/',async(req,res)=>{
    try{
        const data=await Person.find();
        console.log('data fetched');
        res.status(200).json(data);


    }catch(err){
        console.log(err);

    }
})

router.post('/',async(req,res)=>{
    try{
        const data=req.body;
        const newperson=new Person(data);
        const respone=await newperson.save();
        console.log("data saved");
        res.status(200).json(respone);
    }catch(err){
        console.log(err);
        res.status(500).json({error:"internal server error"});
    }
});

router.get('/:workType',async(req,res)=>{
    
    try{
        const workType=req.params.workType;
        if(workType=='chef' || workType=='waiter' || workType=='client'){
            const response=await Person.find({works:workType});
            res.status(200).json(response);
        }
        else{
            res.status(404).json({"error":"invalid"})
        }

    }catch(err){
        console.log(err);
    }
})

router.put('/:id',async(req,res)=>{
    try{
        const personid=req.params.id;
        const updatedata=req.body;
        const response=await Person.findByIdAndUpdate(personid,updatedata,{
            new:true,
            runValidators:true
        })
        if(!response){
            return res.status(404).json({"error":"invalid id"});
        }
        console.log("data updated");
        res.status(200).json(response);
    }catch(err){
        console.log(err);
        res.status(500).json({"error":"Internal server error"})
    }
})

router.delete('/:id',async(req,res)=>{
    try{
        const personid=req.params.id;
        const response= await Person.findByIdAndDelete(personid);
        if(!response){
            res.status(404).json({"error":"invalid id"});
        }
        console.log("data deleted");
        res.status(200).json(response);
    }
    catch(err){
        console.log(err);
    }
})

module.exports=router;