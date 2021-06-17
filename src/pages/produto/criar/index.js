import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';

class CriarProduto extends Component {
    constructor(props) {
        super(props);

        this.state = {
            produto: {
                nome: "",
                tipoProduto: "",
                preco: "",
                dataChegada: "",
                dataValidade: "",
                ativo: "true"
            },
            erro: null,
            redirect: false
        };
    }

    exibeErro() {
        const { erro } = this.state;

        if (erro) {
            return (
                <div className="alert alert-danger" role="alert">
                    Erro de conexão com o servidor
                </div>
            );
        }
    }

    render() {
        const { redirect } = this.state;
        if (redirect) {
            return <Redirect to="/produtos" />;
        } else {
            return (
                <form onSubmit={this.handleSubmit}>
                    <fieldset>
                        <legend>Criar um Produto</legend>
                        <div className="produto-insert">
                            <label htmlFor="nome">Nome </label>
                            <br />
                            <input
                                type="text"
                                id="nome"
                                name="nome"
                                placeholder="Nome"
                                minLength="3"
                                maxLength="100"
                                required
                                value={this.state.produto.nome}
                                onChange={this.handleInputChange}
                            />
                        </div>
                        <div className="produto-insert">
                            <label htmlFor="nome">Tipo de Produto </label>
                            <br />
                            <input
                                type="text"
                                id="tipoProduto"
                                name="tipoProduto"
                                placeholder="Tipo de Produto"
                                minLength="3"
                                maxLength="100"
                                required
                                value={this.state.produto.tipoProduto}
                                onChange={this.handleInputChange}
                            />
                        </div>
                        <div className="produto-insert">
                            <label htmlFor="preco">Preço </label>
                            <br />
                            <input
                                type="text"
                                id="preco"
                                name="preco"
                                placeholder="Preço"
                                required
                                value={this.state.produto.preco}
                                onChange={this.handleInputChange}
                            />
                        </div>
                        <div className="produto-insert">
                            <label htmlFor="dataChegada">Data de Chegada </label>
                            <br />
                            <input
                                type="date"
                                id="dataChegada"
                                name="dataChegada"
                                placeholder="Data de Chegada"
                                required
                                value={this.state.produto.dataChegada}
                                onChange={this.handleInputChange}
                            />
                        </div>
                        <div className="produto-insert">
                            <label htmlFor="dataValidade">Data de Validade </label>
                            <br />
                            <input
                                type="date"
                                id="dataValidade"
                                name="dataValidade"
                                placeholder="Data de Validade"
                                required
                                value={this.state.produto.dataValidade}
                                onChange={this.handleInputChange}
                            />
                        </div>

                        <div className="produto-insert">
                            <label>
                                <input
                                    type="radio"
                                    name="estoque"
                                    value="true"
                                    checked={this.state.produto.estoque === "true"}
                                    onChange={this.handleInputChange}
                                />
                                Ativo
                            </label>
                            <label>
                                <input
                                    type="radio"
                                    value="false"
                                    name="estoque"
                                    checked={this.state.produto.estoque === "false"}
                                    onChange={this.handleInputChange}
                                />
                                Inativo
                            </label>
                        </div>


                        <button type="submit" className="btn btn-primary">
                            Cadastrar
                        </button>
                    </fieldset>
                </form>
            );
        }
    }

    handleInputChange = event => {
        const target = event.target;
        const name = target.name;
        const value = target.value;

        this.setState(prevState => ({
            produto: { ...prevState.produto, [name]: value }
        }));
        console.log(value);
    };

    handleSubmit = event => {
        fetch(`${process.env.REACT_APP_API_URL}`, {
            method: "post",
            body: JSON.stringify(this.state.produto),
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(data => {
                if (data.ok) {
                    this.setState({ redirect: true });
                } else {
                    data.json().then(data => {
                        if (data.error) {
                            this.setState({ erro: data.error });
                        }
                    });
                }
            })
            .catch(erro => this.setState({ erro: erro }));

        event.preventDefault();
    };
}

export default CriarProduto;