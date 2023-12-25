import { ChildProcess } from 'child_process';
import { createInterface } from 'readline/promises';
import { colorize } from './colorizer.js';
import { Writable } from 'stream';
import { ERASE, RESET, RESTORE, SAVE } from './codes.js';


function runUI(child_process: ChildProcess) {
    let currentInput = '';

    const userWrite = new Writable();
    userWrite._write = (chunk) => {
        currentInput += chunk;
        process.stdout.write(chunk);
    }

    const readUser = createInterface(process.stdin, userWrite);
    const readOutput = createInterface(colorize(child_process.stdout!))
    
    process.stdout.write(SAVE);
    
    readUser.on('line', line => {
        child_process.stdin?.write(line);
        currentInput = '';
    });
    
    readOutput.on('line', line => {
        process.stdout.write(RESTORE);
        process.stdout.write(ERASE);
        process.stdout.write(line + '\n');
        process.stdout.write(SAVE);
        process.stdout.write(currentInput);
    });
}

export { runUI };
