import { Router } from "express";
import DoacaoCTRL from "../Controle/DoacaoCTRL.js";

const doacaoCTRL = new DoacaoCTRL();
const routerDoacao = Router();

routerDoacao
    .get("/", doacaoCTRL.consultar)
    .post("/", doacaoCTRL.gravar)
    .get("/:codigo", doacaoCTRL.consultar)
    .put("/", doacaoCTRL.atualizar)
    .delete('/:codigo', doacaoCTRL.excluir)


export default routerDoacao;