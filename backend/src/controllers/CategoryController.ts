import { db , st} from "../database/connection"
import GroupController from "./GroupController"
import { GroupQuery } from "../types"
import { Request, Response } from "express"


export default {
    async getCategories(req: Request, res: Response) {

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
