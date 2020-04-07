import '../public/style.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloClient } from 'apollo-client';
import { InMemoryCache, NormalizedCacheObject } from 'apollo-cache-inmemory';
import { ApolloProvider } from '@apollo/react-hooks';
import { createUploadLink } from 'apollo-upload-client';
import App from './App';

const cache = new InMemoryCache();
const link = createUploadLink({
  uri: 'http://localhost:5000/graphql',
  headers: {
    authorization: localStorage.getItem('token'),
  },
});

const client: ApolloClient<NormalizedCacheObject> = new ApolloClient({
  link,
  cache,
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root')
);
