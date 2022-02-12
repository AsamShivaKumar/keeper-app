import React from "react";

function Note(props){

        return (
            <form className="note" onSubmit={event => {
                props.deleteNote({
                    title: props.title,
                    content: props.content
                });
                event.preventDefault();
            }}>
                <h1>
                    {props.title}
                </h1>
                <p>
                    {props.content}
                </p>
                <button type="submit">Delete</button>
            </form>
        );
}

export default Note;