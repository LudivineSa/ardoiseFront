import React from 'react';
import App from './App.js';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from "react-router-dom";
import { theme } from "./theme.tsx";
import ReactDOM from "react-dom/client";
import { ApolloClient, ApolloProvider, InMemoryCache, gql } from "@apollo/client"
import { ThemeProvider } from "@mui/material/styles";

export const apolloClient = new ApolloClient({
  uri: "http://localhost:4000",
  cache: new InMemoryCache()
})


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <BrowserRouter>
        <ApolloProvider client={apolloClient}>
          <ThemeProvider theme={theme}>
            <App />
          </ThemeProvider>
        </ApolloProvider>
      </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
