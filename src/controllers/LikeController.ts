import { Request, Response } from "express";

import { prismaClient } from "../database/prismaClient";

export class LikeController {
    async create(request: Request, response: Response) {
        const { user_id_fk, post_id_fk } = request.body;
        try {
            const like = await prismaClient.like.create({
                data: {
                    user_id_fk,
                    post_id_fk,
                },
            });
            return response.status(201).json(like);
        } catch (error: any) {
            return response.status(500).json({ error: error.message });
        }
    }
    async delete(request: Request, response: Response) {
        const { like_id_pk } = request.params;
        try {
            const like = await prismaClient.like.delete({
                where: {
                    like_id_pk: Number(like_id_pk),
                },
            });
            return response.status(200).json(like);
        } catch (error: any) {
            return response.status(500).json({ error: error.message });
        }
    }
    async likesByPost(request: Request, response: Response) {
        const { post_id_fk } = request.params;
        try {
            const likes = await prismaClient.like.findMany({
                where: {
                    post_id_fk: Number(post_id_fk),
                },
            });
            return response.status(200).json(likes);
        } catch (error: any) {
            return response.status(500).json({ error: error.message });
        }
    }
}