export const EventEmitter = {

    topics: new Map<string, any[]>(),

    on: (topic: string, fn: any) => {
        if (EventEmitter.topics.has(topic)) {
            return EventEmitter.topics.get(topic).push(fn);
        }
        return EventEmitter.topics.set(topic, [fn]);
    },

    emit: (topic: string, value: any) => {
        const fns = EventEmitter.topics.get(topic);
        fns.forEach(fn => fn(value));
    }
}