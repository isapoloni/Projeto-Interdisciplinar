import ProdutoBDPid from "../Persistencia/ProdutoBdPid.js";

export default class Produto {
  #codigo;
  #nome;
  #metrica;
  #descricao;
  #categoria;

  constructor(codigo, nome, metrica, descricao, categoria) {
      this.#codigo = codigo;
      this.#nome = nome;
      this.#metrica = metrica;
      this.#descricao = descricao;
      this.#categoria = categoria;
  }

  get codigo() {
      return this.#codigo
  }

  set codigo(novoCodigo) {
      if (novoCodigo != '')
          this.#nome = novoCodigo;
  }

  get nome() {
      return this.#nome;
  }

  set nome(newNome) {
      if (newNome != '')
          this.#nome = newNome;
  }

  get metrica() {
      return this.#metrica;
  }

  set metrica(newMetrica) {
      this.#metrica = newMetrica;    
  }

  get descricao() {
      return this.#descricao;
  }

  set descricao(newDescricao) {
      this.#descricao = newDescricao;
  }
  
  get categoria() {
      return this.#categoria;
  }

  set categoria(novaCat) {
      this.#categoria = novaCat;
  }

  toJSON() {
      return {
          "codigo": this.#codigo,
          "nome": this.#nome,
          "metrica": this.#metrica,
          "descricao": this.#descricao,
          "categoria": this.#categoria
      }
  }

  async gravar() {
      const produtoBD = new ProdutoBDPid();
      await produtoBD.incluir(this);

  }

  async atualizar() {
      const produtoBD = new ProdutoBDPid();
      await produtoBD.alterar(this);
  }

  async remover() {
      const produtoBD = new ProdutoBDPid();
      await produtoBD.excluir(this);
  }

  async consultar(termo) {
      const produtoBD = new ProdutoBDPid();
      const produtos = await produtoBD.consutlar(termo);
      return produtos;
  }

  async consultarCodigo(codigo){
      const produtoBD = new ProdutoBDPid();
      const produtos = await produtoBD.consultarId(termo);
      return produtos;
  }

}