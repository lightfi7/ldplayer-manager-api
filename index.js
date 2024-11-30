const express = require('express');
require('dotenv').config();
const { exec } = require('child_process');

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.json({ message: 'Welcome to the API!' });
});

app.post('/command', (req, res) => {
    const { command } = req.body;

    if (!command) {
        return res.status(400).json({ error: 'No command provided' });
    }

    exec($`${process.env.LDPLAYER_PATH}\\dnconsole.exe ${command}`, (error, stdout, stderr) => {
        if (error) {
            return res.status(500).json({ error: error.message });
        }
        if (stderr) {
            return res.status(500).json({ error: stderr });
        }
        res.json({ output: stdout });
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});