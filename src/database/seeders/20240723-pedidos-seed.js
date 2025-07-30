'use strict';
module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert('pedidos', [
      {
        cliente_id: 1,
        status: 'Em preparo',
        total: 39.90,
        data_pedido: new Date(),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        cliente_id: 2,
        status: 'Entregue',
        total: 29.90,
        data_pedido: new Date(),
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },
  down: async (queryInterface) => {
    await queryInterface.bulkDelete('pedidos', null, {});
  }
};
