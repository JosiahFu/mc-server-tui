function exit(code: number, message: string): never {
    console.error(message);
    process.exit(code);
}

function processArgs(argv: string[]) {
    const args = argv.slice(2); // Remove the executable and script path

    let stopCommand = 'stop';
    let table = false;
    let categoryWidth = 12;

    while (args.length > 0) {
        switch (args[0]) {
            case '--stop-command':
                args.shift();
                if (args.length === 0) exit(2, 'Stop command not specified');
                stopCommand = args.shift()!;
                break;
            case '--table':
                args.shift();
                table = true;
                break;
            case '--category-width':
                args.shift();
                if (args.length === 0) exit(3, 'Category width not provided');
                categoryWidth = parseInt(args.shift()!);
                if (isNaN(categoryWidth)) exit(4, 'Invalid category width');
                break;
            default:
                const command = args.shift()!;

                return { stopCommand, table, categoryWidth, command, args }
        }
    }

    exit(1, 'No start command provided')
}

export { processArgs };
