import { Request, Response } from "express";

import { prismaClient } from "../database/prismaClient";

export class CommentController {
  async index(request: Request, response: Response) {
    try {
      const comments = await prismaClient.comment.findMany();
      return response.status(200).json(comments);
    } catch (error: any) {
      return response.status(500).json({ error: error.message });
    }
  }
  async create(request: Request, response: Response) {
    const { comment_text, user_id_fk, post_id_fk } = request.body;
    try {
      const comment = await prismaClient.comment.create({
        data: {
          comment_text,
          user_id_fk,
          post_id_fk,
        },
      });
      return response.status(201).json(comment);
    } catch (error: any) {
      return response.status(500).json({ error: error.message });
    }
  }
  async commentByPost(request: Request, response: Response) {
    const { post_id_fk } = request.params;
    try {
      const comments = await prismaClient.comment.findMany({
        where: {
          post_id_fk: Number(post_id_fk),
        },
      });
      return response.status(200).json(comments);
    } catch (error: any) {
      return response.status(500).json({ error: error.message });
    }
  }
  async delete(request: Request, response: Response) {
    const { com_id_pk } = request.params;
    try {
      const comment = await prismaClient.comment.delete({
        where: {
          com_id_pk: Number(com_id_pk),
        },
      });
      return response.status(200).json(comment);
    } catch (error: any) {
      return response.status(500).json({ error: error.message });
    }
  }
}
