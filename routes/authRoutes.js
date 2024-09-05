const router = require('express').Router();
const { User } = require('../models');

router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }
    res.render('login');
});

router.get('/signup', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
    } else {
        res.render('signup');
    }
});

router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        const userData = await User.findOne({
            where: { 
                username 
            }
        });

        if (!userData) {
            return res.status(401).send('Invalid username or password');
        }

        const validPassword = await userData.checkPassword(password);

        if (!validPassword) {
            return res.status(401).send('Invalid username or password')
        }

        req.session.user_id = userData.id;
        req.session.username = userData.username;
        req.session.loggedIn = true;

        res.redirect('/');
    } catch (error) {
        console.error('Error while logging in:', error);
        res.status(500).send('Internal Server Error');
    }
});

router.get('/logout', (req, res) => {
    req.session.destroy((error) => {
        if (error) {
            console.error('Cannot destroy session:', error);

            return res.status(500).send('Failed to logout');
        }
        res.redirect('/');
    }) 
})

module.exports = router;

