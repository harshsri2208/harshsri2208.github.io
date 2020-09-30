const router = require('express').Router();
var nodemailer = require('nodemailer');

// If you get `Application-specific password required` error, create and add your google application specific password for gmail instead of your actual password
var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'your_mail@gmail.com',
        pass: 'your_pass'
    }
});

// URL path and type of HTTP Request
router.route('/').get((req, res) => {
    
    // Which HTML file to render
    res.render('index');

});

router.route('/about_me').get((req, res) => {
    res.render('about_me');
});

router.route('/elements').get((req, res) => {
    res.render('elements');
});

router.route('/generic').get((req, res) => {
    res.render('generic');
});

router.route('/contact_me').get((req, res) => {
    res.render('contact_me');
});

router.route('/twitter_error').get((req, res) => {
    res.render('twitter_error');
});

// Tested OK!
router.post('/mail', async(req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    const message = req.body.message;
    var mailOptions = {
        from: 'Firstname Lastname <yourmail@gmail.com>',
        to: 'yourmail@gmail.com',
        subject: 'Notification from Portfolio Website | New Contact Request',
        text: `New message from ${name} <${email}>.\nHere's the message:\n\"${message}\"`
    };
    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
            res.render('index');
        } else {
            res.render('index');
        }
    });
});

module.exports = router;