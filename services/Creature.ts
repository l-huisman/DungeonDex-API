import CreatureRepository from "../repositories/Creature";
import { ICreature } from "../interfaces/ICreature";
import {
  CreatureRequestDTO,
  validateCreatureRequestDTO,
} from "../dtos/CreatureDTO";

export default class CreatureService {
  private creatureRepository = new CreatureRepository();
  public async find(conditions: any): Promise<ICreature[]> {
    try {
      const creatures: ICreature[] = await this.creatureRepository.find(
        conditions
      );
      return creatures;
    } catch (error) {
      throw error;
    }
  }
  public async findById(id: string): Promise<ICreature> {
    try {
      const creature: ICreature = await this.creatureRepository.findById(id);
      return creature;
    } catch (error) {
      throw error;
    }
  }
  public async create(creature: ICreature): Promise<ICreature> {
    try {
      if (!validateCreatureRequestDTO(creature)) {
        throw new Error("Invalid request body");
      }
      const newCreature: ICreature = await this.creatureRepository.create(
        creature
      );
      return newCreature;
    } catch (error) {
      throw error;
    }
  }
  public async findByIdAndUpdate(
    id: string,
    creature: ICreature
  ): Promise<ICreature> {
    try {
      const updatedCreature: ICreature =
        await this.creatureRepository.findByIdAndUpdate(id, creature);
      return updatedCreature;
    } catch (error) {
      throw error;
    }
  }
  public async findByIdAndRemove(id: string): Promise<void> {
    try {
      await this.creatureRepository.findByIdAndRemove(id);
    } catch (error) {
      throw error;
    }
  }
}
