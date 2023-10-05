const express = require('express');
const app = express();
const path = require('path');
const device = require('express-device');

// Adicione o middleware express-device para detectar o tipo de dispositivo
app.use(device.capture());

// Defina a pasta "public" como o diretório raiz para servir arquivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Rota para a página HTML padrão
app.get('/vmassochini', (req, res) => {
  // Verifique se o dispositivo é um smartphone
  if (req.device.type === 'phone') {
    // Redirecione para a versão móvel
    res.redirect('/vmassochini-mobile');
  } else {
    // Caso contrário, exiba a página HTML padrão
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
  }
});

// Rota para a página móvel
app.get('/vmassochini-mobile', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Inicie o servidor na porta 3000
app.listen(process.env.PORT || 3000);
