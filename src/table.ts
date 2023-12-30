import { Transform, TransformCallback } from 'stream';

const LOG_REGEX = /\[(.*?)\] \[(.*?)\] (.*)/;

class TableTransform extends Transform {
    categoryWidth: number;

    constructor(categoryWidth: number) {
        super();
        this.categoryWidth = categoryWidth;
    }

    _transform(chunk: any, encoding: BufferEncoding, callback: TransformCallback): void {
        const chunkString: string = chunk.toString();

        const tabledLines = chunkString.split('\n').map(line => {
            const result = line.match(LOG_REGEX);

            if (result === null) return line;

            const [_, time, category, info] = result;

            return `${time} ${category.padEnd(this.categoryWidth, ' ')} ${info}`;
        });

        this.push(tabledLines.join('\n'));
        callback();
    }
}

export { TableTransform };
