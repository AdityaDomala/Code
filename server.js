const express = require('express');
const path = require('path');

const app = express();

const port = 3000; // Adjust if needed


// Serve static files from the 'dataset' directory
app.use('/dataset', express.static(path.join(__dirname, 'dataset')));
app.use(express.static(path.join(__dirname)));

// Serve index.html for all other routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
