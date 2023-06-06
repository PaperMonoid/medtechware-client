import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardActions, Button, Typography, Grid, IconButton, TextField, Dialog, DialogTitle, DialogContent, DialogActions, Fab } from '@mui/material';
import { AddShoppingCart, Add, Remove, Delete, Edit } from '@mui/icons-material';
import Container from '@mui/material/Container';
import { styled, ThemeProvider } from '@mui/material/styles';
import { grey, deepOrange, pink } from '@mui/material/colors';
import { LightTheme, DarkTheme } from '../../components/Theme.jsx';

import Layout from "../../components/Layout.jsx";
import AuthService from '../../services/AuthService.js';
import ProductService from '../../services/ProductService.js';
import ShoppingCartService from '../../services/ShoppingCartService.js';
import ProductForm from '../../components/forms/ProductForm.jsx';
import ProductModal from "../../components/modals/ProductModal.jsx";


const CatalogSection = styled(Container)(({ theme }) => ({
    width: '100%',
    background: theme.palette.grey[100],
    color: theme.palette.text.primary,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '50px',
    minHeight: '100vh',
    marginTop: '-64px',
    paddingTop: '128px'
}));

const ColorButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText(deepOrange[500]),
    backgroundColor: deepOrange[500],
    '&:hover': {
        backgroundColor: deepOrange[700],
    },
    fontWeight: 600,
}));


export default function Catalog() {
    const [products, setProducts] = useState([]);
    const [open, setOpen] = useState(false);
    const [openProduct, setOpenProduct] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    });

    useEffect(() => {
        ProductService.listProducts().then(setProducts);
    }, []);

    const handleCloseCart = () => {
        setSelectedProduct(null);
        setOpen(false);
    };

    const handleAddToCartClick = (product) => {
        setSelectedProduct(product);
        setOpen(true);
    };

    const handleAddToCartConfirm = () => {
        if (AuthService.isLoggedIn()) {
            ShoppingCartService.addToCart(selectedProduct.id, quantity);
        }
        setOpen(false);
    };

    const handleRemoveProduct = (product) => {
        if (AuthService.isAdmin()) {
            ProductService
                .deleteProduct(product._id)
                .then(ProductService.listProducts)
                .then(setProducts);
        }
    };

    const handleUpdateProduct = (product) => {
        if (AuthService.isAdmin()) {
            setSelectedProduct(product);
	    setOpenProduct(true);
        }
    };

    return (
        <Layout isLight={true}>
          <CatalogSection maxWidth={false}>
            <Grid container spacing={2} item xs={9}>
              <Grid item xs={12}>
                <Typography variant="h4" color="secondary">
                  Discover our wide range of products
                </Typography>
                <Typography variant="h5" color="secondary" style={{ fontSize: '0.5em', opacity: 0.7 }}>
                  The cart functionallity isn't fully working.
                </Typography>
              </Grid>
              {products.map(product => (
                  <Grid item key={product.id} xs={12} sm={6} md={4}>
                    <Card elevation={0} style={{ border: `1px solid ${LightTheme.palette.grey[400]}`, minHeight: '550px' }}>
                      <CardContent>
                        <div style={{ width: '100%', textAlign: 'center'}}>
                          <img src={product.imageUrl}/>
                        </div>
                         <Typography variant="h5" component="span">{product.productName}</Typography>
                        <Typography
                          variant="h5"
                          component="span"
                          color="primary"
                          style={{ float: 'right', fontWeight: 800}}
                        >
                          {formatter.format(product.price)}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {product.description}
                        </Typography>
                      </CardContent>
                      {AuthService.isLoggedIn() && (
                          <CardActions>
                            {AuthService.isAdmin() &&
                             <>
                               <Button
                                 size="big"
                                 variant='contained'
                                 color='error'
                                 fullWidth={true}
                                 disableElevation
                                 onClick={() => handleRemoveProduct(product)}>
                                 <Delete />
                               </Button>
                               <Button
                                 size="big"
                                 variant='contained'
                                 color='secondary'
                                 fullWidth={true}
                                 disableElevation
                                 onClick={() => handleUpdateProduct(product)}>
                                 <Edit />
                               </Button>
                             </>}
                            <ColorButton
                              size="big"
                              variant='contained'
                              fullWidth={true}
                              disableElevation
                              onClick={() => handleAddToCartClick(product)}>
                              <AddShoppingCart />
                            </ColorButton>
                          </CardActions>
                      )}
                    </Card>
                  </Grid>
              ))}
              {
                  AuthService.isAdmin() &&
                      <Fab
                        color="primary"
                        aria-label="add"
                        style={{ position: 'fixed', bottom : '50px', right: '50px'}}
                        onClick={() => setOpenProduct(true)}
                      >
                        <Add />
                      </Fab>
              }
            </Grid>

            <ProductModal
              open={openProduct}
              product={selectedProduct}
              onClose={() => {
                  ProductService.listProducts().then(setProducts);
                  setOpenProduct(false);
              }}/>

            <Dialog open={open} onClose={handleCloseCart}>
              <DialogTitle>Add to Cart <span style={{ fontWeight: 800 }}>{selectedProduct?.productName}</span></DialogTitle>
              <DialogContent>
                <div>
                  <IconButton onClick={() => setQuantity(q => Math.max(1, q - 1))}>
                    <Remove />
                  </IconButton>
                  <TextField value={quantity} onChange={e => setQuantity(Number(e.target.value))} type="number" />
                  <IconButton onClick={() => setQuantity(q => q + 1)}>
                    <Add />
                  </IconButton>
                </div>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleCloseCart} color='error'>Cancel</Button>
                <Button onClick={handleAddToCartConfirm} color="primary">Add to Cart</Button>
              </DialogActions>
            </Dialog>
          </CatalogSection>
        </Layout>
    );
}
