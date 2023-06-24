import { BaseRepository } from "./Base";
import { ICreature } from "../interfaces/ICreature";
import { CreatureCreationException } from "../errors/CreatureCreationException";
import { CreatureUpdateException } from "../errors/CreatureUpdateException";
import { CreatureNotFoundException } from "../errors/CreatureNotFoundException";
import { CreatureDeletionException } from "../errors/CreatureDeletionException";
import { CreatureRequestDTO } from "../dtos/CreatureDTO";

export default class CreatureRepository extends BaseRepository {
  public async find(conditions: any): Promise<ICreature[]> {
    try {
      const query = "SELECT * FROM creatures WHERE ?";
      const params = [conditions];
      const result = await this.executeQuery(query, params);
      const creatures: ICreature[] = this.mapToModelArray(result);
      return creatures;
    } catch (error) {
      throw new CreatureNotFoundException(`Creatures not found with conditions: ${conditions}`, 404, error as Error);
    }
  }

  public async findById(id: string): Promise<ICreature> {
    try {
      const query = "SELECT * FROM creatures WHERE id = ?";
      const params = [id];
      const result = await this.executeQuery(query, params);
      const creature: ICreature = this.mapToCreature(result[0]);
      return creature;
    } catch (error) {
      throw new CreatureNotFoundException(`Creature not found with id: ${id}`, 404, error as Error);
    }
  }

  public async findAll(): Promise<ICreature[]> {
    try {
      const query = "SELECT * FROM creatures";
      const result = await this.executeQuery(query);
      result.forEach(element => {
        console.log(element);
      });
      const creatures: ICreature[] = this.mapToModelArray(result);
      return creatures;
    } catch (error) {
      throw new CreatureNotFoundException(`Creatures not found`, 404, error as Error);
    }
  }

  public async create(creature: CreatureRequestDTO): Promise<ICreature> {
    try {
      const query = "INSERT INTO creatures (name, description, size, type, subtype, alignment, armorClass, hitPoints, hitDice, speed, abilityScores, proficiencies, damageVulnerabilities, damageResistances, damageImmunities, conditionImmunities, senses, languages, challengeRating, specialAbilities, actions, legendaryActions) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
      const params = [
        creature.name,
        creature.description,
        creature.size,
        creature.type,
        creature.subtype ?? null,
        creature.alignment,
        creature.armorClass,
        creature.hitPoints,
        JSON.stringify(creature.hitDice),
        JSON.stringify(creature.speed),
        JSON.stringify(creature.abilityScores),
        JSON.stringify(creature.proficiencies ?? null),
        JSON.stringify(creature.damageVulnerabilities ?? null),
        JSON.stringify(creature.damageResistances ?? null),
        JSON.stringify(creature.damageImmunities ?? null),
        JSON.stringify(creature.conditionImmunities ?? null),
        JSON.stringify(creature.senses),
        creature.language,
        JSON.stringify(creature.challengeRating),
        JSON.stringify(creature.specialAbilities),
        JSON.stringify(creature.actions),
        JSON.stringify(creature.legendaryActions ?? null)
      ];
      const result = await this.executeQuery(query, params);
      const newCreature: ICreature = this.mapToCreature(result[0]);
      return newCreature;
    } catch (error) {
      throw new CreatureCreationException(`Creature not created`, 500, error as Error);
    }
  }

  public async update(
    id: string,
    creature: ICreature
  ): Promise<ICreature> {
    try {
      const query = "UPDATE creatures SET ? WHERE id = ?";
      const params = [creature, id];
      const result = await this.executeQuery(query, params);
      const updatedCreature: ICreature = this.mapToCreature(result[0]);
      return updatedCreature;
    } catch (error) {
      throw new CreatureUpdateException(`Creature not updated with id: ${id}`, 500, error as Error);
    }
  }

