function validateActionId(res, req, next) {

    const { id } = req.params;

    id
        ? (req.action = req.body)
        : res.status(400).json({ message: 'Wrong action ID' });

    next();
}