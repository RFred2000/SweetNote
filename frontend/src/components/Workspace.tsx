
interface WorkspaceProps {
    titleBody: string | undefined;
    setTitleBody: React.Dispatch<React.SetStateAction<any>>;
    contentBody: string | undefined;
    setContentBody: React.Dispatch<React.SetStateAction<any>>;
    saveNote: () => void
    deleteNote: () => void
}

export default function Workspace(props : WorkspaceProps) {


    if (typeof props.titleBody != "undefined" && typeof props.contentBody != "undefined") {
        return (
            <div className="flex flex-col h-full">
                <div className="flex flex-row w-11/12 mx-auto py-3 border border-x-0 border-t-0 border-b-slate-400 h-fit">
                    <input 
                        className="w-full ml-5 mt-3 text-2xl outline-none"
                        value={props.titleBody}
                        onChange={e => props.setTitleBody(e.target.value)}
                        type="text" 
                    />
                    <button className="h-11 w-11" onClick={() => props.saveNote()}>
                        <img className="h-fit w-fit opacity-35 hover:opacity-100" src="/SaveIcon.png" alt="Didn't work" />
                    </button>
                    <button className="h-11 w-11 ml-5" onClick={() => props.deleteNote()}>
                        <img className="h-fit w-fit opacity-65 hover:opacity-100" src="/DeleteIcon.png" alt="Didn't work" />
                    </button>
                </div>
                <div className="h-full w-11/12 mx-auto mt-5">
                    <textarea 
                        className="w-full h-full ml-5 outline-none"
                        value={props.contentBody}
                        onChange={e => props.setContentBody(e.target.value)}
                        name="content" 
                        id="1" 
                    />
                </div>
            </div>
        )
    }
}