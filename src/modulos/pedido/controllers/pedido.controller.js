const Pedido = require('../models/pedido.model')
const Prato = require('../../prato/models/prato.model')
const Usuario = require('../../usuario/models/usuario.model')

class PedidoController {
    // Implementei a lógica para criar pedidos validando pratos e calculando total
    static async criarPedido(req, res) {
        try {
            const { pratos } = req.body
            const usuarioId = req.usuario.id // Pego o ID do usuário autenticado

            // Validação básica: deve ter pelo menos um prato
            if (!pratos || pratos.length === 0) {
                return res.status(400).json({ msg: "Precisa ter pelo menos um prato" })
            }

            let total = 0
            // Valido cada prato do pedido e calculo o total
            for (let i = 0; i < pratos.length; i++) {
                const prato = await Prato.findByPk(pratos[i].pratoId)
                
                // Verifico se o prato existe no cardápio
                if (!prato) {
                    return res.status(400).json({ msg: "Prato não encontrado" })
                }
                
                // Não permito pedidos com pratos indisponíveis
                if (!prato.disponivel) {
                    return res.status(400).json({ msg: "Prato não disponível" })
                }
                
                // Calculo o valor: preço do prato × quantidade solicitada
                const quantidade = pratos[i].quantidade || 1
                const valorItem = prato.preco * quantidade
                total = total + valorItem
            }

            // Crio o pedido no banco com os dados validados
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

    // Implementei listagem com controle de acesso baseado no role
    static async listarPedidos(req, res) {
        try {
            // Admins veem todos os pedidos, clientes só os próprios
            const verificarRole = req.usuario.role === 'admin' ? {} : { usuarioId: req.usuario.id }
            
            const pedidos = await Pedido.findAll({
                where: verificarRole,
                // Incluo dados do usuário para informações completas
                include: [
                    {
                        model: Usuario,
                        attributes: ['id', 'nome', 'email']
                    }
                ],
                order: [['data_pedido', 'DESC']] // Mais recentes primeiro
            })

            res.status(200).json(pedidos)
        } catch (error) {
            console.error(error)
            res.status(500).json({ msg: "Erro ao listar pedidos" })
        }
    }

    // Busca pedido específico com controle de permissão
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

            // Verifico se o usuário pode acessar este pedido
            // (dono do pedido ou admin)
            if (req.usuario.role !== 'admin' && pedido.usuarioId !== req.usuario.id) {
                return res.status(403).json({ msg: "Acesso negado" })
            }

            res.status(200).json(pedido)
        } catch (error) {
            console.error(error)
            res.status(500).json({ msg: "Erro ao buscar pedido" })
        }
    }

    // Implementei atualização de status com regras específicas
    static async atualizarStatus(req, res) {
        try {
            const { id } = req.params
            const { status } = req.body

            // Defini os status válidos para o sistema
            const statusValidos = ['pendente', 'preparando', 'entregue', 'cancelado']
            if (!status || !statusValidos.includes(status)) {
                return res.status(400).json({ msg: "Status inválido" })
            }

            const pedido = await Pedido.findByPk(id)
            if (!pedido) {
                return res.status(404).json({ msg: "Pedido não encontrado" })
            }

            // Controlo permissões: admin pode mudar qualquer status,
            // cliente só pode cancelar seus próprios pedidos
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

    // Cancelamento de pedidos com validações de regra de negócio
    static async cancelarPedido(req, res) {
        try {
            const { id } = req.params
            
            const pedido = await Pedido.findByPk(id)
            if (!pedido) {
                return res.status(404).json({ msg: "Pedido não encontrado" })
            }

            // Verifico permissões
            if (req.usuario.role !== 'admin' && pedido.usuarioId !== req.usuario.id) {
                return res.status(403).json({ msg: "Acesso negado" })
            }

            // Implementei regras de negócio para cancelamento
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