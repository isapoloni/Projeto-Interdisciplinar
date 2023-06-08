import express from "express";
import cors from "cors";
import routerPessoa from "./Router/RouterPessoas.js";
import rotaProduto from "./Router/rotaProduto.js"
import rotaServices from "./Router/routerServices.js"

const server = express();
server.use(cors({ origin: "*" }));
server.use(express.urlencoded({ extended: false }));
server.use(express.json());
server.use("/pessoas", routerPessoa);
server.use("/produto", rotaProduto);
server.use("/service", rotaServices);
server.listen(3308, "localhost", () => {
  console.log("Service running on http://localhost:3308 ");
});
 