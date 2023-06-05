type toast = {
	id?: number;
	type: 'error' | 'info' | 'success';
	message: string;
	timeout?: number;
};
