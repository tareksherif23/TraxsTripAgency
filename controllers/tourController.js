//const tours = JSON.parse(fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`));
const Tour = require('../models/tourModel')


exports.getAllTours = (req, res) => {
  res.status(200).json({
    // status: 'sucess',
    // results: tours.length,
    // data: { tours }
  })
}

exports.getTourById = (req, res) => {
  //tr = tours.find(el => el.id === (req.params.id * 1))
  console.log(req.params)
  res.json({
    status: 'sucess',
    // data: { tr }
  })
}

exports.deleteTour = (req, res) => {
  //tr = tours.filter(el => el.id != (req.params.id * 1))
  res.status(200).json({
    status: 'sucess',
    data: 'deleted'
  })
}

exports.createTour = async (req, res) => {
  //const newID = tours[tours.length - 1].id + 1
  //const newTour = Object.assign({ id: newID }, req.body)
  try {
    const newTour = await Tour.create(req.body)
    res.status(201).json({
      status: 'sucess',
      newTour
    })
  } catch (Error) {
    res.status(400).json({
      status: 'fail',
      Error
    })
  }




}

exports.updateTour = (req, res) => {
  //tr = tours.find(el => el.id === (req.params.id * 1))
  console.log(req.params)
  res.json({
    status: 'sucess',
    data: req.params
  })
}
