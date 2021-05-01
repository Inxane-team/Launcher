import request from 'request'
var fs = require('fs');

const download = (url, filename, callback, updateProgress = (current, end)=>{}) => {

    const file = fs.createWriteStream(filename);
    let receivedBytes = 0
    
    let length = 1

    request.get(url)
        .on('response', (response) => {
            if (response.statusCode !== 200) {
                return callback('Response status was ' + response.statusCode);
            }
            length = response.headers['content-length']
        })
        .on('data', (chunk) => {
            receivedBytes += chunk.length;
            updateProgress(receivedBytes, length)
        })
        .pipe(file)
        .on('error', (err) => {
            fs.unlink(filename);
        });

        file.on('finish', () => {
            file.close(callback);
        });

        file.on('error', (err) => {
            fs.unlink(filename);
            return callback(err.message);
        });
}

export { download }