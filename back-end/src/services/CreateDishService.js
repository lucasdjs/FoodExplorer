export async function CreateDish(dish, imagem) {
    try {
        console.log('passou')
        await db('dish').insert({
            name: dish.name,
            category: dish.category,
            ingredients: dish.ingredients,
            price: dish.price,
            description: dish.description,
            image: imagem
        });
        return true;

    } catch (error) {
        console.error("Erro ao inserir o prato:", error);
        return false;
    }
}