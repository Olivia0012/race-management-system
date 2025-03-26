const express = require('express');

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const PORT = 5111;
app.listen(PORT, () => {
  console.log(`Server is running at port ${PORT}`);
});

const races = [
  {
    id: 'exampletestdata1',
    name: 'Race 1',
    participants: [
      { name: 'John', lane: '1', rank: '' },
      { name: 'Doe', lane: '2', rank: '' },
      { name: 'Gina', lane: '3', rank: '' },
      { name: 'Linda', lane: '4', rank: '' },
    ],
  },
];
app.get('/api/races', (req, res) => {
  res.json(races);
});

app.post('/api/race', (req, res) => {
  const newRace = req.body;

  if (Object.keys(newRace).length === 0)
    res.status(400).send('Invalid new race recived!');

  res.json({
    message: 'New newRace Added!',
  });
});

app.put('/api/race/:id', (req, res) => {
  const updatedRace = req.body;
  const raceId = req.params.id;

  const raceIndex = races.findIndex((race) => race.id === raceId);

  if (raceIndex !== -1) {
    races[raceIndex] = updatedRace;
    res.json({
      message: 'Updated race successfully',
    });
  } else {
    res.status(404).send('Nonexistent Race!');
  }
});

module.exports = app;
