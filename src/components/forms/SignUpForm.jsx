import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

import Link from '../MUILink.jsx';

const SignUpForm = () => {


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
        fullName: yup.string().required('Full name is required'),
        email: yup.string().email('Invalid email').required('Email is required'),
        password: yup.string().required('Password is required').min(6, 'Password should be at least 6 characters'),
        confirmPassword: yup.string()
            .oneOf([yup.ref('password'), null], 'Passwords must match')
            .required('Confirm password is required'),
    });

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            email: email
        }
    });

    const onSubmit = (data) => {
        setFormData(data);
        // Perform additional signup logic here...
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
            {...register('fullName')}
            label="Full Name"
            variant="outlined"
            fullWidth
            error={!!errors.fullName}
            helperText={errors.fullName?.message}
            autoFocus
          />
          <TextField
            {...register('password')}
            type="password"
            label="Password"
            variant="outlined"
            fullWidth
            error={!!errors.password}
            helperText={errors.password?.message}
          />
          <TextField
            {...register('confirmPassword')}
            type="password"
            label="Confirm Password"
            variant="outlined"
            fullWidth
            error={!!errors.confirmPassword}
            helperText={errors.confirmPassword?.message}
          />
          <Button type="submit" variant="contained" color="primary">
            Sign Up
          </Button>
          <Typography variant='caption'>
            Already got an account? <Link href='/auth/log-in' style={{ textDecoration: 'underline'}}>Log in</Link>
          </Typography>
        </form>
    );
};

export default SignUpForm;
