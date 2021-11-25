const app = require('./app.js')

// Setup Server
const port = 6061;
const server = app.listen(port, () => {
    console.log(`running on localhost ${port}`);
});