import { Router } from "express";
import ServicesCtrl from "../Controle/ServicesCtrl.js";

const rotaServices = new Router();
const servicesCtrl = new ServicesCtrl();

rotaServices
.get('/',servicesCtrl.consultar)
.post('/' ,servicesCtrl.gravar)
.put('/' ,servicesCtrl.atualizar)
.delete('/' ,servicesCtrl.excluir)
.get('/:id' ,servicesCtrl.consultId);


export default rotaServices;