import { Navbar } from "../../components/Navbar";
import { SideBar } from "../../components/Sidebar";
import { useNotes } from "../../context/notes-context"



export const Bin = () => {
    const { bin, notesDispatch } = useNotes();

    const onRestore = (id) => {
        notesDispatch({ type: "RESTORE_NOTE", payload: { id } });
    };

    const onDeleteForever = (id) => {
        notesDispatch({ type: "DELETE_FOREVER", payload: { id } });
    };

    return (
        <>
           
      <Navbar />
      <main className="flex">
        <SideBar />

        <div className="flex-1 px-8 mt-8">
          {bin?.length > 0 ? (
            <div className="flex flex-wrap gap-6">
              {bin.map(({ id, title, text }) => (
                <div
                  key={id}
                  className="border border-red-300 rounded-md p-4 w-[300px] bg-white shadow-md hover:shadow-lg transition-shadow duration-200 flex flex-col justify-between"
                >
                  <div>
                    <h3 className="font-semibold text-lg text-gray-800">{title}</h3>
                    <p className="text-gray-600 mt-1">{text}</p>
                  </div>

                  <div className="flex justify-between items-center mt-4">
                    <button
                      className="text-green-600 hover:text-green-800 font-medium"
                      onClick={() => onRestore(id)}
                    >
                      Restore
                    </button>
                    <button
                      className="text-red-500 hover:text-red-700 font-medium"
                      onClick={() => onDeleteForever(id)}
                    >
                      Delete Forever
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-600 text-lg">Bin is empty.</p>
          )}
        </div>
      </main>
    </>
);
};