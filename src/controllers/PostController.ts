import { Request, Response } from "express";
import { prismaClient } from "../database/prismaClient";

export class PostController {
  async index(request: Request, response: Response) {
    try {
      const posts = await prismaClient.post.findMany();
      return response.status(200).json(posts);
    } catch (error: any) {
      return response.status(500).json({ error: error.message });
    }
  }
  async create(request: Request, response: Response) {
    const { post_text, post_type, post_points_to_share, post_owner_id } =
      request.body;
    try {
      const post = await prismaClient.post.create({
        data: {
          post_text,
          post_type,
          post_points_to_share,
          post_owner_id,
        },
      });
      return response.status(201).json(post);
    } catch (error: any) {
      return response.status(500).json({ error: error.message });
    }
  }
  async show(request: Request, response: Response) {
    const { post_id_pk } = request.body;

    try {
      const post = await prismaClient.post.findUnique({
        where: {
          post_id_pk: Number(post_id_pk),
        },
      });
      return response.status(200).json(post);
    } catch (error: any) {
      return response.status(500).json({ error: error.message });
    }
  }
  async postsByHospital(request: Request, response: Response) {
    const { hosp_id_pk } = request.params;

    try {
      const posts = await prismaClient.post.findMany({
        where: {
          post_owner_id: Number(hosp_id_pk),
          post_type: 1,
        },
      });
      return response.status(200).json(posts);
    } catch (error: any) {
      return response.status(500).json({ error: error.message });
    }
  }
  async postsByUser(request: Request, response: Response) {
    const { user_id_pk } = request.params;
    try {
      const posts = await prismaClient.post.findMany({
        where: {
          post_owner_id: Number(user_id_pk),
          post_type: 0,
        },
      });
      return response.status(200).json(posts);
    } catch (error: any) {
      return response.status(500).json({ error: error.message });
    }
  }
}
