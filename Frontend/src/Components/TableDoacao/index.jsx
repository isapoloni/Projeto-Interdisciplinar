// Desenvolvido por Isabella Poloni

// import {
//   Table,
//   Container,
//   Button,
//   InputGroup,
//   FormControl,
// } from "react-bootstrap";
// import { MdModeEdit } from "react-icons/md";
// import { HiTrash } from "react-icons/hi";
// import { RiSearchLine } from "react-icons/ri";
// import { urlBackend } from "../../assets/funcoes";

import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  TablePagination,
  InputAdornment,
  TextField
} from '@mui/material';
import { MdModeEdit } from 'react-icons/md';
import { HiTrash } from 'react-icons/hi';
import { RiSearchLine } from 'react-icons/ri';
import { Container, Button, InputGroup, FormControl } from 'react-bootstrap';
import { urlBackend } from '../../assets/funcoes';

export default function TableDoacao(props) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [expandedRow, setExpandedRow] = useState(null);

  const handleExpand = (doacao) => {
    setExpandedRow(expandedRow === doacao.codigo ? null : doacao.codigo);
  };

  const handleClick = (event, doacao) => {
    setAnchorEl(event.currentTarget);
    setSelectedDoacao(doacao);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setSelectedDoacao(null);
  };

  function filtrarDoacoesPorCPF(e) {
    const termoBusca = e.currentTarget.value;

    fetch(urlBackend + "/doacao", { method: "GET" })
      .then((resposta) => resposta.json())
      .then((listaDoacoes) => {
        if (Array.isArray(listaDoacoes)) {
          const resultadoBusca = listaDoacoes.filter((doacao) =>
            doacao.cpfDoador.nome.toLowerCase().includes(termoBusca.toLowerCase())
          );
          props.setDoacoes(resultadoBusca);
        }
      });
  }

  function formatarData(data) {
    const dataFormatada = new Date(data);
    const dia = dataFormatada.getDate().toString().padStart(2, '0');
    const mes = (dataFormatada.getMonth() + 1).toString().padStart(2, '0');
    const ano = dataFormatada.getFullYear();
    return `${dia}/${mes}/${ano}`;
  }

  

  return (

    <Container>
      <Button
        className="mb-4"
        onClick={() => {
          props.exibirTabela(false);
        }}
      >
        Nova Doação
      </Button>

      <InputGroup className="mt-2">
        <TextField
          fullWidth
          type="text"
          id="termoBusca"
          placeholder="Busque aqui o doador pelo nome"
          onChange={filtrarDoacoesPorCPF}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <RiSearchLine />
              </InputAdornment>
            ),
          }}
        />
      </InputGroup>

      {/* <InputGroup className="mt-2">
        <FormControl
          type="text"
          id="termoBusca"
          placeholder="Busque aqui o doador pelo nome"
          onChange={filtrarDoacoesPorCPF}
        />
        <InputGroup.Text>
          <RiSearchLine />
        </InputGroup.Text>
      </InputGroup> */}

      <TableContainer component={Paper} className="mt-5">
        <Table size="small" className="custom-table">
          <TableHead>
            <TableRow className="text-center">
              <TableCell style={{ fontSize: '16px', fontWeight: 'bold' }}>Doador</TableCell>
              <TableCell style={{ fontSize: '16px', fontWeight: 'bold' }}>Data da Doação</TableCell>
              <TableCell style={{ fontSize: '16px', fontWeight: 'bold' }}>Itens</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.listaDoacoes?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((doacao) => (
              <React.Fragment key={doacao.codigo}>
                <TableRow>
                  <TableCell>{doacao.cpfDoador.nome}</TableCell>
                  <TableCell>{formatarData(doacao.dataDoacao)}</TableCell>
                  <TableCell>
                    <IconButton onClick={() => handleExpand(doacao)}>
                      <span style={{ fontSize: '12px', fontWeight: 'bold' }}>Detalhes</span>
                    </IconButton>
                  </TableCell>
                </TableRow>
                {expandedRow === doacao.codigo && (
                  <TableRow>
                    <TableCell colSpan={3} className="item-details" style={{ backgroundColor: '#f0f0f0' }}>
                      <h4 style={{ fontSize: '14px', fontWeight: 'bold' }}>Itens da Doação</h4>
                      <Table>
                        <TableHead>
                          <TableRow>
                            <TableCell>Produto</TableCell>
                            <TableCell>Quantidade</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {doacao.listaItens.map((item, index) => (
                            <TableRow key={index}>
                              <TableCell>{item.produto.nome}</TableCell>
                              <TableCell>{item.quantidade}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableCell>
                  </TableRow>
                )}
              </React.Fragment>
            ))}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={props.listaDoacoes?.length || 0}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={(e, newPage) => setPage(newPage)}
          onRowsPerPageChange={(e) => setRowsPerPage(parseInt(e.target.value, 10))}
        />
      </TableContainer>
    </Container>
  );

  // return (
  //   <Container>
  //     <Button
  //       className="mb-4"
  //       onClick={() => {
  //         props.exibirTabela(false);
  //       }}
  //     >
  //       Nova Doação
  //     </Button>

  //     <InputGroup className="mt-2">
  //       <FormControl
  //         type="text"
  //         id="termoBusca"
  //         placeholder="Busque aqui o doador pelo nome"
  //         onChange={filtrarDoacoesPorCPF}
  //       />
  //       <InputGroup.Text>
  //         <RiSearchLine />
  //       </InputGroup.Text>
  //     </InputGroup>

  //     <Table striped bordered hover size="sm" className="mt-5">
  //       <thead>
  //         <tr className="text-center">
  //           {/* <th className="text-center">Código</th> */}
  //           <th className="text-center">Doador</th>
  //           <th className="text-center">Data da Doação</th>
  //           <th className="text-center">Itens</th>
  //           {/* <th className="text-center">Ações</th> */}
  //         </tr>
  //       </thead>
  //       <tbody>
  //         {props.listaDoacoes?.map((doacao) => {
  //           return (
  //             <tr key={doacao.codigo}>
  //               {/* <td>{doacao.codigo}</td> */}
  //               <td>{doacao.cpfDoador.nome}</td>
  //               <td>{formatarData(doacao.dataDoacao)}</td>

  //               <td>
  //                 <ul>
  //                   {doacao.listaItens.map((item, index) => (
  //                     <li key={index}>
  //                       {item.produto.nome} - Quantidade: {item.quantidade}
  //                     </li>
  //                   ))}
  //                 </ul>
  //               </td>
  //               {/* <td>
  //                 <Button
  //                   variant="outline-primary"
  //                   onClick={() => {
  //                     if (
  //                       window.confirm(
  //                         "Deseja atualizar os dados da doação?"
  //                       )
  //                     ) {
  //                       // Adicione a função para editar doação aqui
  //                     }
  //                   }}
  //                 >
  //                   <MdModeEdit />
  //                 </Button>{" "}
  //                 <Button
  //                   variant="outline-danger"
  //                   onClick={() => {
  //                     if (window.confirm("Deseja excluir?")) {
  //                       // Adicione a função para excluir doação aqui
  //                     }
  //                   }}
  //                 >
  //                   <HiTrash />
  //                 </Button>
  //               </td> */}
  //             </tr>
  //           );
  //         })}
  //       </tbody>
  //     </Table>
  //   </Container>
  // );
}
