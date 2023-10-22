import HistServBD from "../Persistencia/HistServBD.js";

export default class HistServModel {
  #id;
  #prestador;
  #servico;
  #serviceData;
  #valor;

  constructor(id, prestador, servico, serviceData, valor) {
    this.#id = id;
    this.#prestador = prestador;
    this.#servico = servico;
    this.#serviceData = serviceData;
    this.#valor = valor;
  }

  get id() {
    return this.#id;
  }

  get prestador() {
    return this.#prestador;
  }

  get servico() {
    return this.#servico;
  }

  get serviceData() {
    return this.#serviceData;
  }

  get valor() {
    return this.#valor;
  }

  set id(idNew) {
    this.#id = idNew;
  }

  set prestador(prestadorNew) {
    this.#prestador = prestadorNew;
  }

  set servico(servicoNew) {
    this.#servico = servicoNew;
  }

  set serviceData(serviceDataNew) {
    this.#serviceData = serviceDataNew;
  }

  set valor(valorNew) {
    this.#valor = valorNew;
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

  async gravarM() {
    const histServBD = new HistServBD();
    await histServBD.gravarBD(this);
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
