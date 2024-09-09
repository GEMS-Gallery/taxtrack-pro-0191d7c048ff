import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { backend } from 'declarations/backend';
import DataTable from 'react-data-table-component';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';

interface TaxPayer {
  tid: string;
  firstName: string;
  lastName: string;
  address: string;
}

const Home: React.FC = () => {
  const [taxPayers, setTaxPayers] = useState<TaxPayer[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const columns = [
    {
      name: 'TID',
      selector: (row: TaxPayer) => row.tid,
      sortable: true,
    },
    {
      name: 'First Name',
      selector: (row: TaxPayer) => row.firstName,
      sortable: true,
    },
    {
      name: 'Last Name',
      selector: (row: TaxPayer) => row.lastName,
      sortable: true,
    },
    {
      name: 'Address',
      selector: (row: TaxPayer) => row.address,
      sortable: true,
    },
    {
      name: 'Actions',
      cell: (row: TaxPayer) => (
        <>
          <Button
            variant="outlined"
            size="small"
            onClick={() => navigate(`/edit/${row.tid}`)}
          >
            Edit
          </Button>
          <Button
            variant="outlined"
            color="error"
            size="small"
            onClick={() => handleDelete(row.tid)}
          >
            Delete
          </Button>
        </>
      ),
    },
  ];

  useEffect(() => {
    fetchTaxPayers();
  }, []);

  const fetchTaxPayers = async () => {
    setLoading(true);
    try {
      const result = await backend.getAllTaxPayers();
      setTaxPayers(result);
    } catch (error) {
      console.error('Error fetching tax payers:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async () => {
    setLoading(true);
    try {
      const result = await backend.searchTaxPayers(searchQuery);
      setTaxPayers(result);
    } catch (error) {
      console.error('Error searching tax payers:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (tid: string) => {
    try {
      await backend.deleteTaxPayer(tid);
      fetchTaxPayers();
    } catch (error) {
      console.error('Error deleting tax payer:', error);
    }
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', mb: 2 }}>
        <TextField
          label="Search"
          variant="outlined"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          sx={{ mr: 2 }}
        />
        <Button variant="contained" onClick={handleSearch}>
          Search
        </Button>
      </Box>
      <DataTable
        columns={columns}
        data={taxPayers}
        pagination
        progressPending={loading}
        progressComponent={<CircularProgress />}
      />
    </Box>
  );
};

export default Home;
