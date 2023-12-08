export function Observer() {
	const subscribers = [];

	const subscribe = (listener) => {
		subscribers.push(listener);
	};

	const notifyAll = (data = {}) => subscribers.forEach((listener) => listener(data));

	return {
		subscribe,
		notifyAll,
	};
}
