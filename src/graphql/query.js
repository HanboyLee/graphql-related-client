import { gql } from '@apollo/client';

export const GET_BOOKS = gql`
    query Get_Books {
        books {
            id
            title
            author
        }
    }
`;
