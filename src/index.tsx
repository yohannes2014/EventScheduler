import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import { Provider } from 'react-redux';
import { store, persistor} from './redux/store';
import { PersistGate } from 'redux-persist/integration/react';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
 <Provider store={store}> 
 
      <BrowserRouter>
      <React.StrictMode>
      <PersistGate persistor={persistor}>
         <App /> 
      </PersistGate>
    </React.StrictMode>
  </BrowserRouter>

  </Provider> 

);

