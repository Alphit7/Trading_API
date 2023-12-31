const express = require('express');
const app = express();
const PORT = 8080;

const userController = require('./controllers/userController');
const wireController = require('./controllers/wireController');
const profileController = require('./controllers/profileController');
const tradeController = require('./controllers/tradeController');

const { updateProfileValidation } = require('./controllers/profileController'); 

app.use(express.json());

app.get('/api/login', userController.loginUser);
app.post('/api/signup', userController.createUser);
app.post('/api/wire', wireController.makeWire);
app.get('/api/profile', profileController.getProfile);
app.patch('/api/update', updateProfileValidation, profileController.updateProfile); 
app.get('/api/trades/index', tradeController.fetchTrades);
app.get('/api/trades/:id', tradeController.fetchTrade);
app.get('/api/trades/index/open', tradeController.fetchOpenTrades);
app.get('/api/trades/index/closed', tradeController.fetchClosedTrades);
app.post('/api/openTrade', tradeController.openTrade);
app.post('/api/closeTrade/:id', tradeController.closeTrade);
app.get('/api/closedPNL', tradeController.closedPNL);
app.get('/api/openPNL', tradeController.openPNL);
app.get('/api/currentBalance', profileController.getBalance);

app.listen(PORT, () => console.log(`Server is alive on http://localhost:${PORT}`));
