import { Router } from "express";
import ServicesCtrl from "../Controle/ServicesCtrl.js";

const rotaServices = new Router();
const servicesCtrl = new ServicesCtrl();

rotaServices
  .post("/", servicesCtrl.record)
  .put("/", servicesCtrl.update)
  .delete("/", servicesCtrl.delete)
  .get("/", servicesCtrl.consult)
  .get("/:id", servicesCtrl.consultId);

export default rotaServices;
