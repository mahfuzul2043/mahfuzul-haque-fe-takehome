import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import reportWebVitals from './reportWebVitals';
import { createTheme } from '@mui/material/styles';
import { ThemeProvider } from '@emotion/react';
import { CssBaseline } from '@mui/material';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import { BrowserRouter as Router } from 'react-router-dom';

const theme = createTheme({
  palette: {
    mode: 'dark'
  }
})

ReactDOM.render(
  <Router>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <React.StrictMode>
          <App />
        </React.StrictMode>
      </ThemeProvider>
    </Provider>
  </Router>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
