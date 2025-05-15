import { ComponentDecorator } from "@decorators";
import { IOptionProps } from "@shared/modules/form/interfaces/props/shared";
import { SelectDropdown } from "../select";

@ComponentDecorator
export class FilterDropdown extends SelectDropdown {
    filteredList: IOptionProps[];

    filter(val: string): void {
        this.filteredList = this.list.filter(item => item.text.toLowerCase().includes(val.toLowerCase()));
        this.renderList(this.filteredList);
        this[this.filteredList.length ? 'open' : 'close']();
    }
}