import HistServBD from "../Persistencia/HistServBD.js";

export default class HistServModel {
  #id;
  #prestador;
  #servico;
  #serviceData;
  #valor;

  constructor(id, prestado, servico, serviceData, valor) {
    this.id = id;
    this.prestado = prestado;
    this.servico = servico;
    this.serviceData = serviceData;
    this.valor = valor;
  }

  get id() {
    return this.id;
  }

  get prestado() {
    return this.prestado;
  }

  get servico() {
    return this.servico;
  }

  get serviceData() {
    return this.serviceData;
  }

  get valor() {
    return this.valor;
  }

  set id(id) {
    this.id = id;
  }

  set prestado(prestado) {
    this.prestado = prestado;
  }

  set servico(servico) {
    this.servico = servico;
  }

  set serviceData(serviceData) {
    this.serviceData = serviceData;
  }

  set valor(valor) {
    this.valor = valor;
  }

  toJSON() {
    return {
      id: this.#id,
      prestador: this.#prestador,
      servico: this.#servico,
      serviceData: this.#serviceData,
      valor: this.#valor,
    };
  }

  async gravar() {
    const histServ = new HistServBD();
    await histServ.gravar(this);
  }

  async excluir() {
    const histServ = new HistServBD();
    await histServ.excluir(this);
  }

  async atualizar() {
    const histServ = new HistServBD();
    await histServ.atualizar(this);
  }

  async consultar(term) {
    const histServ = new HistServBD();
    const histServs = await histServ.consultar(term);
    return histServs;
  }
}
