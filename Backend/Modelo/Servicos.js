import ServicoBD from "../Persistencia/ServicoBD.js";

export default class Servico {
  #id;
  #servico;
  #descricao;
  #categoria;

  constructor(id, servico, categoria, descricao) {
    this.#id = id;
    this.#servico = servico;
    this.#descricao = descricao;
    this.#categoria = categoria;
  }

  get id() {
    return this.#id;
  }

  set id(newid) {
    this.#id = newid;
  }

  get servico() {
    return this.#servico;
  }

  set servico(newServico) {
    this.#servico = newServico;
  }

  get categoria() {
    return this.#categoria;
  }

  set categoria(newcategoria) {
    this.#categoria = newcategoria;
  }

  get descricao() {
    return this.#descricao;
  }

  set descricao(newDescricao) {
    this.#descricao = newDescricao;
  }

  toJSON() {
    return {
      id: this.#id,
      servico: this.#servico,
      descricao: this.#descricao,
      categoria: this.#categoria,
    };
  }

  async gravar() {
    const servicoBD = new ServicoBD();
    await servicoBD.gravar(this);
  }

  async excluir() {
    const servicoBD = new ServicoBD();
    await servicoBD.excluir(this);
  }

  async atualizar() {
    const servicoBD = new ServicoBD();
    await servicoBD.atualizar(this);
  }

  async consultar(term) {
    const servicoBD = new ServicoBD();
    const servicos = await servicoBD.consultar(term);
    return servicos;
  }
}
