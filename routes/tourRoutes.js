const express = require('express')
const router = express.Router();
const fs = require('fs');

const tours = JSON.parse(fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`));

const getAllTours = (req, res) => {
  res.json({
    status: 'sucess',
    results: tours.length,
    data: { tours }
  })
}

const getTourById = (req, res) => {
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

const deleteTour = (req, res) => {
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

const createTour = (req, res) => {
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

const updateTour = (req, res) => {
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

router.route('/').get(getAllTours).post(createTour)
router.route('/:id').get(getTourById).patch(updateTour).delete(deleteTour)


module.exports = router;
