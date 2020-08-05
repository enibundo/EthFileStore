const express = require('express');
const ipfsClient = require('ipfs-http-client');
const ipfs = ipfsClient('http://localhost:5001');
const app = express();

app.set('view engine', 'ejs'); 
app.use(express.json());
app.use('/static', express.static('static'))

app.get('/', (req, res) => {
    return res.render('home');;
});

app.post('/upload', async (req, res) => {
    const data = req.body;
    const fileHash = await addFile(data);
    console.log(fileHash);
    return res.send(fileHash);
});

const addFile = async ({ path, content }) => {
    const file = { path: path, content: Buffer.from(content) };
    const filesAdded = await ipfs.add(file);    
    
    return filesAdded.path;
}

app.listen(3000, () => {
    console.log('Server running on port 3000');
});
