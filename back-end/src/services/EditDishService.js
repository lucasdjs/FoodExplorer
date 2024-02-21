import knex from 'knex';
import knexfile from '../../knexfile.js';

const db = knex(knexfile);

export const editDish = async (id, dishData) => {
    try {
      const priceNumeric = typeof dishData.price === 'string' ? parseFloat(dishData.price.replace(/[^\d.,]/g, '')) : dishData.price;
      
        await db('dish')
        .where('id', id)
        .update({
            name: dishData.name,
            category: dishData.category,
            ingredients: dishData.ingredients,
            price: priceNumeric,
            description: dishData.description,
            image: dishData.image
        });
  
      const updatedDish = await db('dish')
        .where('id', id)
        .first();
      
      return updatedDish;
    } catch (error) {
      throw new Error(`Erro ao editar o prato: ${error.message}`);
    }
  }