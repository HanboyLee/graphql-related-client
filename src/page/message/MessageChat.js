import React from 'react';

const MessageChat = ({ ws }) => {
    const valueRef = React.useRef();
    const [message, setMessage] = React.useState('');
    const [allMessage, setAllMessage] = React.useState([]);

    const onClick = (e) => {
        const isContent = (text) => (text.trim().length ? true : false);
        e.preventDefault();
        if (!isContent(message)) return;
        console.log(message);
        ws.emit('createMessage', { from: 'User', text: message });
        setMessage('');
    };
    React.useEffect(() => {
        let unMounted = true;
        if (unMounted && ws) {
            ws.on('newMessage', (message) => {
                setAllMessage((prev) => [...prev, message]);
            });
        }
        return () => {
            unMounted = false;
        };
    }, []);

    const getLocationHandle = (e) => {
        e.stopPropagation();
        if (!navigator.geolocation) {
            return console.log('Geolocation is noe supported by your browser.');
        }
        navigator.geolocation.getCurrentPosition(
            (position) => {
                ws.emit('createGeoLocationMessage', {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                });
                console.log(position);
            },
            (err) => {
                console.log(err);
            }
        );
    };
    // console.log(allMessage, 'allMessage');
    return (
        <div>
            <h3>Message11</h3>
            <div style={{ border: `1px solid`, width: 500 }}>
                {allMessage.map((message, i) => {
                    return (
                        <div key={i} style={{ display: 'flex', justifyContent: 'space-around' }}>
                            <div style={{ flex: 1 }}>User:{message.from}</div>
                            {message?.text ? (
                                <div style={{ flex: 1 }}>{message?.text}</div>
                            ) : (
                                <a style={{ flex: 1 }} href={message?.url} rel="nofollow">
                                    location
                                </a>
                            )}
                            <div style={{ flex: 1 }}>User:{message.createdAt}</div>
                        </div>
                    );
                })}
            </div>

            <form onClick={onClick}>
                <input
                    ref={valueRef}
                    type="text"
                    name="message"
                    placeholder="message"
                    value={message}
                    onChange={() => {
                        setMessage(valueRef.current.value);
                    }}
                />
                <button type="submit">submit</button>
            </form>
            <button type="button" onClick={getLocationHandle}>
                getLocation
            </button>
        </div>
    );
};

export default MessageChat;
