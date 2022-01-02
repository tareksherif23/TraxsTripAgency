const express = require('express')
const router = express.Router();
const fs = require('fs');

const users = JSON.parse(fs.readFileSync(`${__dirname}/../dev-data/data/users.json`));

const getAllUsers = (req, res) => {
  res.json({
    status: 'sucess',
    results: users.length,
    data: { users }
  })
}

const getUserById = (req, res) => {
  if (req.params.id > users.length) {
    res.status(404).json({
      status: 'fail',
      message: 'resource not found',
    })
  }
  us = users.find(el => el.id === (req.params.id * 1))
  console.log(req.params)
  res.json({
    status: 'sucess',
    data: { us }
  })
}

const deleteUser = (req, res) => {
  if (req.params.id > users.length) {
    res.status(404).json({
      status: 'fail',
      message: 'resource not found'
    })
  }
  us = users.filter(el => el.id != (req.params.id * 1))
  res.status(200).json({
    status: 'sucess',
    data: 'deleted'
  })
}

const createUser = (req, res) => {
  const newID = users[users.length - 1].id + 1
  const newUser = Object.assign({ id: newID }, req.body)
  users.push(newUser);
  fs.writeFile(`${__dirname}/dev-data/data/users.json`,
    JSON.stringify(users), err => {
      res.status(201).json(
        {
          status: "Success!",
          data: { user: newUser }
        }
      )
    })
}

const updateUser = (req, res) => {
  console.log('to be implemented')
  res.status(500).json({ msg: "to be impl.." })
}

router.route('/').get(getAllUsers).post(createUser)
router.route('/:id').get(getUserById).patch(updateUser).delete(deleteUser)


module.exports = router;
