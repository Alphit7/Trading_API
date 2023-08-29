const express = require('express');
const app = express();
const PORT = 8080;

const userController = require('./controllers/userController');
const wireController = require('./controllers/wireController');
const profileController = require('./controllers/profileController');
const tradeController = require ('./controllers/tradeController');

app.use(express.json());

app.get('/login', userController.loginUser);
app.post('/signup', userController.createUser);
app.post('/wire', wireController.makeWire);
app.get('/profile', profileController.getProfile);
app.patch('/update', profileController.updateProfile);
app.get('/trades/index', tradeController.fetchTrades);
app.get('/trades/:id', tradeController.fetchTrade);
app.get('/trades/index/open', tradeController.fetchOpenTrades);
app.get('/trades/index/closed', tradeController.fetchClosedTrades);


// Additional routes for profiles if needed

app.listen(PORT, () => console.log(`Server is alive on http://localhost:${PORT}`));
