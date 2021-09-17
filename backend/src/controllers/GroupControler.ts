import { Request, Response } from "express";
import {db, st} from "../database/connection"

type Group = {
    name: string,
    lat: number,
    lon: number,
    description?: string,
    whatsapp?: string,
    telegram?: string
}

type GroupQuery = {
    lat: number,
    lon: number,
    radius: number,
}

export default {
    async getGroups(req: Request, res: Response) {
        const rawGroupQuery = JSON.parse(JSON.stringify(req.query))
        const groupQuery: GroupQuery= {
            radius: Number(rawGroupQuery.radius),
            lat: Number(rawGroupQuery.lat),
            lon: Number(rawGroupQuery.lon),
        }
        const groups = await db('groups').select()
            .where(
                st.dwithin(
                "coordinates",
                st.geography(st.makePoint(groupQuery.lon, groupQuery.lat)),
                groupQuery.radius)
            );
        return res.json(groups)
    },

    async createGroup(req: Request, res: Response) {
        let group: Group = req.body
        group.lat = Number(group.lat)
        group.lon = Number(group.lon)
        try {
            const new_group = await db("groups").insert({
                name: group.name,
                description: group.description,
                whatsapp: group.whatsapp,
                telegram: group.telegram,
                coordinates: st.setSRID(st.makePoint(group.lon, group.lat), 4326)
            })
            return res.status(204).json(new_group);
        } catch (error) {
            return res.status(500).json({message: "Database failure", error})
        }
    }
}


