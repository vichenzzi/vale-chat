"use client";
import { Pencil } from "lucide-react";
import { motion } from "motion/react"
import { Dispatch, SetStateAction, useRef, useState } from "react";

interface Props {
    setvalue: Dispatch<SetStateAction<number>>,
    value: number
}
export const LoginRegister = ( { setvalue, value }: Props ) => {
    
    const [ nickname, setnickname ] = useState("");

    const [ image, setimage ] = useState<string>("");

    const imageRef = useRef<null | HTMLInputElement>(null)

    const getUrlImage = async (file: File) => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();

            fileReader.readAsDataURL(file);
            
            fileReader.onload = () => {
                console.log(fileReader.result);
                setimage(JSON.stringify(fileReader.result).replaceAll('"', ' '))
            };

            fileReader.onerror = (error) => {
                reject(error)
            }
        })
    }

    return (
        <motion.div
        initial={ { scale: 0 } }
        animate={ { scale: 1 } }
        transition={{ ease: "easeIn", duration: 0.2 }}
        className="shadow-sm w-fit bg-white border-solid border border-slate-300 p-3 rounded-xl"> 
            <form onSubmit={(e) => {
                e.preventDefault();
                if(nickname.length > 5 && image.length > 3) {
                const u$erData = {
                    username: nickname,
                    profile_src: image
                }
                localStorage.setItem('user', btoa(JSON.stringify(u$erData)))
                setvalue(value + 1);
                }
            }} action="#">
               <div className="flex flex-col items-center justify-center">
               <h2 className="m-0 text-gray-950 font-semibold text-base">¡Welcome!</h2>
               <p className="m-0 text-slate-500 font-medium text-sm">You need register with a nickname to use the public chat!</p>
               </div>
               
                <div className=" w-full h-fit flex items-center justify-center my-2">
                <button
                onClick={() => {
                    if(imageRef.current) {
                        imageRef.current.click()
                    }
                }}
                style={ {
                    backgroundImage: `url(${image})`
                } }
                className="bg-cover bg-no-repeat bg-center w-16 h-16 shadow-sm bg-slate-200 relative overflow-hidden rounded-lg cursor-pointer">
                <input
                ref={imageRef}
                onChange={(e) => {
                    if(e.target.files && e.target.files[0]) {
                        getUrlImage(e.target.files[0])
                    }
                }}
                type="file" accept=".jpg, .png, .webp, .jpeg" hidden/>
                <span className="bg-slate-600 w-full h-full absolute left-0 top-0 ease transition-all opacity-0 hover:opacity-20"/>
                <Pencil
                className="text-slate-400 mx-auto"
                />
                </button>
                </div>

               <input required minLength={6} value={nickname} onChange={(e) => {setnickname(e.target.value)}} id="nickname" type="text" className="w-full text-black shadow-md bg-white rounded-lg p-2 border border-solid border-slate-200 outline-none text-sm" placeholder="Nickname ..."/>

               <button className="my-2 shadow-md bg-primary rounded-lg p-2 font-medium text-sm text-center w-full">
                Enter Chat
               </button>
            </form>
        </motion.div>
    )
}