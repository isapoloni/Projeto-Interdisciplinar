import { Router } from "express";
import ServicosCTRL from "../Controle/ServicosCTRL.js";

const routerServico = new Router();
const servicosCTRL = new ServicosCTRL();

routerServico
  .get("/", servicosCTRL.consultar)
  .put("/", servicosCTRL.atualizar)
  .post("/", servicosCTRL.gravar)
  .delete("/", servicosCTRL.excluir);

export default routerServico;
