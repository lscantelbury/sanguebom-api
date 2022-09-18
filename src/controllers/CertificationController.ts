import { Request, Response } from "express";

import { prismaClient } from "../database/prismaClient";

export class CertificationController {
  async index(request: Request, response: Response) {
    try {
      const certifications = await prismaClient.certification.findMany();
      return response.status(200).json(certifications);
    } catch (error: any) {
      return response.status(500).json({ error: error.message });
    }
  }
  async create(request: Request, response: Response) {
    const { cert_date, hosp_id_fk, cert_tipo_sanguineo, user_id_fk } =
      request.body;
    try {
      const certification = await prismaClient.certification.create({
        data: {
          cert_date,
          cert_tipo_sanguineo,
          hosp_id_fk,
          user_id_fk,
        },
      });
      return response.status(201).json(certification);
    } catch (error: any) {
      return response.status(500).json({ error: error.message });
    }
  }
  async show(request: Request, response: Response) {
    const { cert_id_pk } = request.params;
    try {
      const certification = await prismaClient.certification.findUnique({
        where: {
          cert_id_pk: Number(cert_id_pk),
        },
      });
      return response.status(200).json(certification);
    } catch (error: any) {
      return response.status(500).json({ error: error.message });
    }
  }
  async certificationsByUser(request: Request, response: Response) {
    const { user_id_fk } = request.params;
    try {
      const certifications = await prismaClient.certification.findMany({
        where: {
          user_id_fk: Number(user_id_fk),
        },
      });
      return response.status(200).json(certifications);
    } catch (error: any) {
      return response.status(500).json({ error: error.message });
    }
  }
}
