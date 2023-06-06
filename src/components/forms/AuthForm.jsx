import { useState } from 'react';
import { useForm } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Router from 'next/router';

import AuthService from '../../services/AuthService.js';


const AuthForm = ({ onAccountExists, onAccountDoesNotExist }) => {
    const [isChecking, setIsChecking] = useState(false);
    const { handleSubmit, register } = useForm();

    const onSubmit = async (data) => {
        const { email } = data;

        try {
            setIsChecking(true);
            // Perform the account check (e.g., an API call to check the existence of the email in the database)
            const exists = await AuthService.checkAccountExists(email);

            if (exists) {
                // Account exists
                Router.push(`/auth/log-in#${btoa(email)}`);
            } else {
                // Account does not exists
                Router.push(`/auth/sign-in#${btoa(email)}`);
            }
        } catch (error) {
            console.error('Failed to check account existence', error);
            // Handle error, show error message, etc.
        } finally {
            setIsChecking(false);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', gap: '10px', flexDirection: 'column' }}>
          <TextField {...register('email')} label="Email" variant="outlined" fullWidth autoFocus/>
          <Button type="submit" variant="contained" color="primary" disabled={isChecking}>
            Continue
          </Button>
        </form>
    );
};

export default AuthForm;
