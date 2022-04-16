module.exports = {
    getIP: (req) => req.headers['x-forwarded-for'] || req.socket.remoteAddress,
    cleanItems: (array) => {
        if (array.length > 25) {
            return array.slice(Math.max(array.length - 25, 1))
        }
        return array;
    }
}