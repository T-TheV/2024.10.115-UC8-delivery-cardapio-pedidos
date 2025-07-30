'use strict';
module.exports = {
    up: async (queryInterface) => {
        await queryInterface.bulkInsert('clientes', [
            {
                nome: 'Jorilto',
                email: 'Jorilto@gmail.com',
                endereco: 'Rua das Flores, 123',
                telefone: '11999999999',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                nome: 'Jorel',
                email: 'jorel@gmail.com',
                endereco: 'Av. Brasil, 456',
                telefone: '11888888888',
                createdAt: new Date(),
                updatedAt: new Date()
            }
        ], {});
    },
    down: async (queryInterface) => {
        await queryInterface.bulkDelete('clientes', null, {});
    }
};
