export const EventEmitter = {

    topics: new Map<string, any[]>(),

    on(topic: string, fn: any) {
        if (this.topics.has(topic)) {
            return this.topics.get(topic).push(fn);
        }
        return this.topics.set(topic, [fn]);
    },

    emit(topic: string, value: any) {
        const fns = this.topics.get(topic);
        if (Array.isArray(fns) && fns.length) {
            fns.forEach(fn => fn(value))
        }
    }
}