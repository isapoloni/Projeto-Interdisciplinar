import CategoriaProdutoBD from "../Persistencia/CategoriaProdBD.js";

export default class CategoriaProd {
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
    if (novoCodigo !== '') {
      this.#codigo = novoCodigo;
    }
  }

  get categoria() {
    return this.#categoria;
  }

  set categoria(novocategoria) {
    if (novocategoria !== '') {
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
    const categoriaProdutoBD = new CategoriaProdutoBD();
    await categoriaProdutoBD.incluir(this);
  }

  async atualizar() {
    const categoriaProdutoBD = new CategoriaProdutoBD();
    await categoriaProdutoBD.alterar(this);
  }

  async remover() {
    const categoriaProdutoBD = new CategoriaProdutoBD();
    await categoriaProdutoBD.excluir(this);
  }

  async consultar(termo) {
    const categoriaProdutoBD = new CategoriaProdutoBD();
    const categorias = await categoriaProdutoBD.consultar(termo);
    return categorias;
  }

  async consultarCodigo(codigo) {
    const categoriaProdutoBD = new CategoriaProdutoBD();
    const categorias = await categoriaProdutoBD.consultarCodigo(codigo);
    return categorias;
  }
}
