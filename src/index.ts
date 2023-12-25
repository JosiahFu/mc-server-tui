#!/usr/bin/env node

import { spawn } from 'child_process';
import { runUI } from './layout';

const args = process.argv.slice(2); // Remove the executable and script path

const command = args.shift() // Remove

if (command === undefined) {
    console.error('No command provided');
    process.exit(1);
}

const child_process = spawn(command, args)

child_process.on('exit', code => {
    process.stdout.write('\n');
    process.exit(code ?? undefined);
});

process.on('SIGINT', () => {
    child_process.stdin.write('stop');
})

runUI(child_process);
