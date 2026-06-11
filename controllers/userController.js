const { json } = require('body-parser');
const fs = require('fs')

const filePath = `${__dirname}/../data/users.json`;
const users = JSON.parse(fs.readFileSync(filePath));

exports.getUsers = (req, res) => {
  res.status(200).json({
      'status': 'success',
      users
  });
};

exports.getUser = (req, res) => {
  const id = req.params.id;
  const user = users.find(u => u._id === id);
  res.status(200).json({
    'status': 'success',
    user
  });
};

exports.createUser = (req, res) => {
  const newId = crypto.randomUUID();
  const newUser = Object.assign({ id: newId }, req.body);
  users.push(newUser);
  fs.writeFile(
    filePath,
    JSON.stringify(users),
    err => {
      res.status(201).json({
        'status': 'success',
        data: {
          user: newUser
        } 
      });
    }
  );
};

exports.updateUser = (req, res) => {
  const id = req.params.id;
  const user = users.find(u => u._id === id);
  res.status(200).json({
    'status': 'success',
    data: {
      user: 'Updated user...'
    }
  });
};

exports.deleteUser = (req, res) => {
  const id = req.params.id;
  user.delete(user => user._id === id);
  res.status(204).json({
    'status': 'success',
    data: null
  });
};
