import React from 'react';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from '@mui/material';

export default  function ConfirmationModal({ open, onClose, onConfirm, contentText }) {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Confirmar Atualização</DialogTitle>
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

