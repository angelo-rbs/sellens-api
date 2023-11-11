export const BAD_REQUEST = () => {
	return {
		statusCode: 400,
		error: 'Client bad request',
	};
};

export const NOT_FOUND = () => {
	return {
		statusCode: 404,
		error: 'Entity not found',
	};
};
