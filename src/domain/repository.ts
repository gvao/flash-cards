export interface Repository<T> {
	add(item: T): Promise<void>;
	getAll(): Promise<T[]>;
	getById(id: string): Promise<T>
}

