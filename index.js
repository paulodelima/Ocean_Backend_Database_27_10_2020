const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const { text } = require('body-parser');
const port = 3000;

// Precisamos avisar o express para utilizar o body-parse
// Assim, ele aberá como transformar as ifnormações no BODY da requisição
// em informação para a programação

app.use(bodyParser.json());

/*
-> Create, Read (All/Single), Update & Delete
-> Criar, Ler (Tudo ou Individual), Atualizar e Remover
*/

/*
URL -> http://localhost:3000
Endpoint ou Rota -> [GET] /mensagem
Endpoint ou Rota -> [POST] /mensagem
Endpoint: [GET] /mensagem
Descrição: Ler todas as mensagens
Endpoint: [POST] /mensagem
Descrição: Criar uma mensagem
Endpoint: [GET] /mensagem/{id}
Descrição: Ler mensagem específica pelo ID
Exemplo: [GET] /mensagem/1
Endpoint: [PUT] /mensagem/{id}
Descrição: Edita mensagem específica pelo ID
Endpoint: [DELETE] /mensagem/{id}
Descrição: Remove mensagem específica pelo ID
*/

 
app.get('/', function (req, res) {
  res.send('Hello World');
});
 
const mensagens = [
    {  
        'id': 1,
        'texto': 'Essa é uma mensagem'
    },
    {  
        'id': 2,
        'texto': 'Essa é outra mensagem'
    }
];

    

// Read all
app.get('/mensagem', function(req, res){
    res.send(mensagens.filter(Boolean));
})

// Create
app.post('/mensagem', function(req, res){
    const texto = req.body.texto;

    const mensagem = {
        id : mensagens.length + 1,
        texto : texto
    }
    mensagens.push(mensagem);
    res.send(mensagens);
})

// Read single
app.get('/mensagem/:id', function(req, res){
    const id = req.params.id;
    const mensagem = mensagens[id-1];
    res.send(mensagem);
} )

// update
app.put('/mensagem/:id', function(req, res){
    const id = req.params.id;
    const texto = req.body.texto;
    mensagens[id-1] = texto;
    res.send(mensagens[id-1]);
} )

// delete
app.delete('/mensagem/:id', function(req, res){
    const id = req.params.id;
    delete mensagens[id-1];
    res.send(`A mensagem de ID '${id}' foi removida com sucesso.`);
} )

app.listen(port, function(){
    console.log('App rodando em http://localhost: ' + port);
});

