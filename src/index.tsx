import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './state/store';
import { AppContext } from './wallet-adapter/AppContext';
import WalletModal from './components/modal/walletModal';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';

import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

const client = new ApolloClient({
  uri: process.env.REACT_APP_INDEXER_URL,
  headers: {
    apikey: process.env.REACT_APP_API_KEY as string,
  },
  cache: new InMemoryCache(),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'no-cache',
    },
    query: {
      fetchPolicy: 'no-cache',
    },
  },
});

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <AppContext>
      <BrowserRouter>
        <Provider store={store}>
          <ApolloProvider client={client}>
            <DndProvider backend={HTML5Backend}>
              <App />
            </DndProvider>
          </ApolloProvider>
          <WalletModal />
        </Provider>
      </BrowserRouter>
    </AppContext>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
