import { ElapsedTime, TimeDestructure } from './types';

export class Timer {
    private startTime: Date | null = null;
    private endTime: Date | null = null;

    /**
     * Resets the timer by setting both the start and end times to null.
     */
    public reset(): void {
        this.startTime = null;
        this.endTime = null;
    }

    /**
     * Starts the timer and records the current time as the start time.
     * If the timer has already been started, logs a message to the console.
     */
    public startClock(): void {
        !this.startTime ? this.startTime = new Date() : console.log('Timer already started!');
    }

    /**
     * Stops the timer and marks the end time as the current time.
     * If the timer has already been stopped, logs a message to the console.
     */
    public stopClock(): void {
        !this.endTime ? this.endTime = new Date() : console.log('Timer already ended!');
    }

    /**
     * Gets the elapsed time between the start and end times of the timer and returns it as an object with duration, start and end properties.
     * If the timer has not been started yet, throws an error.
     * If the timer has been started but not stopped, stops the timer before returning the elapsed time.
     * @returns {ElapsedTime} Object containing the duration, start and end times of the timer.
     */
    public getElapsedTime(): ElapsedTime {
        if (!this.startTime) throw new Error('Timer has not started yet!');
        if (!this.endTime) this.stopClock();
        const duration = this.formatDuration(this.endTime!.getTime() - this.startTime!.getTime());
        const start = this.decomposeTime(this.startTime);
        const end = this.decomposeTime(this.endTime!);
        this.reset();
        return { duration, start, end };
    }

    /**
     * Decomposes a given Date object into an object with hours, minutes and seconds properties.
     * @param {Date} time - Date object to decompose.
     * @returns {TimeDestructure} Object with hours, minutes and seconds properties.
     * @private
     */
    private decomposeTime(time: Date): TimeDestructure {
        return {
            h: time.getHours(),
            m: time.getMinutes(),
            s: time.getSeconds(),
        };
    }

    /**
     * Formats a duration in milliseconds into a string "Xh Ym Zs", where X, Y, Z are the hours, minutes and seconds respectively.
     * @param {number} durationMs - Duration in milliseconds to format.
     * @returns {string} Formatted duration string.
     * @private
     */
    private formatDuration(durationMs: number): string {
        const seconds = Math.floor((durationMs / 1000) % 60);
        const minutes = Math.floor((durationMs / (1000 * 60)) % 60);
        const hours = Math.floor(durationMs / (1000 * 60 * 60));
        return `${hours}h ${minutes}m ${seconds}s`;
    }
}