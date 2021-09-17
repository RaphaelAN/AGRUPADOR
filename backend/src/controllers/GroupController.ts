import { Request, Response } from "express";
import {db, st} from "../database/connection"
import { GroupQuery, Group } from "../types";
import { validationResult } from "express-validator";

export default {
    async getGroups(req: Request, res: Response) {
        const errors = validationResult(req);
            if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const rawGroupQuery = JSON.parse(JSON.stringify(req.query))
        const groupQuery: GroupQuery= {
            radius: Number(rawGroupQuery.radius),
            lat: Number(rawGroupQuery.lat),
            lon: Number(rawGroupQuery.lon),
        }
        try {
            const groups: Group[] = await db('groups').select()
            .where(
                st.dwithin(
                "coordinates",
                st.geography(st.makePoint(groupQuery.lon, groupQuery.lat)),
                groupQuery.radius)
            ).modify((queryBuilder) => {
                if (groupQuery.category) {
                    queryBuilder.where('category', groupQuery.category)
                }
            });
            return res.status(200).json(groups)
            
        } catch (error) {
            return res.status(500).json({message: "Database error", error})
        }
    },

    async createGroup(req: Request, res: Response) {
        const errors = validationResult(req);
            if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        let group: Group = req.body
        group.lat = Number(group.lat)
        group.lon = Number(group.lon)
        if (group.category) {
            const db_category: string = await db('categories').select().first().where('category_name', group.category)
            if (!db_category){
                await db('categories').insert({category_name: group.category})
            }
        }
        try {
                await db('groups').insert({
                name: group.name,
                description: group.description,
                whatsapp: group.whatsapp,
                telegram: group.telegram,
                coordinates: st.setSRID(st.makePoint(group.lon, group.lat), 4326),
                category: group.category
            }, ['name', 'description'])
            return res.status(204).send();
        } catch (error) {
            return res.status(500).json({message: "Database error", error})
        }
    },

    async getCategories(req: Request, res: Response) {
        const errors = validationResult(req);
            if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const rawGroupQuery = JSON.parse(JSON.stringify(req.query))
        const groupQuery: GroupQuery= {
            radius: Number(rawGroupQuery.radius),
            lat: Number(rawGroupQuery.lat),
            lon: Number(rawGroupQuery.lon),
        }
        try {
            const categories: string[] = await db('groups').select('category').distinct('category')
            .where(
                st.dwithin(
                "coordinates",
                st.geography(st.makePoint(groupQuery.lon, groupQuery.lat)),
                groupQuery.radius)
            );
            return res.status(200).json(categories)
            
        } catch (error) {
            return res.status(500).json({error: "Database error"})
        }
    }
}


