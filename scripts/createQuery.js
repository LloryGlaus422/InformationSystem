const query = require('./ModelInquery.js');

module.exports.create = (req, res) => {
    const inquired = new query({
        name: req.body.name,
        email: req.body.email,
        contact: req.body.contact,
        address: req.body.address,
        event: req.body.event,
        message:req.body.message
    });

    inquired.save()
        .then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Error!"
            });
        });

}
