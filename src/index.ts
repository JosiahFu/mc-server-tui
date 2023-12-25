#!/usr/bin/env node

import { spawn } from 'child_process';
import { runUI } from './layout';
import { BLUE, RESET } from './codes';

const args = process.argv.slice(2); // Remove the executable and script path

const command = args.shift(); // Remove

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

runUI(child_process, () => {
    if (stopping) {
        child_process.kill();
        return;
    }
    stopping = true;
    console.warn(
        `${BLUE}\nSending stop command to server...\nPress Ctrl+C again to force stop${RESET}`
    );
    child_process.stdin.write('stop\n');
});
