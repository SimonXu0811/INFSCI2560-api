const guestService = require('../Services/guestService');

exports.getAllItems = (req, res) => {
    guestService.getAllItems((err, items) => {
        if (err) {
            res.status(401).send(err);
        }else if (!items) {
            res.status(401).send({message: 'No Item is found!'});
        }else {
            res.send(items);
        }
    })
};

exports.searchItems = (req, res) => {
    guestService.searchItems(req.params.category, req.params.name, (err, items) => {
        if (err) {
            res.status(401).send(err);
        } else if (!items) {
            res.status(401).send({message: 'No Item is found!'});
        } else {
            res.send(items);
        }
    })
};