export interface Repository<T> {
	add(item: T): Promise<void>;
	getAll(): Promise<T[]>;
}

