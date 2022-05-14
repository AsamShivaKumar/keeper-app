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
                <button type="submit"><i class="fa fa-trash" aria-hidden="true"></i></button>
            </form>
        );
}

export default Note;