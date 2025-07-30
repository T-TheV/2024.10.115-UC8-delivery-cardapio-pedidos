'use strict';
module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert('itens_pedido', [
      {
        pedido_id: 1,
        cardapio_id: 1,
        quantidade: 2,
        preco_unitario: 39.90,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        pedido_id: 2,
        cardapio_id: 2,
        quantidade: 1,
        preco_unitario: 29.90,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },
  down: async (queryInterface) => {
    await queryInterface.bulkDelete('itens_pedido', null, {});
  }
};
