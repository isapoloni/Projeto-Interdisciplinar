import CategoriasServicoBD from "../Persistencia/CategoriasServicoBD.js";

export default class CategoriasServico {
  #codigo;
  #categoria;

  constructor(codigo, categoria) {
    this.#codigo = codigo;
    this.#categoria = categoria;
  }

  get codigo() {
    return this.#codigo;
  }

  set codigo(novoCodigo) {
    if (novoCodigo !== "") {
      this.#codigo = novoCodigo;
    }
  }

  get categoria() {
    return this.#categoria;
  }

  set categoria(novocategoria) {
    if (novocategoria !== "") {
      this.#categoria = novocategoria;
    }
  }

  toJSON() {
    return {
      codigo: this.#codigo,
      categoria: this.#categoria,
    };
  }

  async gravar() {
    const catServicoBD = new CategoriasServicoBD();
    await catServicoBD.incluir(this);
  }

  async atualizar() {
    const catServicoBD = new CategoriasServicoBD();
    await catServicoBD.alterar(this);
  }

  async remover() {
    const catServicoBD = new CategoriasServicoBD();
    await catServicoBD.excluir(this);
  }

  async consultar(termo) {
    const catServicoBD = new CategoriasServicoBD();
    const categorias = await catServicoBD.consultar(termo);
    return categorias;
  }

  async consultarCodigo(codigo) {
    const catServicoBD = new CategoriasServicoBD();
    const categorias = await catServicoBD.consultarCodigo(codigo);
    return categorias;
  }
}
