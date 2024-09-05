const router = require('express').Router();
const { BlogPost } = require('../models');
const authMiddleware = require('../helpers/authMiddleware');

router.post('/', authMiddleware, async (req, res) => {
    try {
        const { title, content } = req.body;

        if (!title || !content) {
            return res.status(400).json({ message: 'Add a Title and Content.' });
        }

        const newPost = await BlogPost.create({
            title: title,
            content: content,
            user_id: req.session.user_id, 
            date_created: new Date()
        });

        res.status(201).json(newPost);

    } catch {
        console.error('Error creating post:', error);

        res.status(500).json({
            message: 'Error creating post'
        })
    }
});

module.exports = router;
