const express = require("express")
const path = require("path") // we need to include the path package to get the file path for html
const app = express()
const PORT = process.env.PORT || 3001;
const database = require("./db/db.json")

const fs = require('fs')
const { json } = require("express");
//middleware
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(express.static("public"))

//routing
app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "public/notes.html"))
})
const readNotes = () => {
    const notes = fs.readFileSync (path.join(__dirname, 'db/db.json'))
return JSON.parse(notes)
}
app.get("/api/notes", (req, res) => {
    const notes = readNotes ()
    res.json(notes)
   
    
})



// app.post("api/notes", (req, res) => {
//     res.sendFile(path.join(__dirname, "public/notes.html"))
// })
app.post("/api/notes",(req, res) => {
    const notes = readNotes ();
    const note = req.body;
    console.log(note);
    notes.push(note);
    fs.writeFileSync(path.join(__dirname, 'db/db.json'),JSON.stringify(notes))
    res.json(note);
})
//listening
app.listen(PORT, ()=>{
    console.log("listening to Port")
})

