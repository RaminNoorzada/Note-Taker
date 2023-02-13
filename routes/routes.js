const {json} = require('express');
const fs = require('fs');
const path = require('path');

module.exports = (app) => {
    fs.readFile('./db/db.json', 'utf8', (err, data) => {
        if (err) throw err

        // Perse the data as JSON
        const notes = JSON.parse(data)
        app.get('/api/notes', function (req, res) {
            res.json(notes)  //Return notes as json
        })
        // Gets note with id
        app.get('./api/notes/:id', function (req, res) {
            res.json(notes)
        })
        // Sets up POST 
        app.post('/api/notes', function (req, res) {
            // New Note for db json
            const newNote = req.body
            const noteWithId = { ...newNote, id: notes.length + 1 }
            notes.push(noteWithId)
            updateDb()
            res.json(req.body)  //Dusplays note on click

            return console.log('Added new note:' + newNote.title)
        })

        app.get('/api/notes/:id', function(req, res) {
            res.json(notes.get[req.params.id])
        } )

        // Deletes note from specific id
        app.delete('/api/notes/:id', function (req, res) {

            const id = req.params.id
            const indexOfNotes = notes.findIndex((x) => x.id === parseInt(id))
                notes.splice(indexOfNotes, 1)
            updateDb()
            res.json(req.body.id)    //Delets note
            console.log('Deleted note:' + req.params.id)
        })
        
        
        app.get('/notes', function (req, res) {
            res.sendFile(path.join(__dirname, '../public/notes.html'))
        })

        function updateDb() {       //Updates addetion or deletion
            fs.writeFile('./db/db.json', JSON.stringify(notes, '\t'), (err) => {
                if (err) throw err

                return true
            })
        }

    })
};
