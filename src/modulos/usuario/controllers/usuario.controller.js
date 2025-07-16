const Usuario = require("../models/usuario.model")
const bcrypt = require('bcryptjs')

class UsuarioController {
    static async cadastrar(req, res){
        try {
            const { nome, id, email, senha, role } = req.body; // Adicionar role aqui
            if( !id || !nome || !email || !senha){
                return res.status(400).json({ msg: "Todos os campos devem ser preenchidos" })
            }
            
            // Validação de senha
            if (senha.length < 8) {
                return res.status(400).json({ msg: "A senha deve ter pelo menos 8 caracteres" });
            }
            
            const senhaRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}$/;
            if (!senhaRegex.test(senha)) {
                return res.status(400).json({ 
                    msg: "A senha deve conter pelo menos: 1 letra minúscula, 1 maiúscula, 1 número e 1 símbolo" 
                });
            }
            
            const senhaCriptografada = await bcrypt.hash(senha, 15);
            await Usuario.create({ 
                nome, 
                id, 
                email, 
                senha: senhaCriptografada,
                role: role || 'cliente' // Adicionar role aqui com valor padrão
            })
            res.status(200).json({msg: 'Usuario cadastrado com sucesso' })
        } catch (error) {
            res.status(500).json({ msg: "Erro ao cadastrar um novo usuario. Tente novamente mais tarde!", erro: error.message})
        }
    }

    static async perfil (req, res){
        try {
            const { id } = req.usuario
            const usuario = await Usuario.findOne({
                where: {id},
                attributes: ["nome", "email", "id", "role"] // Adicionar role nos atributos

            });
            if(!usuario){
                return res.status(401).json({ msg: "Não existe esse usuário cadastrado! "});
            }
            res.status(200).json(usuario)
        } catch (error) {
        res.status(500).json({msg: 'Erro do servidor. Tente novamente mais tarde!'})
        }
    }
}

module.exports = UsuarioController