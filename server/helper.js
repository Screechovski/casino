module.exports = {
    getIP: (req) => req.headers['x-forwarded-for'] || req.socket.remoteAddress
}