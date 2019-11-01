const projectDb = require('../data/helpers/projectModel');
const router = require('express').Router();


router.post('/', validateProject, (req, res) => {
    const {project} = req.body;

    projectDb
    .insert({project})
    .then(project => res.status(200).json(project))

});

// router.post('/:id/projects', validateProjectId, validateAction, (req, res) => {

//     const newAction = {
//         text: req.body.text,
//         text: req.body.text,
//         project_id: req.project.id
//         };

//         actionsDb.insert(newAction).then(action => res.status(200).json(action));

// });

router.get('/', (req, res) => {
    projectDb

    .get()

    .then(projects => res.status(200).json(projects))

    .catch(() => res.status(500).json({ errorMessage: 'An error has ocurred' }));

});

router.get('/:id', validateProjectId, (req, res) => {
    const {id} = req.params.id;

    projectDb

    .getById(id)

    .then(project => res.status(200).json(project))

    .catch(() => res.status(500).json({ error: 'An error has ocurred' }));

});

router.get('/:id/actions', validateProjectId, (req, res) => {
    const {id} = req.params.id;

    projectDb

    .getProjectActions(id)

    .then(actions => {
        res.status(200).json(actions);
    })

    .catch(() => res.status(500).json({ err: 'Server Error' }));

});

router.delete('/:id', validateProjectId, (req, res) => {
    const {id} = req.params.id;

    projectDb

    .remove(id)

    .then(project =>res.status(200).json({ response: `Deleted post id #${project}` }))

    .catch(() => res.status(500).json({ error: 'Server Error' }));

});

router.put('/:id', validateProjectId, (req, res) => {
    const {id} = req.params.id;
    const {project} = req.body;

    projectDb
    .update(id, {project})
    
    .then(project => res.status(200).json(project)

    .catch(err => res.status(500).json({err: err}))
    );

});

//custom middleware
function validateProjectId(req, res, next) {
    const {id} = req.params;

    projectDb

    .getById(id)

    .then(project => {
        if (project) {req.project = project;
            next();
        } else {
            res.status(400).json({ message: 'User Not Found' });
        }
    })

    .catch(() => res.status(400).json({ message: 'Invalid Id' }));
};

function validateProject(req, res, next) {
    if (!req.body) {
            res.status(400).json({ message: 'project data not found' });
        } else if (!req.body.name) {
            res.status(400).json({ message: 'Need project name' });
        }
        next();
};

function validateAction(req, res, next) {
    if (!req.body) {
            res.status(400).json({ message: 'User data not found' });
        } else if (!req.body.text) {
            res.status(400).json({ message: 'Need Text' });
        }
        next();
};

module.exports = router;
