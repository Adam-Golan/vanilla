/**
 * Type-safe event handler
 */
export type EventHandler<T = unknown> = (payload: T) => void;

/**
 * Unsubscribe function returned from subscribe
 */
export type UnsubscribeFn = () => void;

/**
 * Event map for type-safe state events
 * Extend this interface to add custom events with typed payloads
 */
export interface StateEventMap {
    // Add your events here with typed payloads
    [key: string]: unknown;
}
