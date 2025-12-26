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

app.post('/open', (req, res) => {
  if(req.body.token !== TOKEN_SECRET) return res.status(403).send('Token invalide');
  client.publish('aquatec/porte/cmd', 'YB'); // ouvrir
  res.send('Porte ouverte');
});

app.post('/close', (req, res) => {
  if(req.body.token !== TOKEN_SECRET) return res.status(403).send('Token invalide');
  client.publish('aquatec/porte/cmd', 'YP'); // fermer
  res.send('Porte fermée');
});

app.post('/stop', (req, res) => {
  if(req.body.token !== TOKEN_SECRET) return res.status(403).send('Token invalide');
  client.publish('aquatec/porte/cmd', 'ST'); // stop
  res.send('Commande STOP envoyée');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Serveur prêt sur le port ${PORT}`));
