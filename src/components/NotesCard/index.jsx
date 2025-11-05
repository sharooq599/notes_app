import { useNotes } from "../../context/notes-context";
import { findNotesInArchive } from "../../utils/findNotesinArchive";
import { useLocation } from "react-router-dom";

export const NotesCard = ({ id, title, text, isPinned, isImportant }) => {

    const { notesDispatch, archive } = useNotes();
    const location = useLocation();
    const page = location.pathname.split("/")[1];
    const isNotesInArchive = findNotesInArchive(archive, id)


    const onPinClick = (id) => {
        !isPinned ? notesDispatch({
            type: 'PIN',
            payload: { id }
        }) : notesDispatch({
            type: 'UNPIN',
            payload: { id }
        })
    };

    const onArchiveClick = (id) => {
        !isNotesInArchive ? notesDispatch({
            type: 'ADD_TO_ARCHIVE',
            payload: { id }
        }) : notesDispatch({
            type: 'REMOVE_FROM_ARCHIVE',
            payload: { id }
        })
    };

    const onDeleteClick = (id) => {
        if (page === "important") {
            notesDispatch({
                type: "MOVE_TO_BIN_FROM_IMPORTANT",
                payload: { id },
            });
        } else if (page === "archive") {
            notesDispatch({
                type: "MOVE_TO_BIN_FROM_ARCHIVE",
                payload: { id },
            })
        }
        else {
            notesDispatch({
                type: "DELETE_NOTE",
                payload: { id },
            });
        }
    }

    const onImportantClick = (id) => {
        if (page === "important") {
            notesDispatch({
                type: "REMOVE_FROM_IMPORTANT",
                payload: { id },
            });
        } else {
            notesDispatch({
                type: "ADD_TO_IMPORTANT",
                payload: { id },
            });
        }
    };


    return (
        <div className="w-56 border border-neutral-800 p-2 rounded-md w-[300px]" key={id}>
            <div className="flex justify-between border-b-2">
                <p>{title}</p>
                {
                    page !== "important" && !isNotesInArchive && (<button onClick={() => onPinClick(id)}>
                        <span className={isPinned ? 'material-icons' : 'material-icons-outlined'}>
                            push_pin
                        </span>
                    </button>

                    )}
            </div>

            <div className="flex flex-col">
                <p>{text}</p>
                {isImportant && (
                    <span className="text-xs text-red-500 font-bold mt-3 block">Important</span>
                )}

                <div className="ml-auto flex gap-1 mt-2">
                    {page !== "important" && (
                        <button onClick={() => onArchiveClick(id)}>
                            <span class={isNotesInArchive ? 'material-icons' : "material-icons-outlined"}>
                                archive
                            </span>
                        </button>
                    )}
                    {page !== "archive" && (
                        <button onClick={() => onImportantClick(id)}>
                            <span className={isImportant ? "material-icons" : "material-icons-outlined"}>label_important</span>
                        </button>
                    )}

                    <button onClick={() => onDeleteClick(id)}>
                        <span class="material-icons-outlined">
                            delete_outline
                        </span>
                    </button>

                </div>
            </div>
        </div>
    )
}