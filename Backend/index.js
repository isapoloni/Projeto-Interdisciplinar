import express from "express";
import routerPessoa from "./Router/RouterPessoas.js";
import rotaCategoriaProd from "./Router/rotaCategoriaProd.js";
import cors from "cors";
import rotaProduto from "./Router/rotaProduto.js";
import routerServico from "./Router/routerServicos.js";
import routerHistServ from "./Router/RouterHistServ.js";
import routerDoacao from "./Router/rotaDoacao.js";
import { verifyAccess, verifyAccessLevelForDeleteRequest, verifyJWT } from "./Router/verifyAccessAndControl.js";

const server = express();
server.use(cors({ origin: "*" }));
server.use(express.urlencoded({ extended: false }));
server.use(express.json());
//Implementação do middleware de verificação JWT

server.use("/pessoas",verifyJWT, verifyAccessLevelForDeleteRequest,routerPessoa);
server.use("/produto", verifyJWT,verifyAccessLevelForDeleteRequest,rotaProduto);
server.use("/servicos", verifyJWT,verifyAccessLevelForDeleteRequest,routerServico);
server.use("/categoria", verifyJWT,verifyAccessLevelForDeleteRequest,rotaCategoriaProd);
server.use("/histServ",verifyJWT, verifyAccessLevelForDeleteRequest,routerHistServ);
server.use('/doacao', verifyJWT, verifyAccessLevelForDeleteRequest,routerDoacao);
server.use( verifyAccess);
server.listen(3308, "localhost", () => {
  console.log("Service running on http://localhost:3308 ");
});

