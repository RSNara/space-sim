export default function assert(bool, message) {
	if (!bool) throw new Error("Failed assertion: " + message);
}