import React, { useState, useEffect } from 'react';
import ReactDom from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
//apollo graphql
import { client } from './configs/client';
import { ApolloProvider } from '@apollo/client';
//pages
import BookList from './page/bookList';

const Main = () => {
    return (
        <div>
            <BookList />
            <Router>{/* <Message ws={ws} /> */}</Router>
        </div>
    );
};

ReactDom.render(
    <ApolloProvider client={client}>
        <Main />
    </ApolloProvider>,
    document.getElementById('root')
);
