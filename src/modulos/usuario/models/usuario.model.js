const { DataTypes } = require('sequelize');
const { sequelize } = require('../../../config/configDB')

// Defini o modelo Usuario com validações específicas que considerei importantes
const Usuario = sequelize.define(
    'Usuario',
    {
        nome: {
            type: DataTypes.STRING,
            allowNull: false
        },
        // Criei um ID customizado para seguir padrão específico (1 letra + 4 números)
        id: {
            type: DataTypes.STRING,
            primaryKey: true,
            validate: {
                is: {
                     args: /^[A-Za-z]\d{4}$/,
                    msg: "Só é possível inserir 1 letra maiuscula e 4 digitos númericos"
                }
            }
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true, // Garanti que cada email seja único no sistema
            validate: {
                isEmail: { msg: "Email Inválido"}
            }
        },
        senha: {
            type: DataTypes.STRING,
            allowNull: false,
            // Implementei validação robusta para senhas seguras
            validate: {
                is: {
                    args: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}$/,
                    msg: 'A senha deve ter no mínimo 8 caracteres, com letra maiúscula, minúscula, número e caractere especial.'
                }
            }
        },
        // Adicionei sistema de roles para controlar permissões
        role: {
            type: DataTypes.ENUM('cliente', 'admin'),
            allowNull: false,
            defaultValue: 'cliente', // Por padrão, novos usuários são clientes
            validate: {
                isIn: {
                    args: [['cliente', 'admin']],
                    msg: 'O papel deve ser "cliente" ou "admin".'
                }
            }
        },
    },
    {
        // Customizei os nomes das colunas para português
        tableName: 'usuario',
        createdAt: 'criado_em',
        updatedAt: 'atualizado_em'
    }
);

module.exports = Usuario