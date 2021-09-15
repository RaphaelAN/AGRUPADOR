import { Request, Response } from "express";

const Groups = [
    { name: "Fisica 3", category: "Ciência da computação", wpp_link: "whatsapp.com", telegram_link: "telegram.com"},
]

export default {
    async getGroups(req: Request, res: Response) {
        return res.json(Groups)
    },

    async createGroup(req: Request, res: Response) {
        return res.send();
    }
}

