import BaseEntity from './baseEntity';

interface BaseController<E extends BaseEntity> {
	create: (obj: E) => E;
	findOne: (props: object) => E | null;
	findAll: () => Array<E>;
	update: (obj: E) => E;
	delete: (obj: E) => void;
}

export default BaseController;
