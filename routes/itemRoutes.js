const express=require('express');
const router=express.Router();
const items=require('./../models/items')
router.get('/',async(req,res)=>{
    try{
        const data=await items.find();
        console.log("menu fetched");
        res.status(200).json(data);
    }catch(err){
        console.log("error fetched");
       
    }
})

router.post('/',async(req,res)=>{
    try{
        const data=req.body;
        const newitem=new items(data);
        const response=await newitem.save();
        console.log("item saved");
        res.status(200).json(response);  
    }catch(err){
        console.log(err);
        res.status(500).json({error:"internal server error"});
    }
});

router.get('/:itemtype',async(req,res)=>{
    const itemtype=req.params.itemtype;
    try{
    if(itemtype=='biryani' || itemtype=='pizza'){
        const response=await items.find({name:itemtype});
        console.log("item fetched");
        res.status(200).json(response);
    }
    else{
        res.status(404).json({"error":"item not found"});
    }
}catch(err){
    console.log(err);
}
})

router.put('/:it',async(req,res)=>{
    try{
        const itid=req.params.it;
        const updateit=req.body;
        const response=await items.findByIdAndUpdate(itid,updateit,{
            new:true,
            runValidators:true,
        })
        if(!response){
            return res.status(404).json({"error":"invalid item id"});
        }
        console.log("item changed");
        res.status(200).json(response)
    }catch(err){
        console.log(err);
    }
})
router.delete('/:it',async(req,res)=>{
    try{
        const itemid=req.params.it;
        const response=await items.findByIdAndDelete(itemid);
        if(!response){
            res.status(404).json({"error":"invalid id"});
        }
        console.log("item deleted");
        res.status(200).json(response);
    }catch(err){
        console.log(err);
    }

})
module.exports=router;