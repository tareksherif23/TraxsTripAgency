const fs = require('fs');

const users = JSON.parse(fs.readFileSync(`${__dirname}/../dev-data/data/users.json`));

exports.getAllUsers = (req, res) => {
  res.json({
    status: 'sucess',
    results: users.length,
    data: { users }
  })
}

exports.getUserById = (req, res) => {
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

exports.deleteUser = (req, res) => {
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

exports.createUser = (req, res) => {
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

exports.updateUser = (req, res) => {
  console.log('to be implemented')
  res.status(500).json({ msg: "to be impl.." })
}
