import { GanttChart } from "@/components/GanttChart"
import { NoEntriesFound } from "@/components/Layout";
import { convertDates } from "@/utils/datetime";
import { isValid, parseISO } from "date-fns";
import { useCallback, useState } from "react";
import { useOutletContext } from "react-router-dom"

export const Gantt = () => {
    const project = useOutletContext();
    let tasks = project.tasks;

    const restructureGanttChartData = useCallback((data : any) : any=> {
        try {
            if (data instanceof Array) {
                return data.map((item) => restructureGanttChartData(item));
            } else if (data instanceof Object) {
                for (const key in data) {
                    const date = parseISO(data[key]);
                    
                    if(!(data[key] instanceof Date)){
                        if (isValid(date)) {
                            data[key] = date;
                        } else if (typeof data[key] === "object") {
                            data[key] = restructureGanttChartData(data[key]);
                        }
                    }

                    if(key == "start_on" && data[key] ){
                        data.start = data[key];
                    }

                    if(key == "due_on" && data[key]){
                        data.end = data[key];
                    }

    
                    if(key == "task_id" && data[key]){
                        data.dependencies = [ data[key] ];
                    }
                    if(key == "title" && data[key]){
                        data.name = data[key];
                    }
                }
                
                if(data != null && data != undefined){
                    if(data.start && data.end) return data;
                }   
            }
        } catch (error) {
            console.log(error)
            return [];
        };
    }, [project.id,project?.tasks?.length])
    
    console.log("render");
    tasks = restructureGanttChartData(tasks).filter((item : any) => item != undefined);

    console.log("check",tasks);
    if(!tasks){
        return (
          <NoEntriesFound/>
        )
    }

    return (

        <div>
            <GanttChart  tasks={tasks} />
        </div>
    )
}