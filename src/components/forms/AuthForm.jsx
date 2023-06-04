import { useState } from 'react';
import { useForm } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Router from 'next/router';


const AuthForm = ({ onAccountExists, onAccountDoesNotExist }) => {
  const [isChecking, setIsChecking] = useState(false);
  const { handleSubmit, register } = useForm();

  const onSubmit = async (data) => {
      const { email } = data;
      Router.push('/auth/sign-in');
    setIsChecking(true);

    try {
      // Perform the account check (e.g., an API call to check the existence of the email in the database)
      const exists = await checkAccountExists(email);

      if (exists) {
        // Account exists
        onAccountExists(email);
      } else {
        // Account does not exist
        onAccountDoesNotExist(email);
      }
    } catch (error) {
      console.error('Failed to check account existence', error);
      // Handle error, show error message, etc.
    } finally {
      setIsChecking(false);
    }
  };

  const checkAccountExists = async (email) => {
    // Here, you can use your preferred method to check if the account exists, e.g., an API call or a server-side function
    // For simplicity, let's assume the account exists if the email ends with "@example.com"
    return email.endsWith('@example.com');
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
