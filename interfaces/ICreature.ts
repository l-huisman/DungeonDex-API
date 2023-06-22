import { Size } from "../enums/Size";
import { Alignment } from "../enums/Alignment";
import { ICreatureSpeed } from "./ICreatureSpeed";
import { IAbilityScore } from "./IAbilityScore";
import { ICondition } from "./ICondition";
import { IDamageType } from "./IDamageType";
import { IProficiency } from "./IProficiency";
import { ISense } from "./ISense";
import { Language } from "../enums/Language";
import { IChallengeRating } from "./IChallengeRating";
import { Type } from "../enums/Type";
import { ISpecialAbility } from "./ISpecialAbility";
import { IAttack } from "./IAttack";
import { IDice } from "./IDice";

export interface ICreature {
  id: number;
  index: string;
  name: string;
  description: string;
  size: Size;
  type: Type;
  subtype?: Type;
  alignment: Alignment;
  armorClass: number;
  hitPoints: number;
  hitDice: IDice;
  speed: ICreatureSpeed[];
  abilityScores: IAbilityScore;
  proficiencies: IProficiency[];
  damageVulnerabilities: IDamageType[];
  damageResistances: IDamageType[];
  damageImmunities: IDamageType[];
  conditionImmunities: ICondition[];
  senses: ISense[];
  languages: Language[];
  challengeRating: IChallengeRating;
  specialAbilities: ISpecialAbility[];
  actions: IAttack[];
  legendaryActions: {}[];
  url: string;
}

export function mapToCreature(data: any): ICreature {
  return {
    id: data.id,
    index: data.index,
    name: data.name,
    description: data.description,
    size: Size[data.size as keyof typeof Size],
    type: Type[data.type as keyof typeof Type],
    subtype: data.subtype ? Type[data.subtype as keyof typeof Type] : undefined,
    alignment: Alignment[data.alignment as keyof typeof Alignment],
    armorClass: data.armorClass,
    hitPoints: data.hitPoints,
    hitDice: data.hitDice,
    speed: data.speed,
    abilityScores: data.abilityScores,
    proficiencies: data.proficiencies,
    damageVulnerabilities: data.damageVulnerabilities,
    damageResistances: data.damageResistances,
    damageImmunities: data.damageImmunities,
    conditionImmunities: data.conditionImmunities,
    senses: data.senses,
    languages: data.languages.map(
      (language: string) => Language[language as keyof typeof Language]
    ),
    challengeRating: data.challengeRating,
    specialAbilities: data.specialAbilities,
    actions: data.actions,
    legendaryActions: data.legendaryActions,
    url: data.url,
  };
}
