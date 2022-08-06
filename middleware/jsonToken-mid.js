const jwt = require("jsonwebtoken")
const User = require("../models/User.model")

//middleware:

/* este nos va a servir para verificar si tengo un usuario logeado */

exports.verifyToken = (req,res,next)=>{

    console.log("las cookies", req.cookies)
    const {headload,signature} = req.cookies;
    if(!headload || !signature)return res.status(401).json({errorMessage: "Unauthorized cookie"})

jwt.verify(`${headload}.${signature}`,process.env.SESSION_SECRET,{complete:true},(err,decoded)=>{
    //esto es cuando tiene error en la verificación
    if(err){
        return res.status(401).json({errorMessage: "Unauthorized"})
    }
    console.log("qe es el decoded? ", decoded)
    User.findById(decoded.userId)
    .then(user=>{
req.user = user // aqui estoy guardando mi usuario logeado en el req. para usarlo en los otros endpoints o middlewares
next() //nos da paso para la siguiente accion // por ejemplo ruta
    })
    .catch(err =>{
        res.status(401).json({errorMessage:"Algo salio mal",err})
    })
})
}

exports.createJWT = (user) =>{
    return jwt.sign({
        userId: user._id,
        username:user.username,
    },process.env.SESSION_SECRET,{expiresIn:'24h'}).split('.')
}

exports.clearRes = (data)=>{
const {password,__v,updateAt, ...cleanedData} = data;
return cleanedData;
}











//node sin babel:
//module.exports = { verifyToker, otraFunc};

//node con babel:
//export function
//import function from ".."