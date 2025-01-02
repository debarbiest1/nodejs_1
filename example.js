import http from 'http';
const server = http.createServer((req, res) =>{
    res.write('Hello');
    res.end();
});
const PORT=8080;

server.listen(PORT, () => {
    console.log(`Server is ruunimg on port ${PORT}`)
});
