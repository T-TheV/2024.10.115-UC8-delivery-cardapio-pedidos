'use strict';
module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert('usuarios', [
      {
        nome: 'Admin Delivery',
        email: 'admin@delivery.com',
        senha: 'senha123', // ideal: hash
        papel: 'admin',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nome: 'Cliente Delivery',
        email: 'cliente@delivery.com',
        senha: 'senha123',
        papel: 'cliente',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },
  down: async (queryInterface) => {
    await queryInterface.bulkDelete('usuarios', null, {});
  }
};
