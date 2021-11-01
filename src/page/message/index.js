import React from 'react';
import { Switch, Route, NavLink, Redirect } from 'react-router-dom';
import MessageChat from './MessageChat';
import MessageRoom from './MessageRoom';
const Message = ({ ws }) => {
    return (
        <div>
            {/* <MessageRoom /> */}
            <Redirect
                // from="/messageRoom"
                to={{
                    pathname: '/messageRoom',
                }}
                exact
            />
            <Switch>
                <Route exact path="/messageRoom" component={MessageRoom} />
                <Route
                    exact
                    path="/messageRoom/MessageChat/:roomId"
                    render={(routeProps) => <MessageChat ws={ws} {...routeProps} />}
                />
            </Switch>
        </div>
    );
};

export default Message;
