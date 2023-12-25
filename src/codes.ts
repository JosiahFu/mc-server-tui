const ESC = '\x1b';

function SGR(code: number | string) {
    return `${ESC}[${code}m`;
}

export const RED = SGR(31);
export const YELLOW = SGR(33);
export const RESET = SGR(0);

export const SAVE = `${ESC}[s`;
export const RESTORE = `${ESC}[u`;

export const ERASE = `${ESC}[0J`;

export function FORWARD(chars: number | string = '') {
    return `${ESC}[${chars}C`;
}
