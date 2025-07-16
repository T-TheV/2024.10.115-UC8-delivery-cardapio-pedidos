class AutorizacaoMiddleware {
    // Criei este middleware para verificar se o usuário tem permissão de admin
    // Uso principalmente para proteger rotas de gerenciamento do cardápio
    static verificarAdmin(req, res, next) {
        if (!req.usuario) {
            return res.status(401).json({ msg: 'Usuário não autenticado' })
        }

        // Só permito acesso se o role for 'admin'
        if (req.usuario.role !== 'admin') {
            return res.status(403).json({ msg: 'Acesso negado. Apenas administradores podem realizar esta ação.' })
        }

        next()
    }

    // Este middleware garante que usuários só acessem seus próprios dados
    // Ou permite que admins acessem dados de qualquer usuário
    static verificarProprietario(req, res, next) {
        if (!req.usuario) {
            return res.status(401).json({ msg: 'Usuário não autenticado' })
        }

        // Pego o ID do recurso que está sendo acessado
        const recursoUserId = req.params.userId || req.body.usuarioId
        
        // Admin pode acessar tudo, outros usuários só seus próprios dados
        if (req.usuario.role !== 'admin' && req.usuario.id !== parseInt(recursoUserId)) {
            return res.status(403).json({ msg: 'Acesso negado. Você só pode acessar seus próprios dados.' })
        }

        next()
    }
}

module.exports = AutorizacaoMiddleware