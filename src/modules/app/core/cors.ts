import cors, { CorsOptions } from 'cors'
export class Cors {

    /**
     * Generate a function comment for the given function body.
     *
     * @param {CorsOptions} options - optional CORS options
     * @return {Function} the CORS middleware function
     */
    static useCors(options?: CorsOptions) {
        return cors({ ...Cors.options,...options })
    }
    /**
     * Returns the options for the function.
     *
     * @return {CorsOptions} The options object containing the origin, optionsSuccessStatus, and credentials properties.
     */
    private static options(): CorsOptions {
        return {
            origin: '*',             
        }
    }
}