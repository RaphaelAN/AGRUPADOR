import { Request, Response } from "express";
import { db, st } from "../database/connection";

const Groups = [
    { name: "Fisica 4", category: "Ciência da computação", wpp_link: "whatsapp.com", telegram_link: "telegram.com"},
    { name: "Fisica 3", category: "Ciência da computação", wpp_link: "whatsapp.com", telegram_link: "telegram.com"},

]

export default {
    async getGroups(req: Request, res: Response) {
        const groups = await db('groups').select()
        return res.json(groups)
    },

    async createGroup(req: Request, res: Response) {
        return res.send();
    }
}

