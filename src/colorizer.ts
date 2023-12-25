import { createInterface } from 'readline';
import { PassThrough } from 'stream';
import { RED, RESET, YELLOW } from './codes';

const colors = Object.entries({
    ERR: RED,
    WARN: YELLOW,
    INFO: '',
});

function colorize(stream: NodeJS.ReadableStream) {
    const outputStream = new PassThrough();

    const readline = createInterface(stream);

    let currentColor = '';

    readline.on('line', line => {
        const colorcode = colors.find(([search]) => line.includes(search))?.[1];

        if (colorcode !== undefined) {
            currentColor = colorcode;
        }

        outputStream.write(`${currentColor}${line}${RESET}\n`);
    });

    return outputStream;
}

export { colorize };
