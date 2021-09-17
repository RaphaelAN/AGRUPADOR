import { Router } from "express";
import GroupControler from "../controllers/GroupControler"


const routes = Router();


routes.get('/', GroupControler.getGroups);
routes.post('/', GroupControler.createGroup);



export default routes;