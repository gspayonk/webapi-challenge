function validateProjectId(res, req, next) {

    const { id } = req.params;

    id
        ? (req.project = req.body)
        : res.status(400).json({ message: 'Wrong project ID' });

    next();
}