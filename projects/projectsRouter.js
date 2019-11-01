const router = require('express').Router();
const projectsDb = require('../data/helpers/projectModel');

//get(): calling get returns an array of all the resources contained in the database. If you pass an id to this method it will return the resource with that id if one is found.

router.get('/', (req, res) => {
  projectsDb

  .get()

  .then(projects => res.status(200).json(projects));
});

router.get('/:id', (req, res) => {
  const {id} = req.params;
  projectsDb

  .get(id)

  .then(project => res.status(200).json(project));
});

router.put('/:id', (req, res) => {
  const {id} = req.params;
  const {name, description, completed} = req.body;

  projectsDb

    //update(): accepts two arguments, the first is the id of the resource to update, and the second is an object with the changes to apply. It returns the updated resource. If a resource with the provided id is not found, the method returns null

    .update(id, { name, description, completed })

    .then(project => {
      if (!project) {
        res.status(404).json({ err: 'Please enter valid id' });
      }
      res.status(200).json(project);
    })

    .catch(() => res.status(500).json({err: 'An error has ocurred'}));
});

router.post('/', (req, res) => {

  const { name, description } = req.body;

  const completed = req.body.completed || false;
  const newProject = { name, description, completed };

  if (!name || !description) {
    res.status(400).json({ err: 'Please enter name and description' });
  } else {

    projectsDb

      //insert(): calling insert passing it a resource object will add it to the database and return the newly created resource.

      .insert(newProject)

      .then(project => res.status(200).json(project))
      .catch(() => {res.status(500).json({err: 'An error has ocurred'});});
  }
});


router.delete('/:id', (req, res) => {
  const {id} = req.params;
  if (!id) {
    res.status(404).json({ err: 'Please enter a valid id' });
  }

  projectsDb

    //remove(): the remove method accepts an id as it's first parameter and, upon successfully deleting the resource from the database, returns the number of records deleted.

    .remove(id)

    .then(project => res.status(200).json(project))

    .catch(() => {res.status(500).json({err: 'An error has ocurred'});});
});

module.exports = router;
