const express = require('express');
const app = express();
const PORT = 8080;

app.use( express.json() )

app.listen(
    PORT,
    () => console.log(`it's alive on http://localhost:${PORT}`)
    )

    app.get('/hello', (req,res) => {
        res.status(200).send({
            message: "Hello"
        })
    });

    app.post('/hello/:id', (req,res) => {
        const{id} = req.params;
        const{message} = req.body;
        res.send({
            message: `Message '${message}' added with id: ${id}`
        })
    });