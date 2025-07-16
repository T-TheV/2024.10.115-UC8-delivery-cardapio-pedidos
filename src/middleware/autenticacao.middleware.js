const jwt = require("jsonwebtoken")

class AutenticacaoMiddleware {
    // Criei este middleware para verificar se o usuário está autenticado
    // Ele intercepta as requisições e valida o token JWT
    static autenticarToken(req, res, next){
        // Extraio o token do cabeçalho Authorization (formato: "Bearer token")
        const authHeader = req.headers['authorization']
        const token = authHeader && authHeader.split(' ')[1]

        // Se não tem token, nego o acesso
        if(!token){
           return res.status(401).json({msg: 'Token de acesso não fornecido, tente novamente'})
        }

        // Verifico se o token é válido usando a chave secreta
        jwt.verify(token, process.env.SECRET_KEY, (error, usuario) => {
            if(error){
                return res.status(403).json({ msg: "Você não tem permissão para acessar esse campo"})
            }

            // Se válido, adiciono os dados do usuário à requisição
            // Isso permite que outros middlewares/controllers acessem req.usuario
            req.usuario = usuario
            next()
        })
    }
}

module.exports = AutenticacaoMiddleware