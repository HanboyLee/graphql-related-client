import React, { useCallback } from 'react';
//gql
import { useQuery, useSubscription } from '@apollo/client';
import { GET_BOOKS } from '../../graphql/query';
import { SUBSCRIBE_BOOK } from '../../graphql/subScription';

//material
import * as MTL from '@material-ui/core';
import Addbook from './Addbook';
const BookList = () => {
    console.log(window.location.host, 'window.location.host');
    const [open, setOpen] = React.useState(false);
    const { data, loading } = useQuery(GET_BOOKS, {
        fetchPolicy: 'cache-and-network',
        notifyOnNetworkStatusChange: true,
    });
    // const [addbookHandle] = useMutation(ADD_BOOK);
    const { data: subscriptionData, loading: subLoading } = useSubscription(SUBSCRIBE_BOOK, {
        // shouldResubscribe: true,
        variables: {
            title: '123',
        },
    });
    console.log(subscriptionData, 'subscriptionData');
    const getBookData = React.useMemo(() => (data ? data?.[Object.keys(data)] : []), [data]);
    const alertData = React.useMemo(() => {
        if (subscriptionData) {
            setOpen(true);
            return subscriptionData?.[Object.keys(subscriptionData)];
        } else return false;
    }, [subscriptionData]);
    console.log(subscriptionData);
    const handleClose = useCallback(
        (event) => {
            if (alertData) {
                console.log(111);
                setOpen(false);
            }
        },
        [alertData]
    );

    if (loading) {
        return <div>loading...</div>;
    }
    return (
        <div>
            <MTL.Snackbar
                open={open}
                autoHideDuration={6000}
                onClose={handleClose}
                message={alertData?.title}
                // action={action}
            />
            <div>============{alertData.title}========</div>
            <Addbook />
            {getBookData.map((book) => {
                return (
                    <ul key={book.id}>
                        <li>{book.id}</li>
                        <li>{book.title}</li>
                        <li>{book.author}</li>
                    </ul>
                );
            })}
        </div>
    );
};

export default BookList;
