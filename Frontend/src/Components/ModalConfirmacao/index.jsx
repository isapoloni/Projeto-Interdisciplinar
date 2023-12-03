import React from 'react';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from '@mui/material';
import { MdWarning } from 'react-icons/md';

export default function ConfirmationModal({ open, onClose, onConfirm, contentText, title }) {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>
        <MdWarning style={{ color: 'orange', marginRight: '10px' }} />
        {title}
      </DialogTitle>
      <DialogContent>
        <DialogContentText>{contentText}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancelar</Button>
        <Button onClick={onConfirm} color="primary">
          Confirmar
        </Button>
      </DialogActions>
    </Dialog>
  );
}
