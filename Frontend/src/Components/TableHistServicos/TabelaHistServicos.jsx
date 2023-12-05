// Desenvolvido por Isabella Poloni

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
import { Container, Button, InputGroup, FormControl, Modal } from 'react-bootstrap';
import { MdModeEdit } from "react-icons/md";
import { HiDocumentDownload, HiTrash } from "react-icons/hi";
import { AiFillPlusCircle, AiFillQuestionCircle, AiOutlineClear } from 'react-icons/ai'
import { RiSearchLine } from "react-icons/ri";
import { urlBackend } from "../../assets/funcoes";
import Cookies from "universal-cookie";
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';
import { BsCalendarDateFill } from 'react-icons/bs';
import DatePicker from 'react-datepicker';
import { useEffect, useState } from 'react';
import { PainelAjudaServico } from '../PainelAjuda';

export default function TableHistServico(props) {
  // console.log(props)
  const cookies = new Cookies();
  const jwtAuth = cookies.get("authorization");
  const role = cookies.get("role");
  console.log(role)
  const [filtersApplied, setFiltersApplied] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [histServ, setHistServ] = useState([]);
  const [helpPanelVisible, setHelpPanelVisible] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const openHelpPanel = () => {
    setHelpPanelVisible(true);
  };

  const closeHelpPanel = () => {
    setHelpPanelVisible(false);
  };

  function filtrarServicos(e) {
    const termoBusca = e.currentTarget.value;
    // console.log(termoBusca)
    fetch(urlBackend + "/histServ", {
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
        if (listaServicos) {
          const resultadoBusca = listaServicos.filter((histServico) =>
            histServico.prestador.toLowerCase().includes(termoBusca.toLowerCase())
            // histServico.histServico.toLowerCase().includes(termoBusca.toLowerCase())
          );
          setHistServ(resultadoBusca);
        }
      });
  }
  function formatarDataBrasileira(dataISO) {
    const data = new Date(dataISO);
    const dia = data.getUTCDate().toString().padStart(2, '0');
    const mes = (data.getUTCMonth() + 1).toString().padStart(2, '0'); // Adiciona 1 ao mês, pois os meses em JavaScript são baseados em zero
    const ano = data.getUTCFullYear();

    return `${dia}/${mes}/${ano}`;
  }
  const handleDownload = () => {
    const columns = [
      { label: 'Código do serviço', key: 'codigo' },
      { label: 'Nome do Prestador', key: 'prestador', format: 'categoria' },
      { label: 'Nome do serviço', key: 'nome' },
      { label: 'Data do serviço', key: 'serviceData', format: 'date' },
      { label: 'Valor do serviço', key: 'valor' },
    ];
    // console.log('coluns',columns)
    const dataToDownload = [];
    // const servicoToUse = filtersApplied ? histServ: props.listaHistoricoDeServicos;
    const servicoToUse = histServ;
    // console.log('servicoToUse',servicoToUse)
    if (servicoToUse && servicoToUse.length > 0) {
      servicoToUse.map((servico) => {
        const rowData = {
          'Código do serviço': servico.id,
          'Nome do Prestador': servico.prestador,
          'Nome do serviço': servico.servico,
          'Data do serviço': servico.serviceData,
          'Valor do serviço': servico.valor,
        };
        // console.log(servico.serviceData)
        dataToDownload.push(rowData);
      })
    }
    const worksheet = XLSX.utils.json_to_sheet(dataToDownload);

    const maxColLengths = columns.map(col => ({
      width: dataToDownload.reduce((acc, row) => Math.max(acc, String(row[col.key] || '').length), col.label.length)
    }));

    worksheet['!cols'] = maxColLengths;

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'HistorioServiços');
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const data = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    saveAs(data, 'HistorioServiços.xlsx');
  };
  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    fetch(urlBackend + '/histServ', {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "authorization": `${jwtAuth}`
      }
    })
      .then((resposta) => resposta.json())
      .then((listaHistServ) => {
        if (Array.isArray(listaHistServ)) {
          setHistServ(listaHistServ);
          setFiltersApplied(false);
        }
      });
  };
  const handleDateFilter = () => {
    applyFilters();
  };

  const applyFilters = () => {
    if (startDate && endDate) {
      const filteredServicos = histServ.filter((services) => {
        const serviceData = new Date(services.serviceData);
        return startDate <= serviceData && serviceData <= endDate;
      });
      // console.log(filteredServicos)
      setHistServ(filteredServicos);
      setFiltersApplied(true);
      setModalVisible(false);
    } else {
      setFiltersApplied(false);
      setHistServ(props.listaHistoricoDeServicos);
    }
  };

  const clearFilters = () => {
    setStartDate(null);
    setEndDate(null);
    setFiltersApplied(false);
    setHistServ(props.listaHistoricoDeServicos);
    document.getElementById("termoBusca").value = "";
  };
  return (
    <Container>
      <div className="button-container">
        <Button
          className="button-cadastro"
          onClick={() => {
            props.exibirTabela(false);
            props.setModoEdicao(false)
            props.limparForm()
            setHistServ([]);
          }}
        >
          <AiFillPlusCircle style={{ marginRight: '8px' }} /> Resgistrar Serviço
        </Button>
        <Button className='button-filtrar' onClick={() => setModalVisible(true)}>
          <BsCalendarDateFill style={{ marginRight: '8px' }} /> Filtrar por Data
        </Button>
        <Button className="button-download" onClick={handleDownload}>
          <HiDocumentDownload style={{ marginRight: '8px' }} /> Download
        </Button>
        <Button className="button-help" onClick={openHelpPanel}>
          <AiFillQuestionCircle style={{ marginRight: '8px' }} /> Ajuda
        </Button>
        {helpPanelVisible && <PainelAjudaServico onClose={closeHelpPanel} />}
        {filtersApplied && (
          <Button className='button-limpar-filtro' onClick={clearFilters}>
            <AiOutlineClear id='icon-limpar' style={{ marginRight: '8px', color: 'gray' }} /> Limpar Filtro
          </Button>
        )}

        <Modal show={modalVisible} onHide={() => setModalVisible(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Selecione o Intervalo de Datas</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>
              Para refazer uma nova filtragem, por favor, limpe o filtro atual utilizando o botão "Limpar Filtro".
            </p>
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              selectsStart
              startDate={startDate}
              endDate={endDate}
              placeholderText="Data Inicial"
              dateFormat="dd/MM/yyyy"
              className="form-control"
            />
            <DatePicker
              selected={endDate}
              onChange={(date) => setEndDate(date)}
              selectsEnd
              startDate={startDate}
              endDate={endDate}
              minDate={startDate}
              placeholderText="Data Final"
              dateFormat="dd/MM/yyyy"
              className="form-control"
            />
          </Modal.Body>
          <Modal.Footer>
            <Button className='button-limpar-filtro' onClick={clearFilters} disabled={!filtersApplied}>
              Limpar Filtro
            </Button>

            <Button variant="primary" onClick={handleDateFilter}>
              Aplicar Filtro
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
      <InputGroup className="mt-2">
        <TextField
          fullWidth
          type="text"
          id="termoBusca"
          placeholder="Busque uma prestação de serviço"
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
              {/* <TableCell style={{ fontSize: '16px', fontWeight: 'bold' }}>Pessoa</TableCell> */}
              <TableCell style={{ fontSize: '16px', fontWeight: 'bold' }}>Prestador</TableCell>
              <TableCell style={{ fontSize: '16px', fontWeight: 'bold' }}>Serviço</TableCell>
              <TableCell style={{ fontSize: '16px', fontWeight: 'bold' }}>Data do Serviço</TableCell>
              <TableCell style={{ fontSize: '16px', fontWeight: 'bold' }}>Valor</TableCell>
              <TableCell style={{ fontSize: '16px', fontWeight: 'bold' }}>Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {histServ
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((histServico) => (
                <TableRow key={histServico.id}>
                  <TableCell>{histServico.id}</TableCell>
                  <TableCell>{histServico.prestador}</TableCell>
                  <TableCell>{histServico.servico}</TableCell>
                  <TableCell>{formatarDataBrasileira(histServico.serviceData)}</TableCell>
                  <TableCell>{histServico.valor}</TableCell>
                  <TableCell>
                    <IconButton
                      variant="outlined"
                      style={{ color: '#1683cc' }}
                      onClick={() => {
                        if (window.confirm("Deseja atualizar os dados do serviço?")) {
                          props.editar(histServico);
                        }
                      }}
                    >
                      <MdModeEdit />
                    </IconButton>
                    {role !== "user" ? (
                      <IconButton
                        style={{ color: '#cc3116' }}
                        onClick={() => {
                          if (window.confirm("Deseja excluir?")) {
                            props.deletar(histServico);
                            loadData()
                          }
                        }}
                      >
                        <HiTrash />
                      </IconButton>
                    ) : (
                      <></>
                    )}

                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={histServ.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={(_, newPage) => setPage(newPage)}
          onRowsPerPageChange={(event) => {
            setRowsPerPage(parseInt(event.target.value, 10));
            setPage(0);
          }}
        />
      </TableContainer>
    </Container>
  );
}
