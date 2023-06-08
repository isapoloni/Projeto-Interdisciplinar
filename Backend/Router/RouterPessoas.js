import { Router } from "express";
import PessoasCTRL from "../Controle/PessoasCTRL.js";

const routerPessoa = new Router();
const pessoasCTRL = new PessoasCTRL();

routerPessoa
  .get("/", pessoasCTRL.consultar)
  .put("/", pessoasCTRL.atualizar)
  .post("/", pessoasCTRL.gravar)
  .delete("/", pessoasCTRL.excluir);

export default routerPessoa;