  public async remove(id: string): Promise<void> {
    try {
      const query = "DELETE FROM creatures WHERE id = ?";
      const params = [id];
      const result = await this.executeQuery(query, params);
    } catch (error) {
      throw new CreatureDeletionException(`Creature not deleted with id: ${id}`, 500, error as Error);
    }
  }

  private mapToModelArray(data: any[]): ICreature[] {
    const creatures: ICreature[] = [];
    for (const row of data) {
      const creature: ICreature = this.mapToCreature(row);
      creatures.push(creature);
    }
    return creatures;
  }

  private mapToCreature(data: any): ICreature {
    const creature: ICreature = {
      id: data.id,
      index: data.index,
      name: data.name,
      description: data.description,
      size: data.size,
      type: data.type,
      subtype: data.subtype,
      alignment: data.alignment,
      armorClass: data.armorClass,
      hitPoints: data.hitPoints,
      hitDice: JSON.parse(data.hitDice),
      speed: JSON.parse(data.speed),
      abilityScores: JSON.parse(data.abilityScores),
      proficiencies: data.proficiencies ? JSON.parse(data.proficiencies) : undefined,
      damageVulnerabilities: data.damageVulnerabilities ? JSON.parse(data.damageVulnerabilities) : undefined,
      damageResistances: data.damageResistances ? JSON.parse(data.damageResistances) : undefined,
      damageImmunities: data.damageImmunities ? JSON.parse(data.damageImmunities) : undefined,
      conditionImmunities: data.conditionImmunities,
      senses: JSON.parse(data.senses),
      languages: data.languages.split(','),
      challengeRating: JSON.parse(data.challengeRating),
      specialAbilities: JSON.parse(data.specialAbilities),
      actions: JSON.parse(data.actions),
      legendaryActions: data.legendaryActions ? JSON.parse(data.legendaryActions) : undefined,
      url: data.url
    };
    return creature;
  }
}

/*
{
  id: 1,
  index: 'goblin',
  name: 'Goblin',
  description: 'Goblins are small, black-hearted humanoids that lair in despoiled dungeons and other dismal settings. Individually weak, they gather in large numbers to torment other creatures.',
  size: 'Small',
  type: 'Humanoid',
  subtype: null,
  alignment: 'Neutral Evil',
  armorClass: 15,
  hitPoints: 7,
  hitDice: '{"diceCount": 2, "diceSides": 6, "diceBonus": 0}',
  speed: '{"walk": 30}',
  abilityScores: '{"strength": 8, "dexterity": 14, "constitution": 10, "intelligence": 10, "wisdom": 8, "charisma": 8}',
  proficiencies: '{"value": 6, "proficiency": {"index": "stealth", "name": "Stealth"}}',
  damageVulnerabilities: null,
  damageResistances: null,
  damageImmunities: null,
  conditionImmunities: null,
  senses: '{"type": "darkvision", "value": 60}',
  languages: 'Goblin',
  challengeRating: '{"value": 0.25, "experience": 50}',
  specialAbilities: '{"name": "Nimble Escape", "desc": "The goblin can take the Disengage or Hide action as a bonus action on each of its turns.", "usage": null}',
  actions: '[{"name": "Scimitar", "description": "Melee Weapon Attack: + 4 to hit, reach 5 ft., one target.Hit: 5 (1d6 + 2) slashing damage.", "attackBonus": 4, "damage": {"damageDice": { "diceCount": 2, "diceSides": 6, "diceBonus": 0 }, "damageType":{"index": "slashing", "name": "Slashing"}}}, {"name": "Shortbow", "description": "Ranged Weapon Attack: + 4 to hit, range 80/320 ft., one target.Hit: 5 (1d6 + 2) piercing damage.", "attackBonus": 4, "damage": {"damageDice": { "diceCount": 1, "diceSides": 6, "diceBonus": 0 }, "damageType":{"index": "piercing", "name": "Piercing"}}}]',
  legendaryActions: null,
  url: '/api/v1/creatures/goblin'
}
*/
