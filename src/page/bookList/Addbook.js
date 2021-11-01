import React from 'react';
//gql
import { useQuery, useMutation, useSubscription, useApolloClient } from '@apollo/client';
import { ADD_BOOK } from '../../graphql/mutation';
import { GET_BOOKS } from '../../graphql/query';
const Addbook = () => {
    const titleRef = React.useRef();
    const authorRef = React.useRef();
    const [titleVal, setTitleVal] = React.useState('');
    const [authorVal, setAuthorVal] = React.useState('');
    const cache = useApolloClient().cache;
    const [addbookHandle] = useMutation(ADD_BOOK);

    const isEmpty = (val) => {
        if (val.trim() === '') return false;
        return true;
    };
    const onSubmit = async (e) => {
        e.preventDefault();
        if (isEmpty(titleVal) && isEmpty(authorVal)) {
            const variables = { title: titleVal, author: authorVal };
            const {
                data: { addBook: returnBook },
            } = await addbookHandle({
                variables,
            });

            const cacheBookdata = cache.readQuery({ query: GET_BOOKS });
            cache.writeQuery({
                query: GET_BOOKS,
                data: {
                    books: [...cacheBookdata.books, returnBook],
                },
            });
            // console.log(returnBook, 'cacheData');
            setTitleVal('');
            setAuthorVal('');
            // setOpen({ open: true, vertical: 'top', horizontal: 'center' });
            console.log('Success');
            return;
        }
        console.log("Title and author can't empty.");
        return;
    };
    return (
        <form onSubmit={onSubmit}>
            <div style={{ width: 300, display: 'flex', flexDirection: 'column' }}>
                <input
                    value={titleVal}
                    ref={titleRef}
                    type="text"
                    onChange={(e) => {
                        e.stopPropagation();
                        setTitleVal(titleRef.current.value);
                    }}
                    placeholder={`Title value`}
                />
                <input
                    placeholder={`Author value`}
                    value={authorVal}
                    ref={authorRef}
                    type="text"
                    onChange={(e) => {
                        e.stopPropagation();
                        setAuthorVal(authorRef.current.value);
                    }}
                />
                <button>AddBook</button>
            </div>
        </form>
    );
};

export default Addbook;
