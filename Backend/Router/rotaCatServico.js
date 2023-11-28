import { Router } from "express";
import CategoriaServicoCtrl from "../Controle/CategoriaServicoCtrl.js";

const rotaCatServico = new Router();
const catServico = new CategoriaServicoCtrl();

rotaCatServico
  .get("/", catServico.consultar)
  .post("/", catServico.gravar)
  .put("/", catServico.atualizar)
  .delete("/", catServico.excluir);
// .get('/codigo' ,catServico.consultarPeloCodigo);

export default rotaCatServico;
