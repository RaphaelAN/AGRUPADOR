import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('categories', (table: Knex.TableBuilder) => {
        table.string('category_name').primary()
    });
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('categories')
}

