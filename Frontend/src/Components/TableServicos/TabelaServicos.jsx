
import  { useState } from 'react';
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
  TextField,
} from '@mui/material';
import { Container, Button, InputGroup, FormControl } from 'react-bootstrap';
import { MdModeEdit } from "react-icons/md";
import { HiDocumentDownload, HiTrash } from "react-icons/hi";
import { AiFillPlusCircle, AiOutlineClear } from 'react-icons/ai'
import { RiSearchLine } from "react-icons/ri";
import { urlBackend } from "../../assets/funcoes";
import Cookies from "universal-cookie";
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';


export default function TableServico(props) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const cookies = new Cookies();
  const jwtAuth = cookies.get("authorization");


  function filtrarServicos(e) {
    const termoBusca = e.currentTarget.value;
    fetch(urlBackend + "/servicos", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: `${jwtAuth}`,
      },
    })
      .then((resposta) => {
        return resposta.json();
      })
      .then((listaServicos) => {
        if (Array.isArray(listaServicos)) {
          const resultadoBusca = listaServicos.filter((servico) =>
            servico.servico.toLowerCase().includes(termoBusca.toLowerCase())
          );
          props.setServicos(resultadoBusca);
        }
      });
  }
  // const loadData = () => {
  //   fetch(urlBackend + '/serv', {
  //     method: "GET",
  //     headers: {
  //       "Content-Type": "application/json",
  //       "authorization": `${jwtAuth}`
  //     }
  //   })
  //     .then((resposta) => resposta.json())
  //     .then((listaHistServ) => {
  //       if (Array.isArray(listaHistServ)) {
  //         setHistServ(listaHistServ);
  //         setFiltersApplied(false);
  //       }
  //     });
  // }
  const handleDownload = () => {
    const columns = [
      { label: 'Código do serviço', key: 'codigo' },
      { label: 'Nome do serviço', key: 'nome' },
      { label: 'Categoria do serviço', key: 'categoria' },
      { label: 'Descrição do serviço', key: 'descricao' },
    ];
    // console.log('coluns', columns)
    const dataToDownload = [];
    const servicoToUse = props.listaServicos;
    // console.log('servicoToUse', servicoToUse)
    if (servicoToUse.length > 0) {
      servicoToUse.map((servico) => {
        const rowData = {
          'Código do serviço': servico.id,
          'Nome do serviço': servico.servico,
          'Categoria do serviço': servico.categoria,
          'Descrição do serviço': servico.descricao,
        };
        // console.log('rowData', rowData)
        dataToDownload.push(rowData);
      })
    }
    const worksheet = XLSX.utils.json_to_sheet(dataToDownload);

    const maxColLengths = columns.map(col => ({
      width: dataToDownload.reduce((acc, row) => Math.max(acc, String(row[col.key] || '').length), col.label.length)
    }));

    worksheet['!cols'] = maxColLengths;

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Serviços');
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const data = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    saveAs(data, 'serviços.xlsx');
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };


  return (
    <Container>
      <div className="button-container">
        <Button
          className="button-cadastro"
          onClick={() => {
            props.exibirTabela(false);
            props.setModoEdicao(false)
          }}
        >
          <AiFillPlusCircle style={{ marginRight: '8px' }} /> Cadastrar serviço
        </Button>
        {/* <Button className="button-download" onClick={handleDownload}>
          <HiDocumentDownload style={{ marginRight: '8px' }} /> Download
        </Button> */}
      </div>
      <InputGroup className="mt-2">
        <TextField
          fullWidth
          type="text"
          id="termoBusca"
          placeholder="Busque o serviço desejado"
          onChange={filtrarServicos}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <RiSearchLine />
              </InputAdornment>
            ),
          }}
        />
      </InputGroup>


      <TableContainer component={Paper} className="mt-5">
        <Table striped bordered hover size="sm" className="custom-table">
          <TableHead>
            <TableRow className="text-center">
              <TableCell style={{ fontSize: '16px', fontWeight: 'bold' }}>Código</TableCell>
              <TableCell style={{ fontSize: '16px', fontWeight: 'bold' }}>Serviço</TableCell>
              <TableCell style={{ fontSize: '16px', fontWeight: 'bold' }}>Categoria</TableCell>
              <TableCell style={{ fontSize: '16px', fontWeight: 'bold' }}>Descrição</TableCell>
              <TableCell style={{ fontSize: '16px', fontWeight: 'bold' }}>Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.listaServicos
              ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((servico) => (
                <TableRow key={servico.id}>
                  <TableCell>{servico.id}</TableCell>
                  <TableCell>{servico.servico}</TableCell>
                  <TableCell>{servico.categoria}</TableCell>
                  <TableCell>{servico.descricao}</TableCell>
                  <TableCell>
                    <IconButton
                      variant="outlined"
                      style={{ color: '#1683cc' }}
                      onClick={() => {
                        if (window.confirm('Deseja atualizar os dados do serviço?')) {
                          const servicoSelecionado = {
                            id: servico.id,
                            servico: servico.servico,
                            categoria: props.categorias.filter(categoria => categoria.categoria === servico.categoria)[0].categoria,
                            descricao: servico.descricao
                          }
                          // console.log(props.categorias)
                          // console.log(servicoSelecionado)
                          // console.log(servico)
                          props.editar(servicoSelecionado);
                        }
                      }}
                    >
                      <MdModeEdit />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={props.listaServicos?.length || 0}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>
    </Container>
  );
}



