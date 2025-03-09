import { Module, ModuleDecorator } from "@decorators";
import { ITableConfig } from "./interfaces";

import './table.scss';

@ModuleDecorator
export class Table extends Module<ITableConfig> {
    constructor(protected data: ITableConfig) {
        super(data);
    }

    protected init(): void { 
        this.createHead();
        this.createBody();
    }

    private createHead(): void {
        const [head, tr] = this.cAlot([{ tag: 'thead' }, { tag: 'tr' }]);
        this.data.columns.forEach(col => { tr.innerHTML += (`<th>${col}</th>`) });
        head.append(tr);
        this.append(head);
    }

    private createBody(): void {
        const body = this.cElem('tbody');
        this.data.rows.forEach(row => {
            const tr = this.cElem('tr');
            const arr = new Array(this.data.columns.length);
            for (const cell of row) arr[this.data.columns.indexOf(cell.field)] = cell.data;
            arr.forEach(cell => { tr.innerHTML += (`<td>${cell}</td>`) });
            body.append(tr);
        });
        this.append(body);
    }
}