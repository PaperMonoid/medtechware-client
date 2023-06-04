import { useState } from 'react';
import { useForm } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const ContactForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const { handleSubmit, register, reset } = useForm();

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      // Send the email
      await sendEmail(data);

      // Reset the form and show success message
      reset();
      setIsSubmitted(true);
    } catch (error) {
      console.error('Failed to send email', error);
      // Handle error, show error message, etc.
    } finally {
      setIsSubmitting(false);
    }
  };

  const sendEmail = async (data) => {
    const { name, email, message } = data;

    // Here, you can use your preferred method for sending an email, e.g. an API call or a server-side function
    // For simplicity, let's assume we're sending a POST request to an API endpoint
    const response = await fetch('/api/send-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        to: 'example@gmail.com',
        subject: 'Contact Form Submission',
        text: `
          Name: ${name}
          Email: ${email}
          Message: ${message}
        `,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to send email');
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
      {isSubmitted && <p>Thank you for your message!</p>}
    </form>
  );
};

export default ContactForm;
