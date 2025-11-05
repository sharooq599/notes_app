
import { v4 as uuid } from 'uuid';

export const notesReducer = (state, { type, payload }) => {
    switch (type) {
        case 'TITLE':
            return {
                ...state,
                title: payload
            }
        case 'TEXT':
            return {
                ...state,
                text: payload
            }
        case 'ADD_NOTE':
            return {
                ...state,
                notes: [...state.notes, { text: state.text, title: state.title, id: uuid(), isPinned: false }]
            }
        case 'CLEAR-INPUT':
            return {
                ...state,
                title: '',
                text: ''
            }
        case 'PIN':
            return {
                ...state,
                notes: state.notes.map(note => note.id === payload.id ? { ...note, isPinned: true } : note)
            }
        case 'UNPIN':
            return {
                ...state,
                notes: state.notes.map(note => note.id === payload.id ? { ...note, isPinned: false } : note)
            }
        case 'ADD_TO_ARCHIVE':
            return {
                ...state,
                archive: [...state.archive, state.notes.find(({ id }) => id === payload.id)],
                notes: state.notes.filter(({ id }) => id !== payload.id)
            }
        case 'REMOVE_FROM_ARCHIVE':
            return {
                ...state,
                notes: [...state.notes, state.archive.find(({ id }) => id === payload.id)],
                archive: state.archive.filter(({ id }) => id !== payload.id)
            }
        case 'DELETE_NOTE':
            return {
                ...state,
                bin: [...(state.bin || []), state.notes.find(({ id }) => id === payload.id)],
                notes: state.notes.filter(({ id }) => id !== payload.id)
            }
        case 'RESTORE_NOTE':
            return {
                ...state,
                notes: [...state.notes, state.bin.find((n) => n.id === payload.id),],
                bin: state.bin.filter((n) => n.id !== payload.id),
            }
        case "DELETE_FOREVER":
            return {
                ...state,
                bin: state.bin.filter((n) => n.id !== payload.id),
            };
        case "ADD_TO_IMPORTANT": {
            const note = state.notes.find((n) => n.id === payload.id);
            if (!note) return state;
            return {
                ...state,
                notes: state.notes.filter((n) => n.id !== payload.id),
                important: [...state.important, { ...note, isImportant: true }],
            };
        }
        case "REMOVE_FROM_IMPORTANT": {
            const note = state.important.find((n) => n.id === payload.id);
            if (!note) return state;
            return {
                ...state,
                important: state.important.filter((n) => n.id !== payload.id),
                notes: [...state.notes, { ...note, isImportant: false }],
            };
        }
        case "MOVE_TO_BIN_FROM_IMPORTANT":
            return {
                ...state,
                important: state.important.filter(note => note.id !== payload.id),
                bin: [...state.bin, state.important.find(note => note.id === payload.id)],
            };
        case "MOVE_TO_BIN_FROM_ARCHIVE":
            return {
                ...state,
                bin: [...state.bin, state.archive.find(({ id }) => id === payload.id)],
                archive: state.archive.filter(({ id }) => id !== payload.id),
            };



        default:
            return state
    }
}