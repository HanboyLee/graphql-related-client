import { gql } from '@apollo/client';

export const ADD_BOOK = gql`
    mutation Add_Book($title: String, $author: String) {
        addBook(title: $title, author: $author) {
            title
            id
            author
        }
    }
`;
