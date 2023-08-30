import ServicoBD from "../Persistencia/ServicoBD.js";

export default class Servico {
  #id;
  #servico;
  #jornada;
  #descricao;
  #custo;
  #modelo;
     

  constructor(
    id,
    servico,
    jornada,
    descricao,
    custo,
    modelo
  ) {
    this.#id = id;
    this.#servico = servico;
    this.#jornada = jornada;
    this.#descricao = descricao;
    this.#custo = custo;
    this.#modelo = modelo;
    
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

  get modelo() {
    return this.#modelo;
  }

  set modelo(newModelo) {
    this.#modelo = newModelo;
  }

  get jornada() {
    return this.#jornada;
  }

  set jornada(newJornada) {
    this.#jornada = newJornada;
  }

  get descricao() {
    return this.#descricao;
  }

  set descricao(newDescricao) {
    this.#descricao = newDescricao;
  }

  get custo() {
    return this.#custo;
  }

  set custo(newCusto) {
    this.#custo = newCusto;
  }

 

  toJSON() {
    return {
      id: this.#id,
      servico: this.#servico,
      jornada: this.#jornada,
      descricao: this.#descricao,
      custo: this.#custo,
      modelo: this.#modelo
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
