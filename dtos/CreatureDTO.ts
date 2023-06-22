import { Size } from "../enums/Size";
import { Alignment } from "../enums/Alignment";
import { ICreatureSpeed } from "../interfaces/ICreatureSpeed";
import { IAbilityScore } from "../interfaces/IAbilityScore";
import { ICondition } from "../interfaces/ICondition";
import { IDamageType } from "../interfaces/IDamageType";
import { IProficiency } from "../interfaces/IProficiency";
import { ISense } from "../interfaces/ISense";
import { Language } from "../enums/Language";
import { IChallengeRating } from "../interfaces/IChallengeRating";
import { Type } from "../enums/Type";
import { ISpecialAbility } from "../interfaces/ISpecialAbility";
import { IAttack } from "../interfaces/IAttack";
import { IDice } from "../interfaces/IDice";

export interface CreatureRequestDTO {
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
}

export function validateCreatureRequestDTO(
  creatureRequestDTO: CreatureRequestDTO
): boolean {
  return (
    creatureRequestDTO.name !== undefined &&
    creatureRequestDTO.description !== undefined &&
    creatureRequestDTO.size !== undefined &&
    creatureRequestDTO.type !== undefined &&
    creatureRequestDTO.alignment !== undefined &&
    creatureRequestDTO.armorClass !== undefined &&
    creatureRequestDTO.hitPoints !== undefined &&
    creatureRequestDTO.hitDice !== undefined &&
    creatureRequestDTO.speed !== undefined &&
    creatureRequestDTO.abilityScores !== undefined &&
    creatureRequestDTO.proficiencies !== undefined &&
    creatureRequestDTO.damageVulnerabilities !== undefined &&
    creatureRequestDTO.damageResistances !== undefined &&
    creatureRequestDTO.damageImmunities !== undefined &&
    creatureRequestDTO.conditionImmunities !== undefined &&
    creatureRequestDTO.senses !== undefined &&
    creatureRequestDTO.languages !== undefined &&
    creatureRequestDTO.challengeRating !== undefined &&
    creatureRequestDTO.specialAbilities !== undefined &&
    creatureRequestDTO.actions !== undefined
  );
}
