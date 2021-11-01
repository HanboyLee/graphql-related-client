import { ApolloClient, InMemoryCache } from '@apollo/client';
import { split } from 'apollo-link';
import { getMainDefinition } from 'apollo-utilities';
import { HttpLink } from 'apollo-link-http';
import { WebSocketLink } from 'apollo-link-ws';
import { setContext } from '@apollo/client/link/context';

const serverPort = 3000;
const wsProt = 8080;
const serverUri = `http://localhost:${serverPort}`;
const localHttpUri = `http://localhost:${serverPort}/graphql`;
const localWebsocketUri = `ws://localhost:${serverPort}/subscriptions`;
const cache = new InMemoryCache();
const httpLink = new HttpLink({
    uri: process.env.NODE_ENV === 'production' ? null : localHttpUri,
});
const wsLink = new WebSocketLink({
    uri: process.env.NODE_ENV === 'production' ? null : localWebsocketUri,
    options: {
        reconnect: true,
    },
});

// Using the `split()` function, we can send data to each link's
// uri depending on what kind of operation is being performed
const link = split(
    // split based on operation type
    ({ query }) => {
        const { kind, operation } = getMainDefinition(query);
        console.log(kind, operation, 'query');
        return kind === 'OperationDefinition' && operation === 'subscription';
    },
    wsLink,
    httpLink
);

export const client = new ApolloClient({
    uri: localHttpUri,
    cache,
    defaultOptions: {
        watchQuery: {
            fetchPolicy: 'cache-and-network',
        },
    },
    link,
});
