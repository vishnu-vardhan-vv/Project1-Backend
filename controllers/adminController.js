const Contact=require('../models/Contact');


exports.getContact=async(req,res)=>{
    try {
        const data = await Contact.find().sort({ createdAt: -1 });
        res.send(data);
    } catch {
        res.status(500).send({ error: 'Could not fetch contacts' });
    }
}