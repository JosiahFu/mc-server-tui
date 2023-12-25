import { ChildProcess } from 'child_process';
import { createInterface } from 'readline';
import { ColorizerTransform } from './colorizer';
import { ERASE, FORWARD, RESTORE, SAVE } from './codes';

async function runUI(child_process: ChildProcess, onSigInt?: () => void) {
    const readUser = createInterface({
        input: process.stdin,
        output: process.stdout,
        prompt: '> ',
        terminal: true,
    });
    const output = child_process.stdout!.pipe(new ColorizerTransform());

    process.stdout.write(SAVE);
    readUser.prompt();

    readUser.on('line', line => {
        child_process.stdin?.write(line + '\n');
        readUser.prompt();
    });

    onSigInt && readUser.on('SIGINT', onSigInt);

    output.on('data', chunk => {
        const chunkString: string = chunk.toString();

        process.stdout.write(
            RESTORE +
                ERASE +
                chunkString +
                SAVE +
                '> ' +
                readUser.line +
                RESTORE +
                FORWARD(2 + readUser.cursor) // +2 for the prompt
        );
    });
}

export { runUI };
