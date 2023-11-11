interface BaseService<Type, Input, Output, IdType> {
	create(entity: Input): Promise<Type>;
	getAll(): Promise<Type[]>;
	getOne(id: IdType): Promise<Type | null>;
	update(id: IdType): Promise<Type>;
	remove(id: IdType): Promise<Type>;
}
