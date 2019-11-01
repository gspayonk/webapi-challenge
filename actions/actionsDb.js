const dB = require('../data/dbConfig.js');
const booleanMap = require('../data/booleanMap');

module.exports = {
    get,
    getById,
    insert,
    update,
    remove,
};

function get() {
    let query = dB('actions');

    if (id) {
        return query
            .where('id', id)
            .first()
            .then(action => {
                if (action) {
                return booleanMap.actionToBody(action);
            } else {
            return action;
            }
        });
    }

    return query.then(actions => {
        return actions.map(action => booleanMap.actionToBody(action));
    });


    // return dB('actions');
}

function getById(id) {
    return dB('actions')
        .where({ id })

        .first();
}

function insert(action) {
    return dB('actions')
        .insert(action)
        .then(allid => {
        return getById(allid [0]);
    });
}

function update(id, changes) {
    return dB('actions')
        .where({ id })
        .update(changes);
}

function remove(id) {
    return dB('actions')
        .where('id', id)
        .del();
}
