import knex from "knex";
import KnexPostgis from "knex-postgis";
import configs from "../../knexfile";


const config = process.env.NODE_ENV == 'test' ? configs.test : configs.development

const db = knex(configs.development)

const st = KnexPostgis(db)

export{ db, st }