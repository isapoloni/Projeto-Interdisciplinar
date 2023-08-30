import express from "express";
import routerPessoa from "./Router/RouterPessoas.js";
import rotaCategoriaProd from "./Router/rotaCategoriaProd.js";
import cors from "cors";
import rotaProduto from "./Router/rotaProduto.js";
import routerServico from "./Router/routerServicos.js";
import {verifyAccess, verifyJWT} from "./Router/verifyAccessAndControl.js";
const server = express();
server.use(cors({ origin: "*" }));
server.use(express.urlencoded({ extended: false }));
server.use(express.json());
//Implementação do middleware de verificação JWT
server.use("/pessoas", verifyJWT,routerPessoa);
server.use("/produto", verifyJWT,rotaProduto);
server.use("/servicos", verifyJWT,routerServico);
server.use("/categoria",rotaCategoriaProd);
server.use(verifyAccess);

server.listen(3308, "localhost", () => {
  console.log("Service running on http://localhost:3308 ");
});
