import PessoaBD from "../Persistencia/PessoaBD.js";

export default class Pessoas {
  #cpf;
  #nome;
  #nascimento;
  #endereco;
  #cidade;
  #telefone;
  #email;
  #tipo;
  #disponibilidade;
  #profissao1;
  #profissao2;     

  constructor(
    cpf,
    nome,
    nascimento,
    endereco,
    cidade,
    telefone,
    email,
    tipo,
    disponibilidade,
    profissao1,
    profissao2      
  ) {
    this.#cpf = cpf;
    this.#nome = nome;
    this.#nascimento = nascimento;
    this.#endereco = endereco;
    this.#cidade = cidade;
    this.#telefone = telefone;
    this.#email = email;
    this.#tipo = tipo;
    this.#disponibilidade = disponibilidade;
    this.#profissao1 = profissao1;
    this.#profissao2 = profissao2;
   
   
  }

  

  get cpf() {
    return this.#cpf;
  }

  set cpf(newCpf) {
    this.#cpf = newCpf;
  }

  get email() {
    return this.#email;
  }

  set email(newEmail) {
    this.#email = newEmail;
  }

  get tipo() {
    return this.#tipo;
  }

  set tipo(newTipo) {
    this.#tipo = newTipo;
  }

  get nome() {
    return this.#nome;
  }

  set nome(newNome) {
    this.#nome = newNome;
  }

  get telefone() {
    return this.#telefone;
  }

  set telefone(newTelefone) {
    this.#telefone = newTelefone;
  }

  get nascimento() {
    return this.#nascimento;
  }

  set nascimento(newNascimento) {
    this.#nascimento = newNascimento;
  }

  

  get endereco() {
    return this.#endereco;
  }

  set endereco(newEndereco) {
    this.#endereco = newEndereco;
  }

  get cidade() {
    return this.#cidade;
  }

  set cidade(newCidade) {
    this.#cidade = newCidade;
  }

  
  get profissao1() {
    return this.#profissao1;
  }

  set profissao1(newProfissao1) {
    this.#profissao1 = newProfissao1;
  }

  get profissao2() {
    return this.#profissao2;
  }

  set profissao2(newProfissao2) {
    this.#profissao2 = newProfissao2;
  }

  get disponibilidade() {
    return this.#disponibilidade;
  }

  set disponibilidade(newDisponibilidade) {
    this.#disponibilidade = newDisponibilidade;
  }

  toJSON() {
    return {
    cpf:this.#cpf,
    nome:this.#nome ,
    nascimento:this.#nascimento,
    endereco:this.#endereco ,
    cidade:this.#cidade,
    telefone:this.#telefone,
    email:this.#email,
    tipo:this.#tipo,
    disponibilidade:this.#disponibilidade ,
    profissao1:this.#profissao1,
    profissao2:this.#profissao2
    };
  }

  async gravar() {
    const pessoaBD = new PessoaBD();
    await pessoaBD.gravar(this);
  }
  async excluir() {
    const pessoaBD = new PessoaBD();
    await pessoaBD.excluir(this);
  }
  async atualizar() {
    const pessoaBD = new PessoaBD();
    await pessoaBD.atualizar(this);
  }
  async consultar(term) {
    const pessoaBD = new PessoaBD();
    const pessoas = await pessoaBD.consultar(term);
    return pessoas;
  }
}
