import { Router } from "express";
import CategoriaProdCTRL from '../Controle/CategoriaProdCtrl.js'

const rotaCategoriaProd = new Router();
const categoriaProdCTRL = new CategoriaProdCTRL();

rotaCategoriaProd.get('/', categoriaProdCTRL.consultar)
.post('/' ,categoriaProdCTRL.gravar)
.put('/' ,categoriaProdCTRL.atualizar)
.delete('/' ,categoriaProdCTRL.excluir);
// .get('/codigo' ,categoriaProdCTRL.consultarPeloCodigo);

export default rotaCategoriaProd;