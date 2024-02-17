export async function CreateDish(dish, image) {
    try {
        await db('Dish').insert({
            Nome: user.nome,
            Email: user.email,
            Senha: hashedPassword,
            Admin: user.admin
        });
        return true;

    } catch (error) {
        console.error("Erro ao inserir o prato:", error);
        return false;
    }
}