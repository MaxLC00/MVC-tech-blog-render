const router = require('express').Router();
const { Comment } = require('../models');

router.post('/comment', async (req, res) => {
    try {
        const { post_id, content } = req.body;

        if (!req.session.loggedIn) {
            return res.status(401).redirect('/login');
        }

        await Comment.create({
            post_id,
            content,
            userId: req.session.user_id
        });

        res.redirect(`/posts/${post_id}`);

    } catch (error) {
        console.error('Error creating comment:', error);
        res.status(500).json({
            message: 'Error creating comment'
        });
    }
});

module.exports = router;
