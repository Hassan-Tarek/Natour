const fs = require('fs');

const filePath = `${__dirname}/../data/tours.json`;
const tours = JSON.parse(fs.readFileSync(filePath));

exports.getTours = (req, res) => {
  res.status(200).json({
    status: "success",
    results: tours.length,
    data: {
      tours
    }
  });
};

exports.getTour = (req, res) => {
  const id = req.params.id;
  const tour = tours.find(t => t._id === id);
  res.status(200).json({
    status: "success",
    data: {
      tour
    }
  });
};

exports.createTour = (req, res) => {
  const newId = crypto.randomUUID();
  const newTour = Object.assign({ id: newId }, req.body);
  tours.push(newTour);
  fs.writeFile(
    filePath, 
    JSON.stringify(tours),
     err => {
      res.status(201).json({ 
        status: "success",
        data: {
          tour: newTour
        }
      });
    });
};

exports.updateTour = (req, res) => {
  const id = req.params.id;
  const tour = tours.find(t => t._id === id);
  res.status(200).json({
    status: "success",
    data: {
      tour: "updated tour..."
    }
  });
};

exports.deleteTour = (req, res) => {
  const id = req.params.id;
  tours.delete(tour => tour._id === id);
  res.status(204).json({
    status: "success",
    data: null
  });
};
