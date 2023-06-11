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
  #profissao1;     

  constructor(
    cpf,
    nome,
    nascimento,
    endereco,
    cidade,
    telefone,
    email,
    tipo,
    profissao1   
  ) {
    this.#cpf = cpf;
    this.#nome = nome;
    this.#nascimento = nascimento;
    this.#endereco = endereco;
    this.#cidade = cidade;
    this.#telefone = telefone;
    this.#email = email;
    this.#tipo = tipo;
    this.#profissao1 = profissao1;
   
   
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
    profissao1:this.#profissao1
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
