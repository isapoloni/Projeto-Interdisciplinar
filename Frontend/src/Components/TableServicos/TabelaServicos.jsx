

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
  console.log(props)
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

  const handleDownload = () => {
    const columns = [
      { label: 'Código do serviço', key: 'codigo' },
      { label: 'Nome do serviço', key: 'nome' },
      { label: 'Categoria do serviço', key: 'categoria' },
      { label: 'Descrição do serviço', key: 'descricao' },
    ];
    console.log('coluns',columns)
    const dataToDownload = [];
    const servicoToUse = props.listaServicos;
    console.log('servicoToUse',servicoToUse)
    if(servicoToUse.length > 0){
      servicoToUse.map((servico)=>{
        const rowData = {
          'Código do serviço': servico.id,
          'Nome do serviço': servico.servico,
          'Categoria do serviço': servico.categoria,
          'Descrição do serviço': servico.descricao,
        };
        console.log('rowData',rowData)
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
  return (
    <Container>
      <div className="button-container">
        <Button
          className="button-cadastro"
          onClick={() => {
            props.exibirTabela(false);
          }}
        >
          <AiFillPlusCircle style={{ marginRight: '8px' }} /> Cadastrar serviço
        </Button>
        <Button className="button-download" onClick={handleDownload}>
          <HiDocumentDownload style={{ marginRight: '8px' }} /> Download
        </Button>
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
              {/* <TableCell style={{ fontSize: '16px', fontWeight: 'bold' }}>Pessoa</TableCell> */}
              <TableCell style={{ fontSize: '16px', fontWeight: 'bold' }}>Serviço</TableCell>
              <TableCell style={{ fontSize: '16px', fontWeight: 'bold' }}>Categoria</TableCell>
              <TableCell style={{ fontSize: '16px', fontWeight: 'bold' }}>Descrição</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.listaServicos?.map((servico) => (
              <TableRow key={servico.id}>
                <TableCell>{servico.id}</TableCell>
                {/* <TableCell>{servico.cpfPessoa}</TableCell> */}
                <TableCell>{servico.servico}</TableCell>
                <TableCell>{servico.categoria}</TableCell>
                <TableCell>{servico.descricao}</TableCell>
                <TableCell>
                  <IconButton
                    variant="outlined"
                    style={{ color: '#1683cc' }}
                    onClick={() => {
                      if (window.confirm("Deseja atualizar os dados do serviço?")) {
                        props.editar(servico);
                      }
                    }}
                  >
                    <MdModeEdit />
                  </IconButton>{" "}
                  {/* <IconButton
                    variant="outlined"
                    style={{ color: '#cc3116' }}
                    onClick={() => {
                      if (window.confirm("Deseja excluir?")) {
                        props.deletar(servico);
                      }
                    }}
                  >
                    <HiTrash />
                  </IconButton> */}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
  }
    
  

