import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const LogInForm = () => {
  const [formData, setFormData] = useState(null);

  const schema = yup.object().shape({
    email: yup.string().email('Invalid email').required('Email is required'),
    password: yup.string().required('Password is required'),
  });

  const { handleSubmit, register, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    setFormData(data);
    // Add your logic here for handling form submission
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
      />
      <Button type="submit" variant="contained" color="primary">
        Log In
      </Button>
    </form>
  );
};

export default LogInForm;
