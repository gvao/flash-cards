export function Observer() {
	const subscribers = [];

	const subscribe = (listener) => {
		subscribers.push(listener);
	};
	const notifyAll = () => subscribers.forEach((listener) => listener());
	return {
		subscribe,
		notifyAll,
	};
}
