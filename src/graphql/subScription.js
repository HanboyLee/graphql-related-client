import { gql } from '@apollo/client';

export const SUBSCRIBE_BOOK = gql`
    subscription subscribeBook($title: String) {
        subscribeBook(title: $title) {
            title
            id
            author
        }
    }
`;
