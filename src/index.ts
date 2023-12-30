#!/usr/bin/env node

import { spawn } from 'child_process';
import { runUI } from './layout';
import { BLUE, RESET } from './codes';
import { processArgs } from './args';

const { command, args, stopCommand, categoryWidth, table } = processArgs(process.argv);

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

    child_process.stdin.write(`${stopCommand}\n`);
}

process.on('SIGTERM', () => onStop(false));

runUI(child_process, table, categoryWidth, () => onStop(true));
