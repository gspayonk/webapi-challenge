const router = require('express').Router();
const actionsDb = require('../data/helpers/actionModel');
const projectsDb = require('../data/helpers/projectModel');

//get(): calling get returns an array of all the resources contained in the database. If you pass an id to this method it will return the resource with that id if one is found.

router.get('/', (req, res) => {
  actionsDb

  .get(req.project_id)

  .then(actions => {console.log(req.project_id);
    res.status(200).json(actions);});
});

router.get('/:id', (req, res) => {
  const {id} = req.params;

  projectsDb

    .getProjectActions(id)

    .then(actions => {actions.length

        ? res.status(200).json(actions)
        : res.status(400).json({ err: 'Please enter project id' });
    })

    .catch(() => res.status(500).json({ err: 'server error' }));
});

router.post('/', (req, res) => {
  const { project_id, description, notes} = req.body;

  if (!project_id || !description|| !notes) {
    res
      .status(400)
      .json({ err: 'project_id, description, and notes are required' });
  } else {
    projectsDb
    
    .get(project_id)
    .then(project => {project

        ? actions
            //insert(): calling insert passing it a resource object will add it to the database and return the newly created resource.

            .insert({project_id, description, notes})

            .then(action => res.status(200).json(action))

            .catch(() => res.status(500).json({ err: 'server error' }))

        : res.status(400).json({ err: 'enter project id' });
    });
  }
});

router.put('/:id', (req, res) => {

  const {id} = req.params;
  const {description, notes, completed} = req.body;

  if (!id) {
    res.status(404).json({ err: 'please enter valid id' });
  } else {
    actions
      //update(): accepts two arguments, the first is the id of the resource to update, and the second is an object with the changes to apply. It returns the updated resource. If a resource with the provided id is not found, the method returns null
      .update(id, { description, notes, completed })

      .then(action => res.status(200).json(action));
  }
});

router.delete('/:id', (req, res) => {
  const {id} = req.params;

  actionsDb
    //remove(): the remove method accepts an id as it's first parameter and, upon successfully deleting the resource from the database, returns the number of records deleted.
    .remove(id)

    .then(action => {
      if (action) {
        res.status(200).json({ res: `removed ${action}` });
      } else {
        res.status(400).json({ err: 'id not found' });
      }
    })

    .catch(() => res.status(500).json({ err: 'server error' }));
});

module.exports = router;
