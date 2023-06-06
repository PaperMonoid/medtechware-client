import { useState } from 'react';
import { useForm } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const ContactForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const { handleSubmit, register, reset } = useForm();

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      const response = await fetch(process.env.NEXT_PUBLIC_EMAIL_SUBMIT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Failed to send email');
      }

      reset();
      setIsSubmitted(true);
    } catch (error) {
      console.error('Failed to send email', error);
      // Handle error, show error message, etc.
    } finally {
      setIsSubmitting(false);
    }
  };


  return (
      <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', gap: '10px', flexDirection: 'column' }}>
      <TextField {...register('name')} label="Name" variant="outlined" fullWidth />
      <TextField {...register('email')} label="Email" variant="outlined" fullWidth />
      <TextField
        {...register('message')}
        label="Message"
        variant="outlined"
        multiline
        rows={4}
        fullWidth
      />
      <Button type="submit" variant="contained" color="primary" disabled={isSubmitting}>
        Submit
      </Button>
        {isSubmitted &&
         <Typography variant='h5' color='secondary'>
           <span style={{ fontWeight: 900 }}>Thank you</span> for your message!
         </Typography>
        }
    </form>
  );
};

export default ContactForm;
