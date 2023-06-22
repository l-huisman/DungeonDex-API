export interface ISpecialAbility {
    name: string;
    description: string;
    usage?: {
        type: string;
        times: number;
    };
}
