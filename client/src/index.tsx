import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import App from './App';
import './index.css';

import { ApolloClient, InMemoryCache, ApolloProvider, HttpLink, ApolloLink } from '@apollo/client';
import { BrowserRouter } from 'react-router-dom'

const httpLink = new HttpLink({ uri: process.env.REACT_APP_GRAPHQL_API_URL });
const authLink = new ApolloLink((operation, forward) => {
  const accessToken = localStorage.getItem('accessToken');
  operation.setContext({
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',
      authorization: accessToken ?? ''
    }    
  });
  return forward(operation);
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()  
});

const container = document.getElementById('root')!;
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    </ApolloProvider>
  </React.StrictMode>
);

