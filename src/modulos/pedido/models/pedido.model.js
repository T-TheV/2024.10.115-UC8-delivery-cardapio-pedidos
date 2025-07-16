const { sequelize } = require('../../../config/configDB')
const { DataTypes } = require('sequelize')

const Pedido = sequelize.define('Pedido', {
    usuarioId: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
            model: 'usuario', // Mudança aqui: de 'Usuarios' para 'usuario'
            key: 'id'
        }
    },
    total: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    status: {
        type: DataTypes.ENUM('pendente', 'preparando', 'entregue', 'cancelado'),
        allowNull: false,
        defaultValue: 'pendente'
    },
    data_pedido: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    },
    pratos: {
        type: DataTypes.TEXT,
        allowNull: false
    }
})

module.exports = Pedido