import React, { Component } from 'react';
import { Link } from "react-router-dom";
import './index.css';

export default class Produto extends Component {
    state = {
        produto: {},
    };

    componentDidMount() {
        const { id } = this.props.match.params;

        fetch(`${process.env.REACT_APP_API_URL}produto/${id}`)
            .then(produto =>
                produto.json().then(produto => this.setState({ produto }))
            )
            .catch(erro => this.setState({ erro }));
    }

    render() {
        const { produto, index } = this.state;

        if (produto.estoque) {
            produto.estoque = "Produto Ativo";
        } else {
            produto.estoque = "Produto Inativo";
        }

        return (
            <div className="produto-info">
                <h1> {produto.nome} </h1>
                <h1> {produto.tipoProduto} </h1>
                <h1> {produto.estoque} </h1>
                <h1> {produto.preco} </h1>
                <h1> {produto.dataChegada} </h1>
                <h1> {produto.dataValidade} </h1>
                <br />
                <Link to={`/produtos`}> Voltar </Link> <br />
                <Link to={`/editarProduto/${produto.id}`}> Editar </Link> <br />
                <Link to={`/deletarProduto/${produto.id}`}> Deletar </Link> <br />
            </div >
        );
    }
}
