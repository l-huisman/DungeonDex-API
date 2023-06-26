import { BaseRepository } from "./BaseRepository";
import { ICreature } from "../interfaces/ICreature";
import { CreatureCreationException } from "../errors/CreatureCreationException";
import { CreatureUpdateException } from "../errors/CreatureUpdateException";
import { CreatureNotFoundException } from "../errors/CreatureNotFoundException";
import { CreatureDeletionException } from "../errors/CreatureDeletionException";
import { CreatureRequestDTO } from "../dtos/CreatureDTO";

export default class CreatureRepository extends BaseRepository {
  public async find(conditions: any): Promise<ICreature[]> {
    try {
      const query = "SELECT * FROM `creatures` WHERE ?";
      const params = [conditions];
      const result = await this.executeQuery(query, params);
      const creatures: ICreature[] = this.mapToModelArray(result);
      return creatures;
    } catch (error) {
      throw new CreatureNotFoundException(`Creatures not found with conditions: ${conditions}`, 404, error as Error);
    }
  }

  public async findById(id: number): Promise<ICreature> {
    try {
      const query = "SELECT * FROM `creatures` WHERE id = ?";
      const params = [id];
      const result = await this.executeQuery(query, params);
      const creature: ICreature = this.mapToCreature(result[0]);
      return creature;
    } catch (error) {
      throw new CreatureNotFoundException(`Creature not found with id: ${id}`, 404, error as Error);
    }
  }

  public async findByName(name: string): Promise<ICreature> {
    try {
      const query = "SELECT * FROM `creatures` WHERE name = ?";
      const params = [name];
      const result = await this.executeQuery(query, params);
      const creature: ICreature = this.mapToCreature(result[0]);
      return creature;
    } catch (error) {
      throw new CreatureNotFoundException(`Creature not found with name: ${name}`, 404, error as Error);
    }
  }

  public async findAll(): Promise<ICreature[]> {
    try {
      const query = "SELECT * FROM `creatures`";
      const result = await this.executeQuery(query);
      if (result.length === 0) {
        throw new CreatureNotFoundException(`Creatures not found`, 404);
      }
      const creatures: ICreature[] = this.mapToModelArray(result);
      return creatures;
    } catch (error) {
      throw new CreatureNotFoundException(`Creatures not found`, 404, error as Error);
    }
  }

  public async create(creature: CreatureRequestDTO): Promise<ICreature> {
    try {
      const query = "INSERT INTO `creatures` (name, description, size, type, subtype, alignment, armorClass, hitPoints, hitDice, speed, abilityScores, proficiencies, damageVulnerabilities, damageResistances, damageImmunities, conditionImmunities, senses, languages, challengeRating, specialAbilities, actions, legendaryActions) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
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
      const createdCreature = await this.findById(result[0].insertId);
      return createdCreature;
    } catch (error) {
      throw new CreatureCreationException(`Creature not created`, 500, error as Error);
    }
  }

  public async update(id: number, creature: ICreature): Promise<ICreature> {
    try {
      const query = "UPDATE `creatures` SET ? WHERE id = ?";
      const params = [creature, id];
      const result = await this.executeQuery(query, params);
      const updatedCreature: ICreature = this.mapToCreature(result[0]);
      return updatedCreature;
    } catch (error) {
      throw new CreatureUpdateException(`Creature not updated with id: ${id}`, 500, error as Error);
    }
  }

  public async remove(id: number): Promise<void> {
    try {
      const query = "DELETE FROM `creatures` WHERE id = ?";
      const params = [id];
      await this.executeQuery(query, params);
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