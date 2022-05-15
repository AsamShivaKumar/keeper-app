import React from 'react';

function NewNote(props){

        const [note, setNote] = React.useState({
            title: "",
            content: ""
        });
        
        
        function handleChange(event){
            const {name,value} = event.target;

                 setNote(prevNote =>{
                     return {
                         ...prevNote,
                         [name]: value
                     }
                 });
        }

         return (
             <form onSubmit={(event)=>{
                 props.onAdd(note);
                 setNote({
                     title: "",
                     content: ""
                 });
                 event.preventDefault();
             }} className="newNote">
                  <input onChange={handleChange} placeholder="Title..." name="title" value={note.title}></input>
                  <textarea onChange={handleChange} placeholder="Note content..."  name="content" value={note.content}></textarea>
                  <button type="submit">Add</button>
             </form>
         );
}

export default NewNote; 