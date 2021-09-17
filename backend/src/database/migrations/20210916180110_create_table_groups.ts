import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('groups', (table: Knex.TableBuilder) => {
        table.increments('id').primary().unsigned()
        table.string('name').notNullable()
        table.string('description')
        table.string('whatsapp')
        table.string('telegram')
        table.specificType("coordinates", "geography(point, 4326)");
    });
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('groups')
}
