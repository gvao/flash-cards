export function Observer() {
	const subscribers = [];

	const subscribe = (listener) => {
		subscribers.push(listener);
	};
	const emit = () => subscribers.forEach((listener) => listener());
	return {
		subscribe,
		emit,
	};
}
