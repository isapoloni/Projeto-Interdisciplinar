import jwt from "jsonwebtoken";
import { Router } from "express";
const verifyAccess = Router();
const secret_key = "secret";

//Criação do middleware de verificação do token
export function verifyJWT(req,res,next){
  const token = req.headers["authorization"]
  jwt.verify(token,secret_key,(err,decoded)=>{
    if (err) return res.status(401).json({auth:false, message: "Credencial inválida"})
    req.userId = decoded.userId
    next()
  })
}
//Criação da rota para o login e criação do Token
verifyAccess.post("/access", (req, res) => {
  const {user,password} = req.body
  if(user === "admin" && password === "admin"){
    const token  = jwt.sign({userId:1},secret_key,{expiresIn:"12h"})
    return res.json({auth:true,token})
  }
  res.status(401).json({auth:false, message: "Credencial inválida"})
})
export { verifyAccess };
