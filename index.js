const express = require('express');
const app = express();
const PORT = 8080;

const userController = require('./controllers/userController');
const wireController = require('./controllers/wireController');
// const profileController = require('./controllers/profileController');

app.use(express.json());

app.get('/login', userController.loginUser);
app.post('/signup', userController.createUser);
app.post('/wire', wireController.makeWire);


// Additional routes for profiles if needed

app.listen(PORT, () => console.log(`Server is alive on http://localhost:${PORT}`));
