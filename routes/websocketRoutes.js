const websocketController = require('../controllers/websocketController');

module.exports = (io) => {
    websocketController(io);
};
