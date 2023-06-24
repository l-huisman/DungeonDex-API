import { Request, Response } from "express";
import CreatureService from "../services/CreatureService";
import { ICreature } from "../interfaces/ICreature";
import APIResponseDTO from "../dtos/APIResponseDTO";
import { CreatureCreationException } from "../errors/CreatureCreationException";
import { CreatureUpdateException } from "../errors/CreatureUpdateException";
import { CreatureNotFoundException } from "../errors/CreatureNotFoundException";
import { CreatureDeletionException } from "../errors/CreatureDeletionException";
import { CreatureDTOException } from "../errors/CreatureDTOException";

export default class CreatureController {

  private message: string;
  private statusCode: number;

  constructor() {
    this.message = "Something went wrong, please try again later or contact administrator.";
    this.statusCode = 500;
  }

  public async getCreatures(req: Request, res: Response): Promise<void> {
    const creatureService = new CreatureService();
    let creatures: ICreature[];
    try {
      if (Object.keys(req.query).length) {
        creatures = await creatureService.find(req.query);
      } else {
        creatures = await creatureService.findAll();
      }
      const response = new APIResponseDTO<ICreature[]>("Success", creatures, undefined);
      res.status(200).json(response);
    } catch (error) {
      if (error instanceof CreatureNotFoundException) {
        this.message = error.message;
        this.statusCode = error.statusCode;
      }
      const response = new APIResponseDTO<any>(this.message, undefined, error);
      res.status(this.statusCode).json(response);
    }
  }

  public async getCreature(req: Request, res: Response): Promise<void> {
    const creatureService = new CreatureService();
    try {
      const creature = await creatureService.findById(req.params.id);
      const response = new APIResponseDTO<ICreature>("Success", creature, undefined);
      res.status(200).json(response);
    } catch (error) {
      if (error instanceof CreatureNotFoundException) {
        this.message = error.message;
        this.statusCode = error.statusCode;
      }
      const response = new APIResponseDTO<any>(this.message, undefined, error);
      res.status(this.statusCode).json(response);
    }
  }

  public async addCreature(req: Request, res: Response): Promise<void> {
    const creatureService = new CreatureService();
    try {
      const creature = await creatureService.create(req.body);
      const response = new APIResponseDTO<ICreature>("Success", creature, undefined);
      res.status(201).json(response);
    } catch (error) {
      if (error instanceof CreatureCreationException || error instanceof CreatureDTOException) {
        this.message = error.message;
        this.statusCode = error.statusCode;
      }
      const response = new APIResponseDTO<any>(this.message, undefined, error);
      res.status(this.statusCode).json(response);
    }
  }

  public async updateCreature(req: Request, res: Response): Promise<void> {
    const creatureService = new CreatureService();
    try {
      const creature = await creatureService.update(req.params.id, req.body);
      const response = new APIResponseDTO<ICreature>("Success", creature, undefined);
      res.status(200).json(response);
    } catch (error) {
      if (error instanceof CreatureUpdateException || error instanceof CreatureNotFoundException) {
        this.message = error.message;
        this.statusCode = error.statusCode;
      }
      const response = new APIResponseDTO<any>(this.message, undefined, error);
      res.status(this.statusCode).json(response);
    }
  }

  public async deleteCreature(req: Request, res: Response): Promise<void> {
    const creatureService = new CreatureService();
    try {
      await creatureService.remove(req.params.id);
      const response = new APIResponseDTO<ICreature>("Success", undefined, undefined);
      res.status(200).json(response);
    } catch (error) {
      if (error instanceof CreatureDeletionException) {
        this.message = error.message;
        this.statusCode = error.statusCode;
      }
      const response = new APIResponseDTO<any>(this.message, undefined, error);
      res.status(this.statusCode).json(response);
    }
  }
}
