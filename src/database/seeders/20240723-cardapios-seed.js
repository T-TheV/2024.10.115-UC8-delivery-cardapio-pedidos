'use strict';
module.exports = {
    up: async (queryInterface) => {
        await queryInterface.bulkInsert('cardapios', [
            {
                nome: 'Macarrão Spaguete',
                descricao: 'Spaguete ao molho de tomate e manjericão',
                preco: 34.90,
                categoria: 'Massas',
                ativo: true,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                nome: 'Mac and Cheese',
                descricao: 'Macarrão com molho cremoso de queijo',
                preco: 32.90,
                categoria: 'Massas',
                ativo: true,
                createdAt: new Date(),
                updatedAt: new Date()
            }
        ], {});
    },
    down: async (queryInterface) => {
        await queryInterface.bulkDelete('cardapios', null, {});
    }
};
