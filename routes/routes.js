const { json } = require('express')
const fs = require('fs');
const path = require('path')


module.exports = (app) => {
    fs.readFile('./db/db.json', 'utf-8', (err, data) => {

        // Sets up routs for api /Sets up GET 

        if (err) throw err
        const notes = JSON.parse(data)

        app.get('/api/notes', function (req, res) {

            res.json(notes)
        })

        // Sets up POST 
        app.post('./api/notes', function (req, res) {

            // New Note for db json
            const newNote = req.body
            const noteWithId = { ...newNote, id: notes.length + 1 }
            note.push(noteWithId)
            updatedb()
            res.json(req.body)  

            return console.log('Added new note:' + newNote.title)
        })

        // Gets note 
        app.get('./api/notes/:id', function (req, res) {
            res.json(notes.get[req.params.id])
        })

        // Deletes note from specific id
        app.delete('./api/notes/:id', function (req, res) {

            const id = req.params.id
            const indexOfNotes = notes.findIndex((x) => x.id === parseInt(id))

            updatedb()
            res.json(res.body.id)
            console.log('Deleted note:' + req.params.id)
        })

        app.get('./notes', function (req, res) {
            res.sendFile(path.join(__dirname, '../public/notes.html'))
        })

        function updatedb() {
            fs.writeFile('./db/db.json', JSON.stringify(notes, '\t', (err) => {
                if (err) throw err

                return true
            }))
        }

    })
};
