import { writable, type Writable } from 'svelte/store';

const toasts: Writable<toast[]> = writable([]);

const displayToast = (toast: toast): void => {
	const id: number = Math.floor(Math.random() * 10000);

	// if properties are missing, set default values
	toast.id = id;
	toast.type = toast.type ? toast.type : 'info';
	toast.message = toast.message ? toast.message : 'n/a';
	toast.timeout = toast.timeout ? toast.timeout : 3000;

	toasts.subscribe((element) => {
		if (element.length > 5) {
			toasts.update((allToasts) => []);
		}
	});

	toasts.update((allToasts) => [toast, ...allToasts]);

	setTimeout(() => {
		removeToast(id);
	}, toast.timeout);
};

const removeToast = (id: number): void => {
	toasts.update((allToasts) => {
		return allToasts.filter((toast) => toast.id !== id);
	});
};

export { toasts, displayToast };
