const Contact = require("../models/Contact.model")



exports.getAllContacts = async(req,res,next) =>{
    console.log("si llegamos")
    try{
        const contacts = await Contact.find()
        res.status(201).json({contacts}
        )
    }
    catch(error){
        //hanlde the error 
        console.log("no hay pedo")
    }
}

exports.createContact = async(req,res,next)=>{
try{
    const{name,lastName,email,phone,address,image,company} = req.body
    const contact = await Contact.create({
        contactName:name,
        contactLastName:lastName,
        contactEmail:email,
        contactPhoneNumber:phone,
        contactAddress:address,
        contactImageUrl:image,
        contactCompany:company
    })

    res.status(201).json(contact)


//const {} = req.body
} catch(error){
    console.log("error")
}



}


exports.getContactById = async(req,res,next) =>{

    try{
        const {id} = req.params
        const oneContact = await Contact.findById(id)
        res.status(302).json(oneContact)

    }
    catch(error){console.log("error",error)}
}

exports.editContact = async(req,res,next) =>{

    try{
        const {id} = req.params
        const{name,lastName,email,phone,address,image,company} = req.body
        console.log("yo soy el id", id)

        const oneContact = await Contact.findByIdAndUpdate(id,{
            contactName:name,
            contactLastName:lastName,
            contactEmail:email,
            contactPhoneNumber:phone,
            contactAddress:address,  
            contactImageUrl:image,
            contactCompany:company
        },{new:true})
console.log("si lo topamos",oneContact)
        res.status(302).json(oneContact)

    }
    catch(error){console.log("error",error)}
}

exports.deleteContact = async (req,res) => {
try{
    const {id} =req.params
    const deletedContact = await Contact.findByIdAndDelete(id)
    res.status(301).json({message:"deleted"})
}catch(error){console.log("error",error)}
}