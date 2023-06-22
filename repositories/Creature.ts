import { BaseRepository } from "./Base";
import { ICreature, mapToCreature } from "../interfaces/ICreature";

export default class CreatureRepository extends BaseRepository {
  public async find(conditions: any): Promise<ICreature[]> {
    try {
      const query = "SELECT * FROM creatures WHERE ?";
      const params = [conditions];
      const result = await this.executeQuery(query, params);
      const creatures: ICreature[] = this.mapToModelArray(result);
      return creatures;
    } catch (error) {
      throw error;
    }
  }

  public async findById(id: string): Promise<ICreature> {
    try {
      const query = "SELECT * FROM creatures WHERE id = ?";
      const params = [id];
      const result = await this.executeQuery(query, params);
      const creature: ICreature = mapToCreature(result[0]);
      return creature;
    } catch (error) {
      throw error;
    }
  }

  public async create(creature: ICreature): Promise<ICreature> {
    try {
      const query = "INSERT INTO creatures SET ?";
      const params = [creature];
      const result = await this.executeQuery(query, params);
      const newCreature: ICreature = mapToCreature(result[0]);
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
      const query = "UPDATE creatures SET ? WHERE id = ?";
      const params = [creature, id];
      const result = await this.executeQuery(query, params);
      const updatedCreature: ICreature = mapToCreature(result[0]);
      return updatedCreature;
    } catch (error) {
      throw error;
    }
  }

  public async findByIdAndRemove(id: string): Promise<void> {
    try {
      const query = "DELETE FROM creatures WHERE id = ?";
      const params = [id];
      const result = await this.executeQuery(query, params);
    } catch (error) {
      throw error;
    }
  }

  protected mapToModelArray(data: any[]): ICreature[] {
    const creatures: ICreature[] = [];
    for (const row of data) {
      const creature: ICreature = mapToCreature(row);
      creatures.push(creature);
    }
    return creatures;
  }
}
