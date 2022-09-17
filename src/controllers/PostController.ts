import { Request, Response } from "express";
import { prismaClient } from "../database/prismaClient";

export class PostController {
    async index(request: Request, response: Response) {
        try {
            const posts = await prismaClient.post.findMany();
            return response.status(200).json(posts);
        } catch (error) {
            return response.status(500).json({ error });
        }
    }
    async create(request: Request, response: Response) {
        const { post_text, post_type, post_points_to_share, post_owner_id} = request.body;
        try {
            const post = await prismaClient.post.create({
                data: {
                    post_text,
                    post_type,
                    post_points_to_share,
                    post_owner_id,
                }
            })
            return response.status(201).json(post);
        }catch(error: any){
            return response.status(500).json({error: error})
        }
    }
    async show(request: Request, response: Response){
        const { post_owner_id } = request.params;

        try {
            const posts = await prismaClient.post.findMany({
                where: {
                    post_owner_id: Number(post_owner_id)
                }
            })
            return response.status(200).json(posts);
        }catch(error: any){
            return response.status(500).json(error);
        }
    }
}