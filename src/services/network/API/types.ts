/**
 * API Error class for structured error handling
 */
export class APIError extends Error {
    constructor(
        message: string,
        public status: number,
        public action: string,
        public method: string,
        public details?: unknown
    ) {
        super(message);
        this.name = 'APIError';
    }
}

/**
 * Type for API cache entries
 */
export interface CacheEntry<T> {
    data: T;
    timestamp: number;
}

/**
 * Type for query parameters
 */
export type QueryParams = Record<string, string | number | boolean>;

/**
 * Type for request payload (accepts objects, will be stringified)
 */
export type RequestPayload = Record<string, unknown> | string;
