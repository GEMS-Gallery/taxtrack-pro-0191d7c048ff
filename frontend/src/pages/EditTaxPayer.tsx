import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { backend } from 'declarations/backend';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';

interface TaxPayerForm {
  tid: string;
  firstName: string;
  lastName: string;
  address: string;
}

const EditTaxPayer: React.FC = () => {
  const { tid } = useParams<{ tid: string }>();
  const { control, handleSubmit, formState: { errors }, reset } = useForm<TaxPayerForm>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTaxPayer = async () => {
      if (tid) {
        try {
          const result = await backend.getTaxPayer(tid);
          if ('ok' in result) {
            reset(result.ok);
          } else {
            console.error('TaxPayer not found');
            navigate('/');
          }
        } catch (error) {
          console.error('Error fetching tax payer:', error);
        } finally {
          setLoading(false);
        }
      }
    };
    fetchTaxPayer();
  }, [tid, reset, navigate]);

  const onSubmit = async (data: TaxPayerForm) => {
    try {
      await backend.updateTaxPayer(data);
      navigate('/');
    } catch (error) {
      console.error('Error updating tax payer:', error);
    }
  };

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        Edit TaxPayer
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
              disabled
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
          Update TaxPayer
        </Button>
      </form>
    </Box>
  );
};

export default EditTaxPayer;
