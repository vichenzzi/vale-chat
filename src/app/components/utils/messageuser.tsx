import { userData } from "@/app/page";
import { useContext } from "react";
import { UserContext } from "./usercontext";

export interface InterfaceMessage {
    message: string,
    username: string
    image: string,
    created_at: string,
};

export const MessageUser = ( data: InterfaceMessage ) => {

    const user = useContext<userData | undefined>(UserContext);

    const matches = user?.username === data.username

    function timeAgo(dateString: string): string {
        const now = new Date();
        const past = new Date(dateString);
      
        // Verifica si `past` es una fecha válida
        if (isNaN(past.getTime())) {
          return "Fecha inválida";
        }
      
        // Diferencia en milisegundos
        const diffMs = now.getTime() - past.getTime();
      
        // Conversión de milisegundos a segundos, minutos, horas y días
        const diffSeconds = Math.floor(diffMs / 1000);
        const diffMinutes = Math.floor(diffSeconds / 60);
        const diffHours = Math.floor(diffMinutes / 60);
        const diffDays = Math.floor(diffHours / 24);
      
        // Devuelve el resultado más relevante
        if (diffSeconds < 60) {
          return `just now`;
        } else if (diffMinutes < 60) {
          return `${diffMinutes}m`;
        } else if (diffHours < 24) {
          return `${diffHours}h`;
        } else {
          return `${diffDays}d`;
        }
      }
            
    return (
        <div className={`${matches ? 'flex-row-reverse' : 'flex-row'} flex items-start p-2 w-full py-2 justify-start`}>
        <div
        style={ { backgroundImage:  `url(${data.image})` } }
        className="rounded-lg w-8 h-8 bg-cover bg-center bg-no-repeat"/>      

        <div className={`flex flex-col items-start justify-start ${matches ? 'mr-1' : 'ml-1'}`}>
            <div className={`${matches ? 'justify-end' : 'justify-start'}  w-full flex items-center gap-1`}>
            <span className="text-slate-800 font-medium text-xs">{matches ? 'You' : data.username}</span>
            <div className="h-[3px] w-[3px] bg-slate-300 rounded-full"></div>
            <span className="text-xs font-light text-slate-400">{timeAgo(data.created_at).replace('-', '')}</span>
            </div>

            <p className="text-slate-900 font-medium text-xs">
                {data.message}
            </p>
        </div>
        </div>
    );
}