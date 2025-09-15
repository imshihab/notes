import FolderContainer from "./FolderContainer"
import NotesContainer from "./NotesContainer"

const NotesNavigation = () => {
    return (
        <div className="bg-transparent !w-[296px] !min-w-[280px] !max-w-[320px] h-[calc(100vh-64px)] mt-2 rounded-t-2xl relative overflow-hidden">
            <FolderContainer />
            <NotesContainer />
        </div>
    )
}

export default NotesNavigation
