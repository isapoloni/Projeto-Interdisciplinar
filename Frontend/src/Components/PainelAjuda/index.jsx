import React from 'react';
import {
    Drawer,
    List,
    ListItem,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Typography,
    Divider,
    Button,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { MdModeEdit } from 'react-icons/md';
import { HiTrash } from 'react-icons/hi';


const PainelAjudaDoacao = ({ onClose }) => {
    const helpItems = [
        {
            title: 'Como registrar uma nova doação?',
            description: 'Clique no botão "Registrar Doação" e preencha os campos necessários, como nome do doador, data da doação, etc. Após preencher, clique em "Salvar" para registrar a nova doação.',
        },
        {
            title: 'Como editar uma doação?',
            description: (
                <span>
                    Encontre a doação na tabela e clique no botão de editar (ícone <MdModeEdit variant="outlined"
                        style={{ color: '#1683cc' }} size={23} />). Faça as alterações necessárias nos campos e clique em "Salvar" para aplicar as mudanças.
                </span>
            ),
        },
        {
            title: 'Como excluir uma doação?',
            description: (
                <span>
                    Encontre a doação na tabela e clique no botão de excluir (ícone <HiTrash variant="outlined"
                        style={{ color: '#cc3116' }} size={23} />). Confirme a exclusão quando solicitado para remover a doação permanentemente.
                </span>
            ),
        },
        {
            title: 'Como filtrar por data?',
            description: 'Para filtrar por data, clique no botão "Filtrar por Data" e selecione um intervalo de datas.',
        },
        {
            title: 'Como baixar a tabela?',
            description: 'Para baixar a tabela, clique no botão "Download" e a tabela será baixada no formato Excel.',
        },
        {
            title: 'Como baixar a tabela em um intervalo de datas?',
            description: 'Para baixar a tabela em um intervalo de datas, clique no botão "Filtrar por Data" e selecione um intervalo de datas, após isso clique no botão "Download" e a tabela será baixada no formato Excel.',
        },
        {
            title: 'Como pesquisar um doador?',
            description: 'Utilize a barra de pesquisa para digitar o nome do doador para realizar a filtragem. Em seguida, você pode baixar a tabela com base no filtro aplicado.',
        },
    ];
    return (
        <Drawer anchor="right" open={true} onClose={onClose} style={{ width: 200 }}>
            <List>
                <ListItem style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="h6">Painel de Ajuda</Typography>
                    <IconButton onClick={onClose} size="small">
                        <CloseIcon />
                    </IconButton>
                </ListItem>
                <Divider />
                {helpItems.map((item, index) => (
                    <Accordion key={index}>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Button variant="outlined" fullWidth style={{ borderColor: 'grey' }}>
                                {item.title}
                            </Button>
                        </AccordionSummary>
                        <AccordionDetails style={{ flexDirection: 'column' }}>
                            <Typography variant="body2">{item.description}</Typography>
                        </AccordionDetails>
                    </Accordion>
                ))}
            </List>
        </Drawer>
    );
};
const PainelAjudaServico = ({ onClose }) => {
    const helpItems = [
        {
            title: 'Como registrar um serviço?',
            description: 'Clique no botão "Registrar Serviço" e preencha os campos necessários, como nome do prestador, data do serviço, valor, etc. Após preencher, clique em "Salvar" para registrar um novo serviço.',
        },
        {
            title: 'Como editar um serviço?',
            description: (
                <span>
                    Encontre o serviço na tabela e clique no botão de editar (ícone <MdModeEdit variant="outlined"
                        style={{ color: '#1683cc' }} size={23} />). Faça as alterações necessárias nos campos e clique em "Salvar" para aplicar as mudanças.
                </span>
            ),
        },
        {
            title: 'Como excluir um serviço?',
            description: (
                <span>
                    Encontre o serviço na tabela e clique no botão de excluir (ícone <HiTrash variant="outlined"
                        style={{ color: '#cc3116' }} size={23} />). Confirme a exclusão quando solicitado para remover o serviço permanentemente.
                </span>
            ),
        },
        {
            title: 'Como filtrar por data?',
            description: 'Para filtrar por data, clique no botão "Filtrar por Data" e selecione um intervalo de datas.',
        },
        {
            title: 'Como baixar a tabela?',
            description: 'Para baixar a tabela, clique no botão "Download" e a tabela será baixada no formato Excel.',
        },
        {
            title: 'Como baixar a tabela em um intervalo de datas?',
            description: 'Para baixar a tabela em um intervalo de datas, clique no botão "Filtrar por Data" e selecione um intervalo de datas, após isso clique no botão "Download" e a tabela será baixada no formato Excel.',
        },
        {
            title: 'Como pesquisar por um serviço?',
            description: 'Utilize a barra de pesquisa para digitar o nome do prestador para realizar a filtragem. Em seguida, você pode baixar a tabela com base no filtro aplicado.',
        },
    ];
    return (
        <Drawer anchor="right" open={true} onClose={onClose} style={{ width: 200 }}>
            <List>
                <ListItem style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="h6">Painel de Ajuda</Typography>
                    <IconButton onClick={onClose} size="small">
                        <CloseIcon />
                    </IconButton>
                </ListItem>
                <Divider />
                {helpItems.map((item, index) => (
                    <Accordion key={index}>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Button variant="outlined" fullWidth style={{ borderColor: 'grey' }}>
                                {item.title}
                            </Button>
                        </AccordionSummary>
                        <AccordionDetails style={{ flexDirection: 'column' }}>
                            <Typography variant="body2">{item.description}</Typography>
                        </AccordionDetails>
                    </Accordion>
                ))}
            </List>
        </Drawer>
    );
};
export {PainelAjudaDoacao, PainelAjudaServico};
