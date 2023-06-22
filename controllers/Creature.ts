import { Request, Response } from "express";
import CreatureService from "../services/Creature";
import { ICreature } from "../interfaces/ICreature";

export default class CreatureController {
  private creatureService: CreatureService;

  constructor() {
    this.creatureService = new CreatureService();
  }

  public async getCreatures(req: Request, res: Response): Promise<void> {
    try {
      const creatures = await this.creatureService.find({});
      res.status(200).json({ creatures });
    } catch (error) {
      throw error;
    }
  }
  public async getCreature(req: Request, res: Response): Promise<void> {
    try {
      const creature = await this.creatureService.findById(req.params.id);
      res.status(200).json({ creature });
    } catch (error) {
      throw error;
    }
  }
  public async addCreature(req: Request, res: Response): Promise<void> {
    try {
      const creature = await this.creatureService.create(req.body);
      res.status(201).json({ creature });
    } catch (error) {
      throw error;
    }
  }
  public async updateCreature(req: Request, res: Response): Promise<void> {
    try {
      const creature = await this.creatureService.findByIdAndUpdate(
        req.params.id,
        req.body
      );
      res.status(200).json({ creature });
    } catch (error) {
      throw error;
    }
  }
  public async deleteCreature(req: Request, res: Response): Promise<void> {
    try {
      const creature = await this.creatureService.findByIdAndRemove(
        req.params.id
      );
      res.status(200).json({ creature });
    } catch (error) {
      throw error;
    }
  }
}
