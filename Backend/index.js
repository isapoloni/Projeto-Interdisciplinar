import express from "express";
import cors from "cors";
import rotaProduto from "./Router/rotaProduto.js";
import routerPessoa from "./Router/RouterPessoas.js";
import routerServico from "./Router/routerServicos.js";

const server = express();
server.use(cors({ origin: "*" }));
server.use(express.urlencoded({ extended: false }));
server.use(express.json());
server.use("/pessoas", routerPessoa);
server.use("/produto", rotaProduto);
server.use("/servicos", routerServico);
server.listen(3308, "localhost", () => {
  console.log("Service running on http://localhost:3308 ");
});
