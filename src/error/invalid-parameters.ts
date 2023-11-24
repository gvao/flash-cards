export class InvalidParameter implements Error {
	name: string = "invalid parameter";
	message: string = "invalid parameters";
	stack?: string | undefined;

	constructor(parameter?: string) {
		throw new Error(this.message);
	}
}
