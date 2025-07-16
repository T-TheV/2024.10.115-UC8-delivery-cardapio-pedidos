const express = require("express")
const dotenv = require("dotenv")
const cors = require("cors")
const { sequelize } = require("./src/config/configDB")
const authRoute = require("./src/modulos/autenticacao/routes/autenticacao.route")
const usuarioRoute = require("./src/modulos/usuario/routes/usuario.route")
const pratoRoute = require("./src/modulos/prato/routes/prato.route")
const pedidoRoute = require("./src/modulos/pedido/routes/pedido.route")

dotenv.config();

const app = express()
app.use(cors({
    origin: 'http://localhost:5173',    //frontEnd react
    credentials: true       //Permite enviar cookies (como refreshToken)
}))


app.use(express.json());


app.use('/api/cardapio', pratoRoute)  // Para rotas /cardapio
app.use('/api/usuarios', usuarioRoute) // Para rotas /usuarios  
app.use('/api/', authRoute)           // Para /login
app.use('/api/', pedidoRoute)         // Para /pedidos

const PORTA = process.env.PORTA

app.listen(PORTA, async () => {
    try {
        await sequelize.authenticate()
        console.log('Conexão com o banco de dados foi estabelecida com sucesso.')

        await sequelize.sync({ force: true, alter: true })
        console.log("Banco de dados sincronizado com sucesso")
    } catch (error) {
        console.error('Erro ao conectar ou sincronizar com o banco de dados', error.message);
    }
    console.log(`Servidor rodando na porta ${PORTA}`)
})