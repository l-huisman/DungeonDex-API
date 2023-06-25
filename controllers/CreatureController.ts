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
      let message: string = "Something went wrong, please try again later or contact administrator.";
      let statusCode: number = 500;
      if (error instanceof CreatureNotFoundException) {
        message = error.message;
        statusCode = error.statusCode;
      }
      const response = new APIResponseDTO<any>(message, undefined, error);
      res.status(statusCode).json(response);
    }
  }

  public async getCreature(req: Request, res: Response): Promise<void> {
    const creatureService = new CreatureService();
    try {
      const creature = await creatureService.findById(parseInt(req.params.id));
      const response = new APIResponseDTO<ICreature>("Success", creature, undefined);
      res.status(200).json(response);
    } catch (error) {
      let message: string = "Something went wrong, please try again later or contact administrator.";
      let statusCode: number = 500;
      if (error instanceof CreatureNotFoundException) {
        message = error.message;
        statusCode = error.statusCode;
      }
      const response = new APIResponseDTO<any>(message, undefined, error);
      res.status(statusCode).json(response);
    }
  }

  public async addCreature(req: Request, res: Response): Promise<void> {
    const creatureService = new CreatureService();
    try {
      const creature = await creatureService.create(req.body);
      const response = new APIResponseDTO<ICreature>("Success", creature, undefined);
      res.status(201).json(response);
    } catch (error) {
      let message: string = "Something went wrong, please try again later or contact administrator.";
      let statusCode: number = 500;
      if (error instanceof CreatureCreationException || error instanceof CreatureDTOException) {
        message = error.message;
        statusCode = error.statusCode;
      }
      const response = new APIResponseDTO<any>(message, undefined, error);
      res.status(statusCode).json(response);
    }
  }

  public async updateCreature(req: Request, res: Response): Promise<void> {
    const creatureService = new CreatureService();
    try {
      const creature = await creatureService.update(parseInt(req.params.id), req.body);
      const response = new APIResponseDTO<ICreature>("Success", creature, undefined);
      res.status(200).json(response);
    } catch (error) {
      let message: string = "Something went wrong, please try again later or contact administrator.";
      let statusCode: number = 500;
      if (error instanceof CreatureUpdateException || error instanceof CreatureNotFoundException) {
        message = error.message;
        statusCode = error.statusCode;
      }
      const response = new APIResponseDTO<any>(message, undefined, error);
      res.status(statusCode).json(response);
    }
  }

  public async deleteCreature(req: Request, res: Response): Promise<void> {
    const creatureService = new CreatureService();
    try {
      await creatureService.remove(parseInt(req.params.id));
      const response = new APIResponseDTO<ICreature>("Success", undefined, undefined);
      res.status(200).json(response);
    } catch (error) {
      let message: string = "Something went wrong, please try again later or contact administrator.";
      let statusCode: number = 500;
      if (error instanceof CreatureDeletionException) {
        message = error.message;
        statusCode = error.statusCode;
      }
      const response = new APIResponseDTO<any>(message, undefined, error);
      res.status(statusCode).json(response);
    }
  }
}
