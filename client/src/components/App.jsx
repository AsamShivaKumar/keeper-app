import React from "react";
import Header from "./Header.jsx";
import Footer from "./Footer.jsx";
import Note from "./Note.jsx";
import NewNote from "./newNote.jsx";
import Axios from "axios";

function App(props){

    const [notes, setNotes] = React.useState(props.notes);

    const cols = ["#0AA1DD","#EE5007","#F73D93","#00C897","#4700D8","#F0A500"];

    function newNote(note){
        
        setNotes(prevNotes=>{
            return [note,...prevNotes];
        });

        Axios.post("http://localhost:5000/newNote", {
            username: props.user,
            title: note.title,
            content: note.content
        })
    }
    
    function createNote(note){
             const style = { backgroundColor: cols[notes.indexOf(note)%6] };
            return (
                <Note
                   sty={style}
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

             Axios.post("http://localhost:5000/deleteNote",{
                title: note.title,
                content: note.content
             })
    }

        return (
        <div>
            <Header />
            <NewNote onAdd={newNote}/>
            <div className="container">
                {notes.map(createNote)}
            </div>
        </div>
        )
}

export default App;