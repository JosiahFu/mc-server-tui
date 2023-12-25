import {createInterface} from 'readline';
import {Duplex, PassThrough, Readable} from 'stream';
import { RED, RESET, YELLOW } from './codes.js';

const colors = Object.entries({
    ERR: RED,
    WARN: YELLOW,
    INFO: RESET,
});

function colorize(stream: NodeJS.ReadableStream) {
    const outputStream = new PassThrough();

    const readline = createInterface(stream)
    
    readline.on('line', line => {
        const colorcode = colors.find(([search]) => line.includes(search))?.[1];

        if (colorcode) {
            outputStream.write(colorcode);
        }
        
        outputStream.write(line + '\n');
    })
    
    return outputStream;
}


export { colorize };
