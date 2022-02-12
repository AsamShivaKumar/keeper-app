import React from "react";
import Header from "./Header.jsx";
import Footer from "./Footer.jsx";
import Note from "./Note.jsx";
import NewNote from "./newNote.jsx";

function App(){

    const [notes, setNotes] = React.useState([]);

    function newNote(note){
        
        setNotes(prevNotes=>{
            return [...prevNotes,note];
        });
    }
    
    function createNote(note){
            return (
                <Note
                   key={Math.random()}
                   title={note.title}
                   content={note.content}
                   deleteNote={deleteNote}
                />
            );
    }

    function deleteNote(note){
             setNotes(prevNotes => {
                   return notes.filter((noteInNotes) => {
                    return (noteInNotes.title != note.title || noteInNotes.content != note.content);
                 });
             });
    }

        return (
        <div>
            <Header />
            <NewNote onAdd={newNote}/>
            {notes.map(createNote)}
            <Footer />
        </div>
        )
}

export default App;