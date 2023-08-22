import { isValid, parseISO } from "date-fns";

export const flattenSectionTasks = (sections_or_tasks : Array<any> | Object)=>{
    var new_data : Array<any> = [];
     try{
      if(Array.isArray(sections_or_tasks)){
        for (let i = 0; i < sections_or_tasks.length; i++) {
            const item = sections_or_tasks[i];

            if(item.hasOwnProperty('tasks')){
                if(item.tasks){
                    var tasks = [];
                    
                    item.tasks.forEach((task : any) => {
                        for (const key in task) {
                            const date = parseISO(task[key]);
                                        
                            if (isValid(date)) {
                                task[key] = date;
                            } 
                            

                            if(key == "startOn" ){
                                if(task[key]) task.start = task[key];
                            }

                            if(key == "dueOn"){
                                if(task[key]) task.end = task[key];
                            }


                            if(key == "taskId"){
                                if(task[key]) task.dependencies = [ task[key] ];
                            }
                            if(key == "title" && task[key]){
                                if(task[key]) task.name = task[key];
                            }
                        }
                        tasks.push(task)
                    }); 
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
