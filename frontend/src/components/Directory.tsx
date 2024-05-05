import { Note } from "@/types"

interface DirectoryProps {
    userNotes: Array<Note> | undefined
    selectionCallback : React.Dispatch<React.SetStateAction<any>>
    createNote: () => void
}

export default function Directory(props : DirectoryProps) {

    if (props.userNotes) {
        return (
            <div className="bg-[#F3F2FF] flex flex-col h-full">
                <div className="w-11/12 mx-auto flex flex-col">
                    <p className="text-2xl ml-5 mt-5 font-bold">All Notes</p>
                    <button className="bg-[#8BA5FF] mx-auto py-3 px-36 my-4" onClick={() => props.createNote()}>Add New Note</button>
                </div>
                <ul className="border border-t-slate-300 overflow-y-scroll h-full">
                    { props.userNotes.map(({ id, title, content }, idx) => (
                        <li className="border border-b-slate-300 h-32 hover:bg-[#ebe9ff]" key={idx}>
                            <button className="flex flex-col w-full h-full" onClick={() => props.selectionCallback(id)}>
                                <p className="font-bold ml-5 mt-4">{title}</p>
                                <p className="text-slate-400 ml-5 mt-5 max-w-80 line-clamp-2 text-left">{content}</p>
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        )
    }
}