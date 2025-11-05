import { Navbar } from "../../components/Navbar";
import { useNotes } from "../../context/notes-context"
import { SideBar } from "../../components/Sidebar";
import { NotesCard } from "../../components/NotesCard";


export const Important = () => {
    const { important } = useNotes();

    return (
        <>
            <Navbar />
            <main className="flex gap-3">
                <SideBar />
                <div className="flex flex-wrap gap-6 w-screen mt-7">
                    {important?.length > 0 ? (
                        important.map(({ id, title, text, isPinned, isImportant }) => (
                            <div key={id} className="relative">
                                <NotesCard
                                    id={id}
                                    title={title}
                                    text={text}
                                    isPinned={isPinned}
                                    isImportant={isImportant}
                                    page = "important"
                                />
                              
                            </div>
                        ))
                    ) : (
                        <p className="ml-5 mt-5">No import notes yet.</p>
                    )}
                </div>
            </main>
        </>
    );
};