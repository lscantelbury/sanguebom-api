import { Request, Response } from "express";
import { prismaClient } from "../database/prismaClient";

export class HospitalController {
  async index(request: Request, response: Response) {
    try {
      const hospitals = await prismaClient.hospital.findMany();
      return response.status(200).json(hospitals);
    } catch (error: any) {
      return response.status(500).json({ error: error.message });
    }
  }
  async create(request: Request, response: Response) {
    const {
      hosp_name,
      hosp_username,
      hosp_password,
      hosp_rua,
      hosp_num_predial,
      hosp_cep,
      hosp_cidade,
      hosp_unidade_federal,
      hosp_pic,
    } = request.body;
    try {
      const hospital = await prismaClient.hospital.create({
        data: {
          hosp_name,
          hosp_username,
          hosp_password,
          hosp_rua,
          hosp_num_predial,
          hosp_cep,
          hosp_cidade,
          hosp_unidade_federal,
          hosp_pic,
        },
      });
      return response.status(201).json(hospital);
    } catch (error: any) {
      return response.status(500).json({ message: error.message });
    }
  }
  async show(request: Request, response: Response) {
    const { hosp_id_pk } = request.params;
    try {
      const hospital = await prismaClient.hospital.findUnique({
        where: {
          hosp_id_pk: Number(hosp_id_pk),
        },
      });
      return response.status(200).json(hospital);
    } catch (error: any) {
      return response.status(500).json({ error: error.message });
    }
  }
  async resetPassword(request: Request, response: Response) {
    const { hosp_id_pk } = request.params;
    const { hosp_password } = request.body;
    try {
      const hospital = await prismaClient.hospital.update({
        where: {
          hosp_id_pk: Number(hosp_id_pk),
        },
        data: {
          hosp_password,
        },
      });
      return response.status(200).json(hospital);
    } catch (error: any) {
      return response.status(500).json({ error: error.message });
    }
  }
  async login(request: Request, response: Response) {
    const { hosp_username, hosp_password } = request.body;
    try {
      const hospital = await prismaClient.hospital.findUnique({
        where: {
          hosp_username,
        },
      });
      if (hospital?.hosp_password === hosp_password) {
        return response.status(200).json(hospital);
      } else {
        return response.status(401).json({ message: "Invalid login" });
      }
    } catch (error: any) {
      return response.status(500).json({ error: error.message });
    }
  }
}
