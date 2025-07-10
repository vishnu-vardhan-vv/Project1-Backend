const Property=require('../models/Property');

exports.createProperty=async(req,res)=>{
    const data=req.body;
    try{
        const property=await Property.create(data);
        res.status(201).send('Propert created successfully');
    }
    catch(error){
        res.status(500).send(error);
    }
}

exports.propertyHome=async(req,res)=>{
    try{
        const {page=1,sort='createdAt'}=req.query;
        const limit=6;
        const properties=await Property.find().sort({[sort]:sort==='rent'?1:-1}).skip((page-1)*limit).limit(limit);

        const count=await Property.countDocuments();
        res.send({properties,total:count});
    }
    catch(error){
        res.status(500).send(error);
    }
}

exports.propertyDetails=async(req,res)=>{
    try{
        const property=await Property.findById(req.params.id);
        if (!property) return res.status(404).send( 'Not found');
        property.views++;
        await property.save();
        res.send(property);
    }
    catch(error){
        res.status(500).send(error);
    }
}


