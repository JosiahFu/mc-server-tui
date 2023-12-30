import { PassThrough, Transform, TransformCallback } from 'stream';
import { RED, RESET, YELLOW } from './codes';

const colors = Object.entries({
    ERR: RED,
    WARN: YELLOW,
    INFO: '',
});

// Assumes input does not have partial lines
class ColorizerTransform extends Transform {
    currentColor = '';

    _transform(
        chunk: any,
        _: BufferEncoding,
        callback: TransformCallback
    ): void {
        const prevColor = this.currentColor;

        const chunkString: string = chunk.toString();

        const lines = chunkString.split('\n');

        const coloredLines = lines.map(line => {
            const colorcode = colors.find(([search]) =>
                line.includes(search)
            )?.[1];

            if (colorcode === undefined || colorcode === this.currentColor) {
                return line;
            }

            this.currentColor = colorcode;
            return `${colorcode}${line}`;
        });

        this.push(prevColor + coloredLines.join('\n') + RESET);

        callback();
    }
}

export { ColorizerTransform };
