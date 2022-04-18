const userOnline = (io, socket) => async (data) => {
    const {
        user_id,
        dialogs
    } = JSON.parse(data);

    if (validParams(EVENTS.USER_ONLINE, socket, user_id, dialogs)) {
        try {
            socket.join(dialogs);

            if (user_id in USERS_DATA) {
                USERS_DATA[user_id].socketId = [...USERS_DATA[user_id].socketId, socket.id];
            } else {
                USERS_DATA[user_id] = {
                    userId: user_id,
                    dialogs,
                    socketId: [socket.id],
                    socket,
                };
            }

            io
                .in(dialogs)
                .emit(
                    EVENTS.ALL_USER_ONLINE,
                    JSON.stringify({
                        users: Object.keys(USERS_DATA)
                    })
                );

            console.log(`${user_id}: Пользователь зашел в сеть. Пользователи в сети: `, Object.keys(USERS_DATA));
        } catch (error) {
            socket.emit(EVENTS.USER_ONLINE_ERROR, data, error);
            console.log(`Error in ${EVENTS.USER_ONLINE}`, error);
        }
    }
};

module.exports = {
    userOnline
}