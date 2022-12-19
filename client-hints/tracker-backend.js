// tracker-backend.js

const EXPRESS = require('express');
const CH = require('./client-hints.js');
const APP = EXPRESS();
const PORT = 3001;

APP.use((req, res, next) => {
  res.set('Access-Control-Allow-Origin', '*');
  res.set('Accept-CH', CH.HINTS.format());
  res.set('Permissions-Policy', CH.PERMS.format());
  next();
});

APP.get('/tracker', (req, res) => {
  res.set('Content-Type', 'application/javascript');
  res.sendFile(__dirname + '/tracker-script.js');
});

APP.get('/client-hints', (req, res) => {
  let i = 0;
  let headers = req.rawHeaders.filter(() => i++ % 2 == 0);
  console.log('\n*** Headers ***');
  headers.forEach((header) => console.log(`${header}: ${req.get(header)}`));
  console.log('');
  res.status(204).send();
});

APP.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
