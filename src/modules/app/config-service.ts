import * as path from 'path'
import * as fs from 'fs'

export class ConfigService {
    private static NEWLINES_MATCH = /\r\n|\n|\r/
    private static NEWLINE = '\n'
    private static RE_INI_KEY_VAL = /^\s*([\w.-]+)\s*=\s*(.*)?\s*$/
    private static RE_NEWLINES = /\\n/g

    private static parseBuffer = (src: Buffer) => {
        const obj = {};
        src.toString().split(this.NEWLINES_MATCH).forEach((line: string, idx: any) => {
            // matching "KEY" and "VAL" in "KEY=VAL"
            const keyValueArr = line.match(this.RE_INI_KEY_VAL);
            // matched?
            if (keyValueArr != null) {
                const key = keyValueArr[1];

                // default undefined or missing values to empty string

                let val = (keyValueArr[2] || '');
                const end = val.length - 1;
                const isDoubleQuoted = val[0] === '"' && val[end] === '"';
                const isSingleQuoted = val[0] === "'" && val[end] === "'";

                // if single or double quoted, remove quotes 
                if (isSingleQuoted || isDoubleQuoted) {
                    val = val.substring(1, end);

                    // if double quoted, expand newlines
                    if (isDoubleQuoted) {
                        val = val.replace(this.RE_NEWLINES, this.NEWLINE);
                    }
                } else {
                    //  remove surrounding whitespace
                    val = val.trim();
                }
                obj[key] = val;
            }
        });
        return obj;
    }
    static env = (parameter: string) => {
        const envFilePath = path.join(process.cwd(), '.env');
        const bufferEnv = fs.readFileSync(envFilePath);
        const envObject = this.parseBuffer(bufferEnv);
        return envObject[parameter]
    }
}