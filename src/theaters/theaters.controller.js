const service = require("./theaters.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

// Return all theaters //
async function list(req, res) {
    const data = await service.list();
    res.json({ data });
}

module.exports = {
    list: asyncErrorBoundary(list),
}