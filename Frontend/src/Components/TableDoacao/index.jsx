

import React, { useState, useEffect } from 'react';
import Cookies from "universal-cookie";
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
import { HiTrash, HiDocumentDownload } from 'react-icons/hi';
import { RiSearchLine } from 'react-icons/ri';
import { BsCalendarDateFill } from 'react-icons/bs'
import { AiFillPlusCircle, AiOutlineClear } from 'react-icons/ai'
import { Container, Button, InputGroup, FormControl, Modal } from 'react-bootstrap';
import { urlBackend } from '../../assets/funcoes';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import ConfirmationModal from '../ModalConfirmacao/index'
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';
import get from 'lodash.get';

export default function TableDoacao(props) {
  const cookies = new Cookies();
  const jwtAuth = cookies.get("authorization");

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [expandedRow, setExpandedRow] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [doacoes, setDoacoes] = useState([]);
  const [selectedDoacao, setSelectedDoacao] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [filtersApplied, setFiltersApplied] = useState(false);
  const [downloaded, setDownloaded] = useState(false);
  const [downloadTableVisible, setDownloadTableVisible] = useState(false);
  const [originalDoacoes, setOriginalDoacoes] = useState([]);

  const handleDownload = () => {
    const columns = [
      { label: 'Código da Doação', key: 'codigo' },
      { label: 'Nome do Doador', key: 'cpfDoador.nome' },
      { label: 'Data da Doação', key: 'dataDoacao', format: 'date' },
      { label: 'Produto', key: 'produto' },
      { label: 'Quantidade', key: 'quantidade' },
    ];
  
    const dataToDownload = [];
    const doacoesToUse = filtersApplied ? doacoes : originalDoacoes;
  
    doacoesToUse.forEach(doacao => {
      if (doacao.listaItens && doacao.listaItens.length > 0) {
        doacao.listaItens.forEach(item => {
          const rowData = {
            'Código da Doação': doacao.codigo,
            'Nome do Doador': doacao.cpfDoador.nome,
            'Data da Doação': formatarData(doacao.dataDoacao),
            'Produto': item.produto.nome,
            'Quantidade': item.quantidade,
          };
          dataToDownload.push(rowData);
        });
      } else {
        const rowData = {
          'Código da Doação': doacao.codigo,
          'Nome do Doador': doacao.cpfDoador.nome,
          'Data da Doação': formatarData(doacao.dataDoacao),
          'Produto': '',
          'Quantidade': '',
        };
        dataToDownload.push(rowData);
      }
    });
  
    const worksheet = XLSX.utils.json_to_sheet(dataToDownload);

    const maxColLengths = columns.map(col => ({
      width: dataToDownload.reduce((acc, row) => Math.max(acc, String(row[col.key] || '').length), col.label.length)
    }));
    
    worksheet['!cols'] = maxColLengths;
    
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Doacoes');
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const data = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    saveAs(data, 'doacoes.xlsx');
  };
  
  

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    fetch(urlBackend + '/doacao', {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "authorization": `${jwtAuth}`
      }
    })
      .then((resposta) => resposta.json())
      .then((listaDoacoes) => {
        if (Array.isArray(listaDoacoes)) {
          setDoacoes(listaDoacoes);
          setOriginalDoacoes(listaDoacoes); 
          setFiltersApplied(false);
        }
      });
  };

  const handleDateFilter = () => {
    applyFilters();
  };

  const applyFilters = () => {
    if (startDate && endDate) {
      const filteredDoacoes = doacoes.filter((doacao) => {
        const dataDoacao = new Date(doacao.dataDoacao);
        return startDate <= dataDoacao && dataDoacao <= endDate;
      });
      setDoacoes(filteredDoacoes);
      setFiltersApplied(true);
      setModalVisible(false);
    } else {
      setFiltersApplied(false);
    }
  };

  const clearFilters = () => {
    setStartDate(null);
    setEndDate(null);
    setFiltersApplied(false);
    setDoacoes(props.listaDoacoes);
    document.getElementById("termoBusca").value = "";
  };

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

    fetch(urlBackend + "/doacao", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "authorization": `${jwtAuth}`
      }
    })
      .then((resposta) => resposta.json())
      .then((listaDoacoes) => {
        if (Array.isArray(listaDoacoes)) {
          const resultadoBusca = listaDoacoes.filter((doacao) =>
            doacao.cpfDoador.nome.toLowerCase().includes(termoBusca.toLowerCase())
          );
          setDoacoes(resultadoBusca);
          setFiltersApplied(true);
        }
      });
  }

  const handleOpenModal = (doacao) => {
    setSelectedDoacao(doacao);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleConfirmUpdate = () => {
    props.editar(selectedDoacao);
    handleCloseModal();
  };

  const handleDelete = (codigo) => {
    if (window.confirm("Deseja excluir?")) {

      fetch(urlBackend + '/doacao/' + codigo, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "authorization": `${jwtAuth}`
        }
      })
        .then((resposta) => {
          if (resposta.ok) {
            props.setDoacoes(props.listaDoacoes.filter(doacao => doacao.codigo !== codigo));
          } else {
            console.error("Erro ao excluir a doação.");
          }
        })
        .catch((error) => console.error("Erro ao excluir a doação:", error));
    }
  };


  function formatarData(data) {
    const dataFormatada = new Date(data);
    const dia = dataFormatada.getDate().toString().padStart(2, '0');
    const mes = (dataFormatada.getMonth() + 1).toString().padStart(2, '0');
    const ano = dataFormatada.getFullYear();
    return `${dia}/${mes}/${ano}`;
  }



  return (
    <Container>
      <div className="button-container">
        <Button
          className="nova-doacao-button"
          onClick={() => {
            props.exibirTabela(false);
          }}
        >
          <AiFillPlusCircle style={{ marginRight: '8px' }} /> Nova Doação
        </Button>
        <Button className='buttonFiltrar' onClick={() => setModalVisible(true)}>
          <BsCalendarDateFill style={{ marginRight: '8px' }} /> Filtrar por Data
        </Button>
        <Button variant="success" onClick={handleDownload}>
          <HiDocumentDownload style={{ marginRight: '8px' }} /> Download
        </Button>
        {filtersApplied && (
          <Button variant="secondary" onClick={clearFilters}>
            <AiOutlineClear style={{ marginRight: '8px', color: 'white' }} /> Limpar Filtro
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
            {/* <Button variant="secondary" onClick={clearFilters} disabled={!filtersApplied}>
              Limpar Filtro
            </Button> */}

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
          placeholder="Busque pelo nome do doador ou data da doação"
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



      <TableContainer component={Paper} className="mt-5">
        <Table size="small" className="custom-table">
          <TableHead>
            <TableRow className="text-center">
              <TableCell style={{ fontSize: '16px', fontWeight: 'bold' }}>Doador</TableCell>
              <TableCell style={{ fontSize: '16px', fontWeight: 'bold' }}>Data da Doação</TableCell>
              <TableCell style={{ fontSize: '16px', fontWeight: 'bold' }}>Itens</TableCell>
              <TableCell style={{ fontSize: '16px', fontWeight: 'bold' }}>Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {doacoes
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((doacao) => (
                <React.Fragment key={doacao.codigo}>
                  <TableRow>
                    <TableCell>{doacao.cpfDoador.nome}</TableCell>
                    <TableCell>{formatarData(doacao.dataDoacao)}</TableCell>
                    <TableCell>
                      <IconButton onClick={() => handleExpand(doacao)}>
                        <span style={{ fontSize: '12px', fontWeight: 'bold' }}>Detalhes</span>
                      </IconButton>
                    </TableCell>
                    <TableCell>
                      <IconButton
                        variant="outlined"
                        style={{ color: '#1683cc' }}
                        onClick={() => handleOpenModal(doacao)}
                      >
                        <MdModeEdit />
                      </IconButton>

                      <IconButton
                        variant="outlined"
                        style={{ color: '#cc3116' }}
                        onClick={() => handleDelete(doacao.codigo)}
                      >
                        <HiTrash />
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
          <ConfirmationModal
            open={isModalOpen}
            onClose={handleCloseModal}
            onConfirm={handleConfirmUpdate}
            contentText={`Deseja atualizar os dados da doação ${selectedDoacao?.doador || 'Doação'}?`}
          />
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={doacoes.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={(e, newPage) => setPage(newPage)}
          onRowsPerPageChange={(e) => setRowsPerPage(parseInt(e.target.value, 10))}
        />
      </TableContainer>


    </Container>
  );
}
