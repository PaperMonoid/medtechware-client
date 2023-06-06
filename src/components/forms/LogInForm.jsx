import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Router from 'next/router';

import AuthService from '../../services/AuthService.js';

const LogInForm = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState(null);
    let email = null;
    if (window.location.hash) {
        try {
            email = atob(window.location.hash.substring(1));
        } catch(error) {
	    console.error(error);
        }
    }

    const schema = yup.object().shape({
        email: yup.string().email('Invalid email').required('Email is required'),
        password: yup.string().required('Password is required'),
    });

    const { handleSubmit, register, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            email: email
        }
    });

    const onSubmit = async (data) => {
        setIsLoading(true);
        setFormData(data);
        try {
            const token = await AuthService.login(data.email, data.password);
            if (token) {
                Router.push('/');
            }
            setIsLoading(false);
        } catch(error) {
            setIsLoading(false);
            console.error(error);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', gap: '10px', flexDirection: 'column' }}>
          <TextField
            {...register('email')}
            label="Email"
            variant="outlined"
            fullWidth
            error={!!errors.email}
            helperText={errors.email?.message}
          />
          <TextField
            {...register('password')}
            label="Password"
            variant="outlined"
            type="password"
            fullWidth
            error={!!errors.password}
            helperText={errors.password?.message}
            autoFocus
          />
          <Button type="submit" variant="contained" color="primary" disabled={isLoading}>
            Log In
          </Button>
        </form>
    );
};

export default LogInForm;
