import { Router } from "express";
import CategoryController from "../controllers/CategoryController";
import GroupController from "../controllers/GroupController"
import {body, query} from "express-validator"


const routes = Router();


routes.get('/', 
    query('lat').isFloat({min: -90, max: 90}),
    query('lon').isFloat({min: -180, max: 180}),
    query('radius').isFloat(),
    query('category').isLength({min:3, max:50}).optional(),
    GroupController.getGroups);

routes.post('/', 
    body('lat').isFloat({min: -90, max: 90}),
    body('lon').isFloat({min: -180, max: 180}),
    body('name').isLength({min:3, max:50}),
    body('radius').isFloat().optional(),
    body('description').isLength({max:255}).optional(),
    body('category').isLength({min:3, max:50}).optional(),
    body('whatsapp').isURL().matches('https:\/\/chat\.whatsapp\.com\/.+').optional(),
    body('telegram').isURL().matches('t\.me\/.+').optional(),
    GroupController.createGroup);

routes.get('/categories',
    query('lat').isFloat({min: -90, max: 90}),
    query('lon').isFloat({min: -180, max: 180}),
    query('radius').isFloat(),
    CategoryController.getCategories);



export default routes;