class AutorizacaoMiddleware {
    static verificarAdmin(req, res, next) {
        if (!req.usuario) {
            return res.status(401).json({ msg: 'Usuário não autenticado' })
        }

        if (req.usuario.role !== 'admin') {
            return res.status(403).json({ msg: 'Acesso negado. Apenas administradores podem realizar esta ação.' })
        }

        next()
    }

    static verificarProprietario(req, res, next) {
        if (!req.usuario) {
            return res.status(401).json({ msg: 'Usuário não autenticado' })
        }

        const recursoUserId = req.params.userId || req.body.usuarioId
        
        if (req.usuario.role !== 'admin' && req.usuario.id !== parseInt(recursoUserId)) {
            return res.status(403).json({ msg: 'Acesso negado. Você só pode acessar seus próprios dados.' })
        }

        next()
    }
}

module.exports = AutorizacaoMiddleware