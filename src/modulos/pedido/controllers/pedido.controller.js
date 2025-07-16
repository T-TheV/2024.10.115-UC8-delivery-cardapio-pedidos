const Pedido = require('../models/pedido.model')
const Prato = require('../../prato/models/prato.model')
const Usuario = require('../../usuario/models/usuario.model')

class PedidoController {
    // Criar um novo pedido
    static async criarPedido(req, res) {
        try {
            const { pratos } = req.body
            const usuarioId = req.usuario.id

            // Verificar se tem pratos
            if (!pratos || pratos.length === 0) {
                return res.status(400).json({ msg: "Precisa ter pelo menos um prato" })
            }

            let total = 0
            for (let i = 0; i < pratos.length; i++) {
                const prato = await Prato.findByPk(pratos[i].pratoId)
                
                // Verificar se o prato existe
                if (!prato) {
                    return res.status(400).json({ msg: "Prato não encontrado" })
                }
                
                // Verificar se está disponível
                if (!prato.disponivel) {
                    return res.status(400).json({ msg: "Prato não disponível" })
                }
                
                // Calcular valor (preço x quantidade)
                const quantidade = pratos[i].quantidade || 1
                const valorItem = prato.preco * quantidade
                total = total + valorItem
            }

            // Criar o pedido no banco
            const pedido = await Pedido.create({
                usuarioId: usuarioId,
                total: total,
                pratos: pratos
            })

            res.status(201).json({ 
                msg: "Pedido criado!", 
                pedido: pedido 
            })
            
        } catch (error) {
            console.log(error)
            res.status(500).json({ msg: "Deu erro" })
        }
    }

    // Listar pedidos
    static async listarPedidos(req, res) {
        try {
            const verificarRole = req.usuario.role === 'admin' ? {} : { usuarioId: req.usuario.id }
            
            const pedidos = await Pedido.findAll({
                where: verificarRole,
                include: [
                    {
                        model: Usuario,
                        attributes: ['id', 'nome', 'email']
                    }
                ],
                order: [['data_pedido', 'DESC']]
            })

            res.status(200).json(pedidos)
        } catch (error) {
            console.error(error)
            res.status(500).json({ msg: "Erro ao listar pedidos" })
        }
    }

    // Buscar pedido por ID
    static async buscarPedidoPorId(req, res) {
        try {
            const { id } = req.params
            
            const pedido = await Pedido.findByPk(id, {
                include: [
                    {
                        model: Usuario,
                        attributes: ['id', 'nome', 'email']
                    }
                ]
            })

            if (!pedido) {
                return res.status(404).json({ msg: "Pedido não encontrado" })
            }

            // Verificar permissão
            if (req.usuario.role !== 'admin' && pedido.usuarioId !== req.usuario.id) {
                return res.status(403).json({ msg: "Acesso negado" })
            }

            res.status(200).json(pedido)
        } catch (error) {
            console.error(error)
            res.status(500).json({ msg: "Erro ao buscar pedido" })
        }
    }

    // Atualizar status do pedido
    static async atualizarStatus(req, res) {
        try {
            const { id } = req.params
            const { status } = req.body

            const statusValidos = ['pendente', 'preparando', 'entregue', 'cancelado']
            if (!status || !statusValidos.includes(status)) {
                return res.status(400).json({ msg: "Status inválido" })
            }

            const pedido = await Pedido.findByPk(id)
            if (!pedido) {
                return res.status(404).json({ msg: "Pedido não encontrado" })
            }

            // Verificar permissões
            if (req.usuario.role !== 'admin' && pedido.usuarioId !== req.usuario.id) {
                return res.status(403).json({ msg: "Acesso negado" })
            }

            if (req.usuario.role !== 'admin' && status !== 'cancelado') {
                return res.status(403).json({ msg: "Clientes só podem cancelar pedidos" })
            }

            await pedido.update({ status })
            res.status(200).json({ msg: "Status atualizado com sucesso", pedido })
        } catch (error) {
            console.error(error)
            res.status(500).json({ msg: "Erro ao atualizar status" })
        }
    }

    // Cancelar pedido
    static async cancelarPedido(req, res) {
        try {
            const { id } = req.params
            
            const pedido = await Pedido.findByPk(id)
            if (!pedido) {
                return res.status(404).json({ msg: "Pedido não encontrado" })
            }

            // Verificar permissões
            if (req.usuario.role !== 'admin' && pedido.usuarioId !== req.usuario.id) {
                return res.status(403).json({ msg: "Acesso negado" })
            }

            if (pedido.status === 'cancelado') {
                return res.status(400).json({ msg: "Pedido já cancelado" })
            }

            if (pedido.status === 'entregue') {
                return res.status(400).json({ msg: "Não é possível cancelar pedido entregue" })
            }

            await pedido.update({ status: 'cancelado' })
            res.status(200).json({ msg: "Pedido cancelado com sucesso" })
        } catch (error) {
            console.error(error)
            res.status(500).json({ msg: "Erro ao cancelar pedido" })
        }
    }
}

module.exports = PedidoController