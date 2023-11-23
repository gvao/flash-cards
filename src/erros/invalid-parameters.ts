export class InvalidParameter extends Error {
    constructor(parameter?: string) {
        super(parameter);
        throw new Error(`invalid parameters`);
    }
}