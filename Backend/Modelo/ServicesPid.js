import ServicesBD from "../Persistencia/ServicesBD.js";


export default class Services {
  #id;
  #serviceType;
  #workSchedule;
  #estimatedCost;
  #workModel;
  #serviceDescription;

  constructor(id, serviceType, workSchedule, estimatedCost, workModel, serviceDescription) {
    this.#id = id; 
    this.#serviceType = serviceType;
    this.#workSchedule = workSchedule;
    this.#estimatedCost = estimatedCost;
    this.#workModel = workModel;
    this.#serviceDescription = serviceDescription;
  }

  get id() {
    return this.#id;
  }

  set id (newId){
    this.#id = newId
  }

  get serviceType() {
    return this.#serviceType;
  }

  set serviceType(newServiceType) {
    this.#serviceType = newServiceType;
  }

  get workSchedule() {
    return this.#workSchedule;
  }

  set workSchedule(newWorkSchedule) {
    this.#workSchedule = newWorkSchedule;
  }

  get estimatedCost() {
    return this.#estimatedCost;
  }

  set estimatedCost(newEstimatedCost) {
    this.#estimatedCost = newEstimatedCost;
  }

  get workModel() {
    return this.#workModel;
  }

  set workModel(newWorkModel) {
    this.#workModel = newWorkModel;
  }

  get serviceDescription() {
    return this.#serviceDescription;
  }

  set serviceDescription(newRawMaterialDemand) {
    this.#serviceDescription = newRawMaterialDemand;
  }

  toJSON() {
    return {
        codigo: this.id,
        serviceType: this.#serviceType,
        workSchedule: this.#workSchedule,
        estimatedCost: this.#estimatedCost,
        workModel: this.#workModel,
        serviceDescription: this.#serviceDescription,
    }
  }


  // Grava o evento no banco de dados
  async record() {
    const servicesBD = new ServicesBD();
    ths.id = await servicesBD.record(this);
  }

  // Atualiza o evento no banco de dados
  async update() {
    const servicesBD = new ServicesBD();
    await servicesBD.update(this);
  }

  // Deleta o evento do banco de dados
  async delete() {
    const servicesBD = new ServicesBD();
    await servicesBD.delete(this);
  }

  // Consulta eventos com base em um termo de pesquisa
  async consult(term) {
    const servicesBD = new ServicesBD();
    const services = await servicesBD.consult(term);
    return services;
  }

  // Consulta eventos com base em um título específico
  async consultId(id) {
    const servicesBD = new ServicesBD();
    const services = await servicesBD.consultTitle(id);
    return services;
  }
}