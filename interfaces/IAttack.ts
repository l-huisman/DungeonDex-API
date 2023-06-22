import { IDamageType } from "./IDamageType";
import { IDice } from "./IDice";

export interface IAttack {
    name: string;
    description: string;
    attackBonus: number;
    damage: {
        damageDice: IDice;
        damageType: IDamageType;
    };
}