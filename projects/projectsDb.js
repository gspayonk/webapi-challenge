const dB = require('../data/dbConfig.js');
const booleanMap = require('../data/booleanMap');

module.exports = {
    get,
    getById,
    getUserProjects,
    insert,
    update,
    remove,
};

function get() {

    return dB('projects');
}

function getById(id) {
    let query = dB('projects as p');

    if (id) {
        query.where('p.id', id).first();

        const promises = [query, this.getProjectActions(id)];

        return Promise.all(promises).then(function(results) {
        let [project, actions] = results;

        if (project) {
            project.actions = actions;

            return booleanMap.projectToBody(project);
        } else {
            return null;
        }
    });
}
}

function getUserProjects(projectId) {

    return dB('actions')

    .where('project_id', projectId)

    .then(actions => actions.map(action => booleanMap.actionToBody(action)));
}

function insert(project) {

    return dB('projects')

    .insert(project)

    .then(allid => {
        return getById(allid[0]);
    });
}

function update(id, changes) {

    return dB('projects')

    .where({ id })

    .update(changes);
}

function remove(id) {

    return dB('projects')

    .where('id', id)
    
    .del();
}
