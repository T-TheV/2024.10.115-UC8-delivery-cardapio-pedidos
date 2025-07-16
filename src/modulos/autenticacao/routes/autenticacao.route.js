const express = require('express')
const AutenticacaoController = require('../controllers/autenticacao.controller')

const router = express.Router()

router.post('/login', AutenticacaoController.login)

router.post('/logout', AutenticacaoController.logout)

router.post('/refresh-token', AutenticacaoController.refreshToken)

module.exports = router