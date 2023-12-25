import { ChildProcess } from 'child_process';
import { createInterface } from 'readline';
import { colorize } from './colorizer';
import { ERASE, FORWARD, RESTORE, SAVE } from './codes';

async function runUI(child_process: ChildProcess) {
    const readUser = createInterface({
        input: process.stdin,
        output: process.stdout,
        prompt: '> ',
        terminal: true,
    });
    const readOutput = createInterface(colorize(child_process.stdout!));

    process.stdout.write(SAVE);
    readUser.prompt();

    readUser.on('line', line => {
        child_process.stdin?.write(line + '\n');
        readUser.prompt();
    });

    readOutput.on('line', line => {
        process.stdout.write(
            RESTORE +
            ERASE +
            line +
            '\n' +
            SAVE +
            '> ' +
            readUser.line +
            RESTORE +
            FORWARD(2 + readUser.cursor) // +2 for the prompt
        );
    });
}

export { runUI };
