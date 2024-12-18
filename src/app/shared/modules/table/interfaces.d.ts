export interface ITableConfig<T = string[]> {
    columns: T;
    rows: { field: typeof T[number]; data: string | number }[][];
}