export const EventEmitter = {
  topics: new Map<string, Function[]>(),

  on(topic: string, fn: Function) {
    if (this.topics.has(topic)) {
      return this.topics.get(topic).push(fn);
    }
    return this.topics.set(topic, [fn]);
  },

  emit(topic: string, value: any) {
    const fns = this.topics.get(topic);
    if (Array.isArray(fns) && fns.length) {
      fns.forEach((fn) => fn(value));
    }
  },
};
