import FolderContainer from "./FolderContainer"
import NotesContainer from "./NotesContainer"

const NotesNavigation = () => {
    return (
        <div className="bg-transparent !w-[296px] !min-w-[280px] !max-w-[320px] h-[calc(100vh-64px)] relative overflow-hidden">
            <FolderContainer />
            <NotesContainer />
        </div>
    )
}

export default NotesNavigation
