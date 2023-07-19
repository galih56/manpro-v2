import { NoEntriesFound } from "@/components/Layout";
import { useOutletContext } from "react-router-dom";

export const Board = () => {
    const project = useOutletContext();
    
    if(!project?.tasks){
        return (
          <NoEntriesFound/>
        )
    }

    return (
        <div>
            Board
        </div>
    )
}


