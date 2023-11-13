import express from "express";
import routerPessoa from "./Router/RouterPessoas.js";
import rotaCategoriaProd from "./Router/rotaCategoriaProd.js";
import cors from "cors";
import rotaProduto from "./Router/rotaProduto.js";
import routerServico from "./Router/routerServicos.js";
import routerHistServ from "./Router/RouterHistServ.js";
import routerDoacao from "./Router/rotaDoacao.js";
import { verifyAccess, verifyJWT } from "./Router/verifyAccessAndControl.js";
import rotaCatServico from "./Router/rotaCatServico.js";

const server = express();
server.use(cors({ origin: "*" }));
server.use(express.urlencoded({ extended: false }));
server.use(express.json());
//Implementação do middleware de verificação JWT
server.use("/pessoas", routerPessoa);
server.use("/produto", rotaProduto);
server.use("/servicos", routerServico);
server.use("/categoriaProduto", rotaCategoriaProd);
server.use("/catservico", rotaCatServico);
server.use("/histServ", routerHistServ);
server.use("/doacao", routerDoacao);

server.use(verifyAccess);

server.listen(3308, "localhost", () => {
  console.log("Service running on http://localhost:3308 ");
});
