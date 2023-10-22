import { Router } from "express";
import HistServControl from "../Controle/HistServControl.js";

const routerHistServ = new Router();
const histServControl = new HistServControl();

routerHistServ
  .get("/", histServControl.consultar)
  .put("/", histServControl.atualizar)
  .post("/", histServControl.gravar)
  .delete("/", histServControl.excluir);

export default routerHistServ;
