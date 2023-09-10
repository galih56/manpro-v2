import { isValid, parseISO } from "date-fns";

export const flattenSectionTasks = (sections_or_tasks : Array<any> | Object)=>{
    var new_data : Array<any> = [];
     try{
      if(Array.isArray(sections_or_tasks)){
        for (let i = 0; i < sections_or_tasks.length; i++) {
            const item = sections_or_tasks[i];

            if(item.hasOwnProperty('tasks')){
                if(item.tasks){
                    new_data = [ ...new_data, ...item.tasks]
                }
            }
        }
      }
      return new_data;
    }catch (error){
      console.log("Error : ",error)
      return [];
    }
  }
