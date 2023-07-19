import { isValid, parseISO } from "date-fns";

export const flattenSectionTasks = (sections : Array<any>) => {
    var tasks = [];
    for (let i = 0; i < sections.length; i++) {
      const item = sections[i];
      tasks.push(item);
      if(item.tasks && item.tasks instanceof Array){
        for (let i = 0; i < item.tasks.length; i++) {
          const task = item.tasks[i];
          var new_task = task;
          tasks.push(new_task);
        }
        delete item.tasks
      }
    }
    return tasks;
}

export const restructureGanttChartData = (data : any) : any=> {
  try {
      if (data instanceof Array) {
          return data.map((item) => restructureGanttChartData(item));
      } else if (data instanceof Object) {
          for (const key in data) {
              const date = parseISO(data[key]);
            
                if (isValid(date)) {
                    data[key] = date;
                } else if (typeof data[key] === "object") {
                    data[key] = restructureGanttChartData(data[key]);
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
}
