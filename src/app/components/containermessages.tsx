import { ReactNode, useEffect, useRef } from "react";
import { InterfaceMessage } from "./utils/messageuser";


interface BoxContainerMessages {
    children: ReactNode,
    reload: Array<InterfaceMessage>
}
export const ContainerMessagesBox = ( { children, reload}: BoxContainerMessages ) => {

    useEffect(() => {
        
        function handleScroll() {
            let objDiv = document.getElementById("messages_container_box");
            console.log('send')
            objDiv!.scrollTop = objDiv!.scrollHeight
        }

        handleScroll()


    }, [reload])

    return (
        <section id={"messages_container_box"} className="flex overflow-auto h-full items-start justify-start flex-col w-full">
            {children}
        </section>
    )
}