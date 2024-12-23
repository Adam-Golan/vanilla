import { ICardConfig } from "@shared/modules/card/lang";

export interface IAboutTexts {
    story?: ICardConfig<'basic'>;
    mission?: ICardConfig<'basic'>;
    team?: ICardConfig<'profile'>[];
    careers?: ICardConfig<'basic'>[];
}