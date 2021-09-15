import { Router } from "express";
import GroupController from "../controllers/GroupController";


const routes = Router();

routes.get('/', GroupController.getGroups);
routes.post('/', GroupController.createGroup);


export default routes;