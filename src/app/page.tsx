"use client"

import Image from "next/image";
import { LoginRegister } from "./components/login-register";
import { Container } from "./components/container";
import { MessageBoxUser } from "./components/messageboxuser";
import { ContainerMessagesBox } from "./components/containermessages";
import { InterfaceMessage, MessageUser } from "./components/utils/messageuser";
import { createContext, useEffect, useState } from "react";
import supabase from "./supabase/client";
import { UserContext } from "./components/utils/usercontext";

export interface userData {
  username: string,
  profile_src: string
}

export default function Home() {

  const [ userData, setUserData ] = useState<userData | undefined>(undefined)
  const [reload, setreload] = useState<number>(0);
  
  const [ DataMessages, SetMessagesData ] = useState<null | Array<InterfaceMessage> | any>([]);

  useEffect(() => {
     
    function checkUser() {
      let localstorage_user = localStorage.getItem('user');
  
      if (localstorage_user) {
        localstorage_user = atob(localstorage_user);
        setUserData(JSON.parse(localstorage_user));        
      } else {
        localStorage.setItem('user', btoa('{"username": "","profile_src": "" }'));
      }
    }
  
    checkUser();

    const channel = supabase.channel('messages')
    .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'messages' }, (data) => {
      console.log(data);
      const dataRecibed = data.new;
      
      if(dataRecibed) {
        SetMessagesData((prevMessages: any) => [
          ...prevMessages,
          data.new,       
        ]);
      }

    }).subscribe()

    return () => {
      channel.unsubscribe();
    }

  }, [reload])


  return (
     <>
   {userData?.username === "" &&
    <div className="z-50 w-full h-full  left-0 top-0 fixed bg-transparent backdrop-blur-sm flex items-center justify-center">
     <LoginRegister
    setvalue={setreload}
    value={reload}
    />
    </div>
    }

    <button
    onClick={() => {
      localStorage.removeItem('user');
      setreload(reload + 1)
      SetMessagesData([])
    }
  }
  className="right-8 top-2 fixed z-[500] text-xs font-medium text-slate-950 rounded-lg shadow-sm rounded-lx px-3 py-2 cursor-pointer bg-white border-slate-200 outline-none">
      Log Out
    </button>
    
    <UserContext.Provider value={userData}>
    <Container>
      <ContainerMessagesBox reload={DataMessages}>
      {DataMessages?.map((item: InterfaceMessage, index: number) => (
         <MessageUser
         key={index}
         image={item.image}
         message={item.message}
         created_at={item.created_at}
         username={item.username}
         />
        ))}

      </ContainerMessagesBox>

      <div className="w-full">
      <MessageBoxUser />
      <p className="text-slate-400 text-sm text-center py-4">ValeChat Inc. is not responsible for messages posted by users.</p>
      </div>
    </Container>
    </UserContext.Provider>
    </>
    );
  }