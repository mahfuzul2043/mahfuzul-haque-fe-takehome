import { Paper } from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Routes, Navigate } from 'react-router-dom';
import BusinessInformationStep from './BusinessInformationStep';
import FinanceDetailsStep from './FinanceDetailsStep';
import Header from './Header';
import Quote from './Quote';

function App() {
  const form = useSelector(state => state.form);

  return (
    <div>
      <header data-testid='header'>
        <Header />
      </header>
      <br />
      <main data-testid='main' style={{ display: 'flex', justifyContent: 'center', maxWidth: '50rem', margin: 'auto' }}>
        <Paper style={{ width: '100%', padding: 20 }}>
          <Routes>
            <Route path='business-info' element={<BusinessInformationStep />} />
            {form.businessName && (
              <>
                <Route path='finance-details' element={<FinanceDetailsStep />} />
                <Route path='quote' element={<Quote />} />
              </>
            )}
            <Route path='*' element={<Navigate replace to='/business-info' />} />
          </Routes>
        </Paper>
      </main>
    </div>
  );
}

export default App;
