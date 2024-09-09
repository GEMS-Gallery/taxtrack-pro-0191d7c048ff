import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { backend } from 'declarations/backend';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

interface TaxPayerForm {
  tid: string;
  firstName: string;
  lastName: string;
  address: string;
}

const AddTaxPayer: React.FC = () => {
  const { control, handleSubmit, formState: { errors } } = useForm<TaxPayerForm>();
  const navigate = useNavigate();

  const onSubmit = async (data: TaxPayerForm) => {
    try {
      await backend.addTaxPayer(data);
      navigate('/');
    } catch (error) {
      console.error('Error adding tax payer:', error);
    }
  };

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        Add TaxPayer
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="tid"
          control={control}
          defaultValue=""
          rules={{ required: 'TID is required' }}
          render={({ field }) => (
            <TextField
              {...field}
              label="TID"
              variant="outlined"
              fullWidth
              margin="normal"
              error={!!errors.tid}
              helperText={errors.tid?.message}
            />
          )}
        />
        <Controller
          name="firstName"
          control={control}
          defaultValue=""
          rules={{ required: 'First Name is required' }}
          render={({ field }) => (
            <TextField
              {...field}
              label="First Name"
              variant="outlined"
              fullWidth
              margin="normal"
              error={!!errors.firstName}
              helperText={errors.firstName?.message}
            />
          )}
        />
        <Controller
          name="lastName"
          control={control}
          defaultValue=""
          rules={{ required: 'Last Name is required' }}
          render={({ field }) => (
            <TextField
              {...field}
              label="Last Name"
              variant="outlined"
              fullWidth
              margin="normal"
              error={!!errors.lastName}
              helperText={errors.lastName?.message}
            />
          )}
        />
        <Controller
          name="address"
          control={control}
          defaultValue=""
          rules={{ required: 'Address is required' }}
          render={({ field }) => (
            <TextField
              {...field}
              label="Address"
              variant="outlined"
              fullWidth
              margin="normal"
              error={!!errors.address}
              helperText={errors.address?.message}
            />
          )}
        />
        <Button type="submit" variant="contained" color="primary">
          Add TaxPayer
        </Button>
      </form>
    </Box>
  );
};

export default AddTaxPayer;
