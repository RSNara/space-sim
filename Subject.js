export default
class Subject {
    constructor() {
        Object.defineProperty(this, 'subscribers', {
            value: new Set(),
            configurable: false,
            enumerable: true,
            writable: false,
        });
    }
    subscribe({observer}){
        this.subscribers.add(observer);
    }
    unsubscribe({observer}){
        this.subscribers.delete(observer);
    }
    notify() {
        for (let observer of this.subscribers) {
            observer.update();
        }
    }
}