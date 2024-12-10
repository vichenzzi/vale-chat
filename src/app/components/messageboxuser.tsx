"use client"
import { SendHorizontal } from "lucide-react"
import { useContext, useState } from "react"
import supabase from "../supabase/client"
import { userData } from "../page"
import { UserContext } from "./utils/usercontext"

export const MessageBoxUser = () => {

    const data = useContext<userData | undefined>(UserContext);
    
    const [ message, setmessage ] = useState<string>("")

    const sendMessage = async () => {
        if(message.length > 0) {
            try {
                const { data: BigData, error } = await supabase.from('messages').insert({
                    message,
                    username: data?.username,
                    image: data?.profile_src,
                });

                setmessage("")
                
            }catch(error){
                console.error(error)
            }
        }
    }
    return (
        <div className="flex gap-2 items-center w-full justify-center">
            <form action="" className="w-full flex gap-2 items-center justify-center" onSubmit={(e) => {
                    e.preventDefault()
                    if(message.length > 1) {
                    sendMessage()
                }
            }}>
            <input
            onChange={(e) => {
                setmessage(e.target.value);
            }}
            value={message}
            type="text" className="ring-0 focus:ring-4 transition-all ease-in-out ring-slate-200 w-full text-black shadow-md bg-white rounded-lg px-2 py-3 border border-solid border-slate-200 outline-none text-sm" placeholder="Enter a message here ..."/>
            <button type="submit" disabled={message.length < 1} className="enabled:bg-primary ease-in-out ring-0 ring-indigo-200 focus:ring-4 disabled:bg-indigo-400 enabled:hover:bg-indigo-700 transition-all lineal rounded-lg text-base p-2 border-none outline-none">
                <SendHorizontal 
                size={18}
                />
            </button>
            </form>
        </div>
    )
}