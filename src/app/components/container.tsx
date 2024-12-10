import { ReactNode } from "react"

export const Container = ( children: { children: ReactNode } ) => {


    return (
        <div className="bg-secondary w-full h-full fixed left-0 top-0">
            <section className="flex flex-col items-center justify-between bxg-purple-400 mx-auto min-w-chatMin max-h-full h-screen w-chatBox">
            
            {children.children}

            </section>
        </div>
    )
}