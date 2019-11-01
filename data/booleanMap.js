module.exports = {
    intBoolean,
    booleanInit,
    projectBody,
    actionBody,
};

function intBoolean(int) {
    return int === 1 ? true : false;
}

function booleanInit(bool) {
    return bool === true ? 1 : 0;
}

function projectBody(project) {
    const result = {
    ...project,
    completed: intToBoolean(project.completed),
    };

    if (project.actions) {
        result.actions = project.actions.map(action => ({
            ...action,
            completed: intToBoolean(action.completed),
        }));
    }

    return result;
}

function actionBody(action) {
    return {
        ...action,
        completed: intToBoolean(action.completed),
    };
}