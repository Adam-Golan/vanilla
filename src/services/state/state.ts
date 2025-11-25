import { type EventHandler, type UnsubscribeFn } from './types';

export class State<IState = Record<string, unknown>> {
    private data: Map<keyof IState, IState[keyof IState]> = new Map();
    private subscribers: Map<string, EventHandler<unknown>[]> = new Map();

    /**
     * Sets the value associated with the given name in the state data.
     * @param name The name of the value to set in the state data.
     * @param value The value to set in the state data.
     */
    set<K extends keyof IState>(name: K, value: IState[K]): void {
        this.data.set(name, value);
    }

    /**
     * Retrieves the value associated with the given name in the state data.
     * Returns undefined if the given name does not exist in the state data.
     * @param name The name of the value to retrieve from the state data.
     */
    get<K extends keyof IState>(name: K): IState[K] | undefined {
        return this.data.get(name) as IState[K] | undefined;
    }

    /**
     * Returns true if the given name exists in the state data, false otherwise.
     * @param name the name to check for
     */
    has(name: keyof IState): boolean {
        return this.data.has(name);
    }

    /**
     * Deletes registry by name.
     */
    delete(name: keyof IState): void {
        this.data.delete(name);
    }

    /**
     * Clears all stored state data.
     */
    clear(): void {
        this.data.clear();
    }

    /**
     * Publishes an event with the given name and payload. All subscribers
     * for the given event name will be called with the given payload.
     * @param name The name of the event to publish.
     * @param payload The payload to pass to all subscribers.
     */
    publish<T = unknown>(name: string, payload: T): void;
    publish<T = unknown>(name: string, ...args: T[]): void;
    publish<T = unknown>(name: string, ...args: T[]): void {
        this.subscribers.get(name)?.forEach(fn => fn(args.length === 1 ? args[0] : args));
    }

    /**
     * Adds a subscriber function for the given event name.
     * Returns an unsubscribe function to remove this specific subscriber.
     * @param name The name of the event to subscribe to.
     * @param fn The subscriber function to add.
     * @returns An unsubscribe function that removes this subscriber.
     */
    subscribe<T = unknown>(name: string, fn: EventHandler<T>): UnsubscribeFn {
        if (this.subscribers.has(name)) {
            this.subscribers.get(name)!.push(fn as EventHandler<unknown>);
        } else {
            this.subscribers.set(name, [fn as EventHandler<unknown>]);
        }

        // Return unsubscribe function
        return () => this.unsubscribe(name, fn);
    }


    /**
     * Removes the given subscriber function from the given event name.
     * @param name The name of the event to remove the subscriber from.
     * @param fn The subscriber function to remove.
     */
    unsubscribe<T = unknown>(name: string, fn: EventHandler<T>): void {
        if (this.subscribers.has(name)) {
            const subscribers = this.subscribers.get(name)!;
            const idx = subscribers.indexOf(fn as EventHandler<unknown>);
            if (idx > -1) subscribers.splice(idx, 1);
        }
    }

    /**
     * Removes all subscribers for the given event name.
     * @param name The name of the event to remove all subscribers from.
     */
    unsubscribeAll(name: string): void {
        this.subscribers.delete(name);
    }
}