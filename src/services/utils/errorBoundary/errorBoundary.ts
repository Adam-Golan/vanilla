import { APIError } from '@services/network/API/types';

/**
 * Custom error class for application-level errors
 */
export class AppError extends Error {
    constructor(
        message: string,
        public code: string,
        public component?: string,
        public details?: unknown
    ) {
        super(message);
        this.name = 'AppError';
    }
}

/**
 * Error severity levels
 */
export enum ErrorSeverity {
    INFO = 'info',
    WARNING = 'warning',
    ERROR = 'error',
    CRITICAL = 'critical'
}

/**
 * Error information interface
 */
export interface ErrorInfo {
    message: string;
    severity: ErrorSeverity;
    timestamp: Date;
    error?: Error | APIError | AppError;
    component?: string;
    stack?: string;
}

/**
 * Global Error Boundary
 * Handles uncaught errors and provides centralized error logging
 */
export class ErrorBoundary {
    private static instance: ErrorBoundary;
    private errorHandlers: ((errorInfo: ErrorInfo) => void)[] = [];
    private errorLog: ErrorInfo[] = [];
    private maxLogSize = 100;

    private constructor() {
        this.setupGlobalHandlers();
    }

    /**
     * Gets the singleton instance of ErrorBoundary
     */
    static getInstance(): ErrorBoundary {
        if (!ErrorBoundary.instance) {
            ErrorBoundary.instance = new ErrorBoundary();
        }
        return ErrorBoundary.instance;
    }

    /**
     * Sets up global error and rejection handlers
     */
    private setupGlobalHandlers(): void {
        // Handle uncaught errors
        window.addEventListener('error', (event) => {
            this.handleError({
                message: event.message,
                severity: ErrorSeverity.ERROR,
                timestamp: new Date(),
                error: event.error,
                stack: event.error?.stack
            });
            event.preventDefault();
        });

        // Handle unhandled promise rejections
        window.addEventListener('unhandledrejection', (event) => {
            const error = event.reason;

            if (error instanceof APIError) {
                this.handleError({
                    message: `API Error: ${error.message}`,
                    severity: error.status >= 500 ? ErrorSeverity.CRITICAL : ErrorSeverity.ERROR,
                    timestamp: new Date(),
                    error,
                    component: 'API'
                });
            } else if (error instanceof AppError) {
                this.handleError({
                    message: error.message,
                    severity: ErrorSeverity.ERROR,
                    timestamp: new Date(),
                    error,
                    component: error.component
                });
            } else {
                this.handleError({
                    message: error instanceof Error ? error.message : String(error),
                    severity: ErrorSeverity.ERROR,
                    timestamp: new Date(),
                    error: error instanceof Error ? error : undefined,
                    stack: error instanceof Error ? error.stack : undefined
                });
            }

            event.preventDefault();
        });
    }

    /**
     * Handles an error and notifies all registered handlers
     */
    handleError(errorInfo: ErrorInfo): void {
        // Add to log
        this.errorLog.push(errorInfo);
        if (this.errorLog.length > this.maxLogSize) {
            this.errorLog.shift();
        }

        // Log to console
        const logMethod = this.getLogMethod(errorInfo.severity);
        logMethod(
            `[${errorInfo.severity.toUpperCase()}]${errorInfo.component ? ` [${errorInfo.component}]` : ''} ${errorInfo.message}`,
            errorInfo.error || '',
            errorInfo.stack || ''
        );

        // Notify handlers
        this.errorHandlers.forEach(handler => {
            try {
                handler(errorInfo);
            } catch (err) {
                console.error('Error in error handler:', err);
            }
        });
    }

    /**
     * Gets the appropriate console method based on severity
     */
    private getLogMethod(severity: ErrorSeverity): typeof console.log {
        switch (severity) {
            case ErrorSeverity.INFO:
                return console.info;
            case ErrorSeverity.WARNING:
                return console.warn;
            case ErrorSeverity.ERROR:
            case ErrorSeverity.CRITICAL:
                return console.error;
            default:
                return console.log;
        }
    }

    /**
     * Registers an error handler
     * @returns Unsubscribe function
     */
    onError(handler: (errorInfo: ErrorInfo) => void): () => void {
        this.errorHandlers.push(handler);
        return () => {
            const index = this.errorHandlers.indexOf(handler);
            if (index > -1) {
                this.errorHandlers.splice(index, 1);
            }
        };
    }

    /**
     * Gets the error log
     */
    getErrorLog(): ErrorInfo[] {
        return [...this.errorLog];
    }

    /**
     * Clears the error log
     */
    clearErrorLog(): void {
        this.errorLog = [];
    }

    /**
     * Manually report an error
     */
    reportError(error: Error | APIError | AppError, component?: string, severity = ErrorSeverity.ERROR): void {
        this.handleError({
            message: error.message,
            severity,
            timestamp: new Date(),
            error,
            component,
            stack: error.stack
        });
    }
}

// Initialize the error boundary
export const errorBoundary = ErrorBoundary.getInstance();
