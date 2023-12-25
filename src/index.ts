import { spawn } from 'child_process';
import { runUI } from './layout.js';
import { colorize } from './colorizer.js';

const args = [...process.argv]
args.shift(); // Remove the executable argument
const command = args.shift() // Remove

if (command === undefined) {
    console.error('No command provided');
    process.exit(1);
}

const child_process = spawn(command, args)

runUI(child_process);
