import { APIError, type CacheEntry, type QueryParams, type RequestPayload } from './types';

export class API {
    declare OPTIONS: <T = unknown>(action: string, requestHeaders?: HeadersInit) => Promise<T>;
    declare CONNECT: <T = unknown>(action: string, requestHeaders?: HeadersInit) => Promise<T>;

    declare GET: <T = unknown>(action: string, requestHeaders?: HeadersInit, params?: QueryParams) => Promise<T>;
    declare POST: <T = unknown>(action: string, payload: RequestPayload, requestHeaders?: HeadersInit, params?: QueryParams) => Promise<T>;
    declare PUT: <T = unknown>(action: string, payload: RequestPayload, requestHeaders?: HeadersInit, params?: QueryParams) => Promise<T>;
    declare PATCH: <T = unknown>(action: string, payload: RequestPayload, requestHeaders?: HeadersInit, params?: QueryParams) => Promise<T>;
    declare DELETE: <T = unknown>(action: string, payload?: RequestPayload, requestHeaders?: HeadersInit, params?: QueryParams) => Promise<T>;
    declare HEAD: <T = unknown>(action: string, requestHeaders?: HeadersInit, params?: QueryParams) => Promise<T>;

    methods = ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'HEAD', 'OPTIONS', 'CONNECT'] as const;
    private cache: Map<string, CacheEntry<unknown>> = new Map();

    set _cacheDuration(value: number) {
        this.cacheDuration = value;
        this.cache.clear();
    }

    /**
     * Constructs an API instance with the specified service URL, headers, and cache duration.
     * It dynamically assigns HTTP methods to the instance for making requests.
     * @param service The base URL for the API service. Defaults to the origin of the current location.
     * @param headers The default headers to include with each request. Defaults to an empty object.
     * @param cacheDuration The duration in milliseconds for which responses are cached. Defaults to 5 minutes.
     */
    constructor(private service: string = location.origin, private headers: HeadersInit = {}, private cacheDuration: number = 1000 * 60 * 5) {
        for (const method of this.methods) {
            if (['OPTIONS', 'CONNECT'].includes(method)) {
                (this as any)[method] = <T = unknown>(action: string, requestHeaders?: HeadersInit) => {
                    return this.baseRequest<T>(action, this.createInit(method, undefined, requestHeaders));
                };
            } else if (['GET', 'HEAD'].includes(method)) {
                (this as any)[method] = <T = unknown>(action: string, requestHeaders?: HeadersInit, params?: QueryParams) => {
                    if (params) action = this.getUrl(action, params);
                    return this.baseRequest<T>(action, this.createInit(method, undefined, requestHeaders));
                };
            } else if (method === 'DELETE') {
                (this as any)[method] = <T = unknown>(action: string, payload?: RequestPayload, requestHeaders?: HeadersInit, params?: QueryParams) => {
                    if (params) action = this.getUrl(action, params);
                    return this.baseRequest<T>(action, this.createInit(method, payload, requestHeaders));
                };
            } else {
                // POST, PUT, PATCH
                (this as any)[method] = <T = unknown>(action: string, payload: RequestPayload, requestHeaders?: HeadersInit, params?: QueryParams) => {
                    if (params) action = this.getUrl(action, params);
                    return this.baseRequest<T>(action, this.createInit(method, payload, requestHeaders));
                };
            }
        }
    }

    /**
     * Return the URL for a given action and params.
     * If params is an empty object, just return the action.
     * Otherwise, return the action followed by a query string built from the
     * key-value pairs in params.
     * @param action The base URL for the request.
     * @param params An object of key-value pairs that will be appended to the
     * URL as a query string.
     * @returns The URL for the request.
     */
    private getUrl(action: string, params: QueryParams): string {
        if (typeof action !== 'string') throw new Error('Action must be a string.');
        return Object.keys(params).length
            ? `${action}?${Object.entries(params).map(([key, value]) => `${key}=${encodeURIComponent(String(value))}`).join('&')}`
            : action;
    }

    /**
     * Creates a RequestInit object for making HTTP requests with the specified method, payload, and headers.
     * Automatically stringifies object payloads to JSON.
     *
     * @param method - The HTTP method to use for the request (e.g., 'GET', 'POST').
     * @param payload - The request payload, can be an object (will be stringified) or a string. Optional for GET/HEAD/OPTIONS/DELETE.
     * @param requestHeaders - Additional headers to include in the request. Default is an empty object.
     * @returns A RequestInit object configured with the specified method, headers, and body.
     */
    private createInit(method: typeof this.methods[number], payload?: RequestPayload, requestHeaders: HeadersInit = {}): RequestInit {
        const needsPayload = ['POST', 'PUT', 'PATCH'].includes(method);
        const acceptsPayload = ['POST', 'PUT', 'PATCH', 'DELETE'];

        if (needsPayload && payload === undefined) {
            throw new Error(`Payload is required for ${method} requests.`);
        }

        let body: string | null = null;
        if (payload !== undefined && acceptsPayload.includes(method)) {
            body = typeof payload === 'string' ? payload : JSON.stringify(payload);
        }

        return {
            headers: { 'Content-Type': 'application/json', ...this.headers, ...requestHeaders },
            method,
            body
        };
    }

    /**
     * Makes a request to the server with the given action and RequestInit object.
     * If the request is successful, it caches the response for the given cache duration.
     * Throws an APIError with detailed information if the request fails.
     * @param action The URL for the request. The service URL is prepended to this.
     * @param init The RequestInit object to be used for the request.
     * @returns A Promise that resolves with the response JSON or rejects with an APIError.
     */
    private async baseRequest<T>(action: string, init: RequestInit): Promise<T> {
        const cacheKey = `${action}_${JSON.stringify(init)}`;

        // Check cache (skip health checks)
        if (!action.includes('health') && this.cache.has(cacheKey)) {
            const cached = this.cache.get(cacheKey);
            return Promise.resolve(cached!.data as T);
        }

        try {
            const res = await fetch(`${this.service}/${action}`, init);

            if (res.ok) {
                let data: T;
                try {
                    data = await res.json();
                } catch (err) {
                    throw new APIError(
                        `Failed to parse response: ${err instanceof Error ? err.message : String(err)}`,
                        res.status,
                        action,
                        init.method || 'GET',
                        err
                    );
                }

                // Cache the response
                this.cache.set(cacheKey, { data, timestamp: Date.now() });
                setTimeout(() => this.cache.delete(cacheKey), this.cacheDuration);

                return data;
            } else {
                // Try to get error details from response
                let errorDetails: unknown;
                try {
                    errorDetails = await res.json();
                } catch {
                    errorDetails = { message: res.statusText };
                }

                throw new APIError(
                    typeof errorDetails === 'object' && errorDetails !== null && 'message' in errorDetails
                        ? String((errorDetails as any).message)
                        : `Request failed with status ${res.status}`,
                    res.status,
                    action,
                    init.method || 'GET',
                    errorDetails
                );
            }
        } catch (err) {
            // If it's already an APIError, rethrow it
            if (err instanceof APIError) {
                console.error(`[API Error] ${err.method} ${this.service}/${err.action}`, {
                    status: err.status,
                    message: err.message,
                    details: err.details
                });
                throw err;
            }

            // Network error or other issue
            const apiError = new APIError(
                err instanceof Error ? err.message : 'Network request failed',
                0,
                action,
                init.method || 'GET',
                err
            );
            console.error(`[API Error] ${apiError.method} ${this.service}/${apiError.action}`, {
                message: apiError.message,
                details: apiError.details
            });
            throw apiError;
        }
    }
}
