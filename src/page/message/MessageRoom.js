import React, { useCallback } from 'react';
import { NavLink } from 'react-router-dom';
const MessageRoom = ({ match }) => {
    const nameRef = React.useRef();
    const roomRef = React.useRef();

    const [username, setUsername] = React.useState('');
    const [chatRoom, setChatRoom] = React.useState('');

    const onClick = (e) => {
        e.preventDefault();
    };
    const transferLocation = ({ path, chatRoom, username }) => {
        const isContent = (text) => (text.trim().length ? true : false);
        if (isContent(chatRoom) && isContent(username)) {
            return `${path}/messageChat/${chatRoom}`;
        }
        return path;
    };
    return (
        <div>
            <div>
                <form onClick={onClick}>
                    <div>
                        <span style={{ marginRight: 2 }}>USERNAME:</span>
                        <input
                            ref={nameRef}
                            placeholder="Your Name"
                            type="text"
                            value={username}
                            onChange={(e) => {
                                e.stopPropagation();
                                setUsername(nameRef.current.value);
                            }}
                        />
                    </div>
                    <div>
                        <span style={{ marginRight: 2 }}>CHATROOM:</span>
                        <input
                            ref={roomRef}
                            placeholder="Join Room"
                            type="text"
                            value={chatRoom}
                            onChange={(e) => {
                                e.stopPropagation();
                                setChatRoom(roomRef.current.value);
                            }}
                        />
                    </div>
                    <div>
                        <button type="submit">
                            <NavLink
                                style={{ textDecoration: 'none', color: '#000' }}
                                to={transferLocation({ path: match.path, username, chatRoom })}
                            >
                                JOIN
                            </NavLink>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default MessageRoom;
