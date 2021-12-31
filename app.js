const express = require('express');
const fs = require('fs');
const app = express();

app.use(express.json())

// app.get('/', (req, res) => {
//   res.status(200).json({ message: "Hello there !", app: "TraxsTrips" });
// })

const tours = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`));



app.get('/api/v1/tours', (req, res) => {
  res.json({
    status: 'sucess',
    results: tours.length,
    data: { tours }
  })
})

app.post('/api/v1/tours', (req, res) => {
  const newID = tours[tours.length - 1].id + 1
  const newTour = Object.assign({ id: newID }, req.body)
  tours.push(newTour);
  fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours), err => {
      res.status(201).json(
        {
          status: "Success!",
          data: { tour: newTour }
        }
      )
    })
})

const port = 3000;
app.listen(port, () => {
  console.log(`Running on port ${port}...`);
});



