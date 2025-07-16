const express = require('express')
const PedidoController = require('../controllers/pedido.controller')
const AutenticacaoMiddleware = require('../../../middleware/autenticacao.middleware')
const AutorizacaoMiddleware = require('../../../middleware/autorizacao.middleware')

const router = express.Router()

// Todas as rotas de pedido precisam de autenticação
router.use(AutenticacaoMiddleware.autenticarToken)

// Criar pedido (apenas usuários autenticados)
router.post('/pedidos', PedidoController.criarPedido)

// Listar pedidos (admin vê todos, cliente só os seus)
router.get('/pedidos', PedidoController.listarPedidos)

// Buscar pedido específico
router.get('/pedidos/:id', PedidoController.buscarPedidoPorId)

// Atualizar status do pedido
router.put('/pedidos/:id/status', PedidoController.atualizarStatus)

// Cancelar pedido
router.delete('/pedidos/:id', PedidoController.cancelarPedido)

module.exports = router