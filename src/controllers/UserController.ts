import { Request, Response } from "express";
import bcrypt from "bcrypt";

import { prismaClient } from "../database/prismaClient";

export class UserController {
  async index(request: Request, response: Response) {
    try {
      const users = await prismaClient.user.findMany();
      return response.json(users);
    } catch (error) {
      return response.status(500).json({ error: error });
    }
  }
  async create(request: Request, response: Response) {
    const {
      user_name,
      user_email,
      user_password,
      user_rua,
      user_bairro,
      user_cep,
      user_cidade,
      user_num_predial,
      user_unidade_federal,
      user_tipo_sanguineo,
      user_profile_pic,
      user_nascimento,
      user_points,
    } = request.body;
    const encryptedPassword = await bcrypt.hash(user_password, 10);
    try {
      const user = await prismaClient.user.create({
        data: {
          user_name,
          user_email,
          user_password: encryptedPassword,
          user_rua,
          user_bairro,
          user_cep,
          user_cidade,
          user_num_predial,
          user_unidade_federal,
          user_tipo_sanguineo,
          user_profile_pic,
          user_nascimento,
          user_points,
        },
      });
      return response.status(201).json(user);
    } catch (error: any) {
      return response.status(500).json({ error: error.message });
    }
  }
  async show(request: Request, response: Response) {
    const { user_id_pk } = request.params;
    try {
      if (typeof user_id_pk === "number") {
        const user = await prismaClient.user.findUnique({
          where: {
            user_id_pk: user_id_pk,
          },
        });
        return response.status(200).json(user);
      }
    } catch (error: any) {
      return response.status(500).json({ error: error.message });
    }
  }
  async login(request: Request, response: Response) {
    const { user_email, user_password } = request.body;
    try {
      const user = await prismaClient.user.findUnique({
        where: {
          user_email: user_email,
        },
      });
      if (user) {
        const isPasswordCorrect = await bcrypt.compare(
          user_password,
          user.user_password
        );
        if (isPasswordCorrect) {
          return response.status(200).json(user);
        } else {
          return response.status(401).json({ error: "Usuário ou senha incorretos" });
        }
      }
    } catch (error: any) {
      return response.status(500).json({ error: error.message });
    }
  }
  async update(request: Request, response: Response) {
    const { user_id_pk } = request.params;
    const {
      user_name,
      user_email,
      user_rua,
      user_bairro,
      user_cep,
      user_cidade,
      user_num_predial,
      user_unidade_federal,
      user_tipo_sanguineo,
      user_profile_pic,
      user_nascimento,
    } = request.body;

    try {
      const updatedUser = await prismaClient.user.update({
        where: {
          user_id_pk: Number(user_id_pk),
        },
        data: {
          user_name,
          user_email,
          user_rua,
          user_bairro,
          user_cep,
          user_cidade,
          user_num_predial,
          user_unidade_federal,
          user_tipo_sanguineo,
          user_profile_pic,
          user_nascimento,
        },
      });
      return response.status(200).json(updatedUser);
    } catch (error: any) {
      return response.status(500).json({ error: error.message });
    }
  }
  async resetPassword(request: Request, response: Response) {
    const { user_id_pk } = request.params;
    const { user_password } = request.body;
    try {
      const updatedUser = await prismaClient.user.update({
        where: {
          user_id_pk: Number(user_id_pk),
        },
        data: {
          user_password,
        },
      });
      return response.status(200).json(updatedUser);
    } catch (error: any) {
      return response.status(500).json({ error: error.message });
    }
  }
  async addPoints(request: Request, response: Response) {
    const { user_id_pk } = request.params;
    const { user_points } = request.body;
    try {
      const updatedPoints = await prismaClient.user.update({
        where: {
          user_id_pk: Number(user_id_pk),
        },
        data: {
          user_points: user_points,
        },
      });
      return response.status(200).json(updatedPoints);
    } catch (error: any) {
      return response.status(500).json({ error: error.message });
    }
  }
}