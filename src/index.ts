#!/usr/bin/env node

import { spawn } from 'child_process';
import { runUI } from './layout';
import { BLUE, RESET } from './codes';

// Parse Args

const args = process.argv.slice(2); // Remove the executable and script path

let STOP_COMMAND = 'stop';

if (args[0] === '--stop-command' && args[1]) {
    args.shift();
    STOP_COMMAND = args.shift()!;
}

const command = args.shift();

if (command === undefined) {
    console.error('No command provided');
    process.exit(1);
}


const child_process = spawn(command, args);

child_process.on('exit', code => {
    process.stdout.write('\n');
    process.exit(code ?? undefined);
});


let stopping = false;

const onStop = (manual = false) => {
    if (stopping) {
        child_process.kill();
        return;
    }
    stopping = true;

    if (manual) {
        console.warn(
            `${BLUE}\nSending stop command to server...\nPress Ctrl+C again to force stop${RESET}`
        );
    }

    child_process.stdin.write(`${STOP_COMMAND}\n`);
}

process.on('SIGTERM', () => onStop(false));

runUI(child_process, () => onStop(true));
