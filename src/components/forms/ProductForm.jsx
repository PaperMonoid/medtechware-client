import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';

import ProductService from '../../services/ProductService.js';


const ProductForm = ({ product, onSaved }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [productCreated, setProductCreated] = useState(false);
    const [productUpdated, setProductUpdated] = useState(false);
    const [productError, setProductError] = useState(null);
    const [imageUrl, setImageUrl] = useState(null);

    const schema = yup.object().shape({
        productName: yup.string().required('Product name is required'),
        productType: yup.string().required('Product type is required'),
        description: yup.string().required('Description is required'),
        price: yup.number().required('Price is required').positive('Price must be positive'),
        additionalInformation: yup.string(),
        imageDescription: yup.string(),
        keywords: yup.string(),
        imageUrl: yup.string().required('Image URL is required'),
    });

    const { handleSubmit, register, formState: { errors }, setValue, watch } = useForm({
        resolver: yupResolver(schema),
        defaultValues: product
    });

    const onSubmit = async (data) => {
        setIsLoading(true);
        try {
            // Call the createProduct method from the ProductService
            if (product) {
                console.log(Object.assign(data, { _id: product._id }));
                const updatedProduct = await ProductService.updateProduct(
                    product._id,
                    Object.assign(data, { _id: product._id })
                );
                console.log('Product updated:', updatedProduct);
                setProductError('');
                setProductUpdated(true);
                setProductCreated(false);
                // Perform any necessary actions after creating the product
                onSaved();
            } else {
                const createdProduct = await ProductService.createProduct(data);
                console.log('Product created:', createdProduct);
                setProductError('');
                setProductCreated(true);
                setProductUpdated(false);
                // Perform any necessary actions after creating the product
                onSaved();
            }
        } catch (error) {
            console.error('Failed to create product', error);
            setProductError('Failed to create product');
            setProductCreated(false);
            setProductUpdated(false);
            // Handle error, show error message, etc.
        } finally {
            setIsLoading(false);
        }
    };

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const img = new Image();
                img.src = e.target.result;
                img.onload = () => {
                    const canvas = document.createElement('canvas');
                    const MAX_SIZE = 256;
                    let width = img.width;
                    let height = img.height;

                    if (width > height) {
                        if (width > MAX_SIZE) {
                            height *= MAX_SIZE / width;
                            width = MAX_SIZE;
                        }
                    } else {
                        if (height > MAX_SIZE) {
                            width *= MAX_SIZE / height;
                            height = MAX_SIZE;
                        }
                    }

                    canvas.width = width;
                    canvas.height = height;

                    const context = canvas.getContext('2d');
                    context.drawImage(img, 0, 0, width, height);

                    const resizedImageUrl = canvas.toDataURL('image/jpeg');

                    setValue('imageUrl', resizedImageUrl);
                };
            };
            reader.readAsDataURL(file);
        }
    };

    const imageUrlValue = watch('imageUrl');

    return (
        <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', gap: '10px', flexDirection: 'column' }}>
          <TextField
            {...register('productName')}
            label="Product Name"
            variant="outlined"
            fullWidth
            error={!!errors.productName}
            helperText={errors.productName?.message}
          />
          <FormControl variant="outlined" fullWidth>
            <InputLabel id="product-type-label">Product Type</InputLabel>
            <Select
              {...register('productType')}
              label="Product Type"
              variant="outlined"
              fullWidth
              error={!!errors.productType}
              helperText={errors.productType?.message}
            >
              <MenuItem value="Product">Product</MenuItem>
              <MenuItem value="Service">Service</MenuItem>
              <MenuItem value="Extra Feature">Extra Feature</MenuItem>
            </Select>
          </FormControl>
          <TextField
            {...register('description')}
            label="Description"
            variant="outlined"
            fullWidth
            error={!!errors.description}
            helperText={errors.description?.message}
          />
          <TextField
            {...register('price')}
            type="number"
            label="Price"
            variant="outlined"
            fullWidth
            error={!!errors.price}
            helperText={errors.price?.message}
          />
          <TextField
            {...register('additionalInformation')}
            label="Additional Information"
            variant="outlined"
            fullWidth
            error={!!errors.additionalInformation}
            helperText={errors.additionalInformation?.message}
          />
          <TextField
            {...register('imageDescription')}
            label="Image Description"
            variant="outlined"
            fullWidth
            error={!!errors.imageDescription}
            helperText={errors.imageDescription?.message}
          />
          <TextField
            {...register('keywords')}
            label="Keywords"
            variant="outlined"
            fullWidth
            error={!!errors.keywords}
            helperText={errors.keywords?.message}
          />
          <input
            type="file"
            accept="image/*"
            onInput={handleImageChange}
            style={{ display: 'none' }}
            {...register('imageFile')}
          />
          <div style={{
              width: '256px',
              height: '256px',
              backgroundImage: `url(${imageUrlValue || ''})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              marginBottom: '10px',
          }}>
            {!imageUrlValue && <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', fontSize: '24px' }}>Image Preview</div>}
          </div>
          <Button type="button" variant="contained" color="secondary" onClick={() => document.querySelector('input[type=file]').click()}>
            Select Image
          </Button>
          <Button type="submit" variant="contained" color="primary" disabled={isLoading}>
            Save Product
          </Button>
          {productCreated && <p>Product created successfully!</p>}
          {productUpdated && <p>Product updated successfully!</p>}
          {productError && <p>{productError}</p>}
        </form>
    );
};

export default ProductForm;
