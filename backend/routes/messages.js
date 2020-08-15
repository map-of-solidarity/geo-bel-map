const express = require('express');
const router = express.Router();
const Messages = require('../models/messages')

// get all messages / post message
router.route('/messages')
    .get(async(req,res) => {
        try {
            const messages = await Messages.find({})
            await res.json(messages)
            res.end()
        } catch (e) {
            await res.status(500).send(e)
            res.end()
        }
    })
    .post(async(req,res) => {
        const {title, text} = req.body
        if (title && text) {
            const newMessage = new Messages({
                title: title,
                text: text,
                created: Date.now(),
                updated: Date.now()
            })
            try {
                await newMessage.save()
                await res.status(204)
                res.end()
            } catch (e) {
                await res.status(500).send(e)
                res.end()
            }
        } else {
            await res.status(500).send('Title or text of message are undefined')
            res.end()
        }
    })

// get/delete message by id
router.route('/messages/:id')
    .get(async(req,res) => {
        const { id } = req.params
        try {
            const message = await Messages.findById(id)
            await res.json({message})
            res.end()
        } catch (e) {
            await res.status(500).send(e)
            res.end()
        }
    })
    .delete(async(req,res) => {
        const { id } = req.params
        try {
            await Messages.findOneAndDelete({ _id: id });
            await res.status(204)
            res.end()
        } catch (e) {
            await res.status(500).send(e)
            res.end()
        }
    })

module.exports = router;