import path from 'path';

export const indexController = (req, res) => {
  try {
    if (/\.(js|ico|css|jpe?g|png|webp|svg)$/i.test(req.originalUrl)) {
      res.sendFile(path.join(__dirname, req.originalUrl.replace(/\/casino/, '')));
    } else {
      res.sendFile(path.join(__dirname, '/index.html'));
    }
  } catch (error) {
    res.sendFile(path.join(__dirname, '/index.html'));
  }
};
