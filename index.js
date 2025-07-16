const express = require("express")
const dotenv = require("dotenv")
const cors = require("cors")
const { sequelize } = require("./src/config/configDB")
// Importo todas as rotas que criei para organizar o sistema
const authRoute = require("./src/modulos/autenticacao/routes/autenticacao.route")
const usuarioRoute = require("./src/modulos/usuario/routes/usuario.route")
const pratoRoute = require("./src/modulos/prato/routes/prato.route")
const pedidoRoute = require("./src/modulos/pedido/routes/pedido.route")

dotenv.config();

const app = express()

// Configurei CORS para permitir acesso do frontend React
app.use(cors({
    origin: 'http://localhost:5173',    // Endereço do meu frontend React
    credentials: true       // Permite enviar cookies (como refreshToken)
}))

// Middleware para parsing de JSON
app.use(express.json());

// Organizei as rotas por módulos com prefixos específicos
app.use('/api/cardapio', pratoRoute)  // Para rotas /cardapio
app.use('/api/usuarios', usuarioRoute) // Para rotas /usuarios  
app.use('/api/', authRoute)           // Para /login
app.use('/api/', pedidoRoute)         // Para /pedidos

const PORTA = process.env.PORTA

// Inicializo o servidor e configuro o banco de dados
app.listen(PORTA, async () => {
    try {
        // Testo a conexão com o banco
        await sequelize.authenticate()
        console.log('Conexão com o banco de dados foi estabelecida com sucesso.')

        // Sincronizo os modelos com o banco (cria/atualiza tabelas)
        // ATENÇÃO: force: true apaga dados existentes - uso só em desenvolvimento
        await sequelize.sync({ force: true, alter: true })
        console.log("Banco de dados sincronizado com sucesso")
    } catch (error) {
        console.error('Erro ao conectar ou sincronizar com o banco de dados', error.message);
    }
    console.log(`Servidor rodando na porta ${PORTA}`)
})