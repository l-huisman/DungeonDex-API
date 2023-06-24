import CreatureRepository from "../repositories/CreatureRepository";
import { ICreature } from "../interfaces/ICreature";
import { CreatureRequestDTO } from "../dtos/CreatureDTO";
import { CreatureDTOException } from "../errors/CreatureDTOException";

export default class CreatureService {
  private creatureRepository = new CreatureRepository();

  public async find(conditions: any): Promise<ICreature[]> {
    return await this.creatureRepository.find(conditions);
  }

  public async findById(id: string): Promise<ICreature> {
    return await this.creatureRepository.findById(id);
  }

  public async findAll(): Promise<ICreature[]> {
    return await this.creatureRepository.findAll();
  }

  public async create(creature: CreatureRequestDTO): Promise<ICreature> {
    if (!this.validateCreatureRequestDTO(creature)) {
      throw new CreatureDTOException("Invalid creature request body", 403, undefined);
    }
    return await this.creatureRepository.create(creature);
  }

  public async update(id: string, creature: CreatureRequestDTO): Promise<ICreature> {
    let creatureToUpdate = await this.findById(id);
    creatureToUpdate = this.updateFilledFields(creatureToUpdate, creature);
    return await this.creatureRepository.update(id, creatureToUpdate);
  }

  public async remove(id: string): Promise<void> {
    await this.creatureRepository.remove(id);
  }

  private validateCreatureRequestDTO(creature: CreatureRequestDTO): boolean {
    return true;
  }

  private updateFilledFields(creature: ICreature, creatureRequestDTO: CreatureRequestDTO): ICreature {
    for (const key in creatureRequestDTO) {
      if (key === "id" || key === "index" || key === "url") {
        continue;
      }
      if (creatureRequestDTO.hasOwnProperty(key)) {
        const element = creatureRequestDTO[key];
        if (element !== undefined && element !== creature[key]) {
          creature[key] = element;
        }
      }
    }
    return creature;
  }
}
