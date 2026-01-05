const express = require('express');
const mqtt = require('mqtt');

const app = express();
app.use(express.json());

// Connexion MQTT
const client =mqtt.connect('mqtt://aquatec:iot2021@mqtt.livepool.eu:8883');

client.on('connect', () => {
  console.log('✅ Connecté au broker MQTT');
});

client.on('error', (err) => {
  console.error('❌ Erreur MQTT :', err);
});

client.on('close', () => {
  console.log('⚠️ Connexion MQTT fermée');
});
const TOKEN_SECRET = 'SECRET123';

app.get('/open', (req, res) => {
  client.publish('aquatec/porte/cmd', 'YB'); // ouvrir
  res.send('Porte ouverte');
});

app.get('/close', (req, res) => {
  client.publish('aquatec/porte/cmd', 'YP'); // fermer
  res.send('Porte fermée');
});

app.get('/stop', (req, res) => {
  client.publish('aquatec/porte/cmd', 'ST'); // stop
  res.send('Commande STOP envoyée');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Serveur prêt sur le port ${PORT}`));


