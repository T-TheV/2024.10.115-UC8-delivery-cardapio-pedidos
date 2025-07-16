const express = require('express')
const PratoController = require('../controllers/prato.controller')
const AutenticacaoMiddleware = require('../../../middleware/autenticacao.middleware')
const AutorizacaoMiddleware = require('../../../middleware/autorizacao.middleware')

const router = express.Router()

// Rotas públicas (para visualizar o cardápio)
router.get('/', PratoController.listarPratos)
router.get('/:id', PratoController.listarPratoPorId)

// Rotas protegidas (para gerenciar o cardápio - apenas usuários autenticados)
router.post('/', AutenticacaoMiddleware.autenticarToken, AutorizacaoMiddleware.verificarAdmin, PratoController.registrar)
router.put('/:id', AutenticacaoMiddleware.autenticarToken, AutorizacaoMiddleware.verificarAdmin, PratoController.editarPrato)
router.delete('/:id', AutenticacaoMiddleware.autenticarToken, AutorizacaoMiddleware.verificarAdmin, PratoController.deletarPrato)
router.patch('/:id/disponibilidade', AutenticacaoMiddleware.autenticarToken, AutorizacaoMiddleware.verificarAdmin,PratoController.alterarDisponibilidade)

module.exports = router
