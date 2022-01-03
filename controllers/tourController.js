const fs = require('fs')
const tours = JSON.parse(fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`));

exports.getAllTours = (req, res) => {
  res.json({
    status: 'sucess',
    results: tours.length,
    data: { tours }
  })
}

exports.getTourById = (req, res) => {
  if (req.params.id > tours.length) {
    res.status(404).json({
      status: 'fail',
      message: 'resource not found',
    })
  }
  tr = tours.find(el => el.id === (req.params.id * 1))
  console.log(req.params)
  res.json({
    status: 'sucess',
    data: { tr }
  })
}

exports.deleteTour = (req, res) => {
  if (req.params.id > tours.length) {
    res.status(404).json({
      status: 'fail',
      message: 'resource not found'
    })
  }
  tr = tours.filter(el => el.id != (req.params.id * 1))
  const l = tr.length
  console.log(tr)
  res.status(200).json({
    status: 'sucess',
    results: l,
    data: 'deleted'
  })
}

exports.createTour = (req, res) => {
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
}

exports.updateTour = (req, res) => {
  if (req.params.id > tours.length) {
    res.status(404).json({
      status: 'fail',
      message: 'resource not found',
    })
  }
  tr = tours.find(el => el.id === (req.params.id * 1))
  console.log(req.params)
  res.json({
    status: 'sucess',
    results: tr.length,
    data: req.params
  })
}
