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
const users = [
  { id:1,
    user:"admin",
    password:"admin",
    role:"admin"
  },
  {
    id:2,
    user:"user",
    password:"user",
    role:"user"
  }
]
//Criação da rota para o login e criação do Token
verifyAccess.post("/access", (req, res) => {
  const {user,password} = req.body
  const foundUser = users.find(u => u.user === user && u.password === password);
  if(foundUser){
    const token  = jwt.sign({userId:foundUser.id, role:foundUser.role},secret_key,{expiresIn:"12h"})
    return res.json({auth:true,token, role:foundUser.role})
  }
  res.status(401).json({auth:false, message: "Credencial inválida"})
})
export { verifyAccess };
