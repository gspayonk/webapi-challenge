const actiondB = require('../data/helpers/actionModel');
const router = require('express').Router();
const { get, getById, getProjectActions, insert, update, remove } = actiondB;


router.get('/', (req, res) => {
  actiondB
    get()
    .then(actions => res.status(200).json(actions));

});

router.get('/:id', validateActionId, (req, res) => {
    const {id} = req.params.id;

    actiondB

    getById(id)

    .then(action => {
        res.status(200).json(action);
    })

    .catch(() => res.status(500).json({ err: err }));

});

router.delete('/:id', validateActionId, (req, res) => {
    const {id}  = req.params.id;

    actiondB

    remove(id)

    .then(action => {
        res.status(200).json(action);
    })

    .catch(err => res.status(500).json({ err: err }));

});

router.put('/:id', validateActionId, (req, res) => {
    const {id} = req.params.id;
    const {action} = req.body;
    
    actiondB

    update(id, {action})

    .then(action => {res.status(200).json(action);})

    .catch(err => res.status(500).json({err: err}));

});

// custom middleware
function validateActionId(req, res, next) {
    const {id} = req.params;

    getById(id)

        .then(action => {
            if (action) {req.action = action;

        next();
        } else {
            res.status(400).json({ message: 'Post not found' });
            }
        })
        
        .catch(() => res.status(400).json({ message: 'Post id not found' }));

};

module.exports = router;