export default abstract class  Entity {
	id: string;

	constructor(id?: string) {
		this.id = id || crypto.randomUUID();
	}
}
