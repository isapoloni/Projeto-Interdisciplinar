import DoacaoBD from "../Persistencia/DoacaoBD.js";

export default class Doacao {
    #codigo;
    #cpfDoador;
    #quantidade;
    #dataDoacao;
    #listaItens;

    constructor(codigo, cpfDoador, dataDoacao, listaItens) {
        this.#codigo = codigo;
        this.#cpfDoador = cpfDoador;
        this.#dataDoacao = dataDoacao;
        this.#listaItens = listaItens;
    }

    get codigo() {
        return this.#codigo;
    }

    set codigo(codigo) {
        this.#codigo = codigo;
    }

    get cpfDoador() {
        return this.#cpfDoador;
    }

    set cpfDoador(newCpfDoador) {
        this.#cpfDoador = newCpfDoador;
    }

    get quantidade() {
        return this.#quantidade;
    }

    set quantidade(newQuantidade) {
        this.#quantidade = newQuantidade;
    }

    get dataDoacao() {
        return this.#dataDoacao;
    }

    set dataDoacao(newDataDoacao) {
        this.#dataDoacao = newDataDoacao;
    }

    get listaItens() {
        return this.#listaItens
    }

    set listaItens(newListaItens) {
        this.#listaItens = newListaItens;
    }

    toJSON() {
        return {
            "codigo": this.#codigo,
            "cpfDoador": this.#cpfDoador,
            "dataDoacao": this.#dataDoacao,
            "listaItens": this.#listaItens.map(item => ({
                "produto": item.produto,
                "quantidade": item.quantidade
            }))
        };
    }

    async gravar() {
        const doacaoBD = new DoacaoBD();
        await doacaoBD.gravar(this);
    }

    async atualizar() {
        const doacaoBD = new DoacaoBD();
        await doacaoBD.alterar(this);
    }

    async remover(id) {
        const doacaoBD = new DoacaoBD();
        await doacaoBD.excluir(id);
    }

    async consultar(termo) {
        const doacaoBD = new DoacaoBD();
        const doacoes = await doacaoBD.consultar(termo);
        return doacoes;
    }

    async consultarId(id) {
        const doacaoBD = new DoacaoBD();
        const doacoes = await doacaoBD.consultarId(id);
        return doacoes;
    }
}


