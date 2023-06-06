import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import ProductForm from '../../components/forms/ProductForm.jsx';

export default function FormDialog({ product, open, onClose }) {
    return (
        <div>
          <Dialog open={open} onClose={onClose}>
            <DialogTitle>
              {product ? "Edit product": "New product"}
              <Button
                onClick={onClose}
                variant='contained'
                color='error'
                style={{ float: 'right'}}
                disableElevation
              >
                &#10006;
              </Button>
            </DialogTitle>
            <DialogContent>
              <ProductForm product={product} onSaved={onClose}/>
            </DialogContent>
          </Dialog>
        </div>
    );
}


//<DialogContentText></DialogContentText>
// <DialogActions>
// </DialogActions>
