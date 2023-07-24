<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {

        $users = [
            [
                "id" => 0,
                "name" => "Galih Indra",	
                "email" => "galihindraw56@gmail.com",		
                "password" => '$2y$10$nMh2awrGVfd.bGnIMC.7TeU1tbX.Bj0YzVqVCESey7b7MFIN2LmSy',
                "created_at" => "2023-02-21 14:36:21+07",
                "updated_at" => "2023-02-24 13:08:22+07",
                "is_admin" => true
            ]
        ];

        $projects = [
            [
                "id" => 0,
                "title" => "HC-TRACKER",
                "created_at" => "2023-02-21 14:36:21+07",
                "updated_at" => "2023-02-24 13:08:22+07"
            ]
        ];

        $tasks = [
            [
                "id" => 4,
                "project_id" => 0,
                "title" => "My Task 5",
                "description" => "Lorem ipsum dolor set amet",
                "progress" => 0	,
                "completed" => false,		
                "created_at" => "2023-02-13 15:52:01+07",
                "updated_at" => "2023-02-13 15:52:42+07"
            ],
            [
                "id" => 5,
                "project_id" => 0,
                "title" => "My Task 1",
                "description" => "Lorem ipsum dolor set amet",
                "progress" => 0	,
                "completed" => false,		
                "created_at" => "2023-02-13 15:52:01+07",
                "updated_at" => "2023-02-13 15:52:42+07"  
            ],
            [
                "id" => 6,
                "project_id" => 0,
                "title" => "My Task 5",
                "description" => "Lorem ipsum dolor set amet",
                "progress" => 0	,
                "completed" => false,		
                "created_at" => "2023-02-13 15:52:01+07",
                "updated_at" => "2023-02-13 15:52:42+07"   
            ],
            [
                "id" => 7,
                "project_id" => 0,
                "title" => "My Task 5",
                "description" => "Lorem ipsum dolor set amet",
                "progress" => 0	,
                "completed" => false,		
                "created_at" => "2023-02-13 15:52:01+07",
                "updated_at" => "2023-02-13 15:52:42+07"   
            ],
            [
                "id" => 8,
                "project_id" => 0,
                "title" => "My Task 5",
                "description" => "Lorem ipsum dolor set amet",
                "progress" => 0	,
                "completed" => false,		
                "created_at" => "2023-02-13 15:52:01+07",
                "updated_at" => "2023-02-13 15:52:42+07"   
            ],
            [
                "id" => 9,
                "project_id" => 0,
                "title" => "My Task 5",
                "description" => "Lorem ipsum dolor set amet",
                "progress" => 0	,
                "completed" => false,		
                "created_at" => "2023-02-13 15:52:01+07",
                "updated_at" => "2023-02-13 15:52:42+07"   
            ],
            [
                "id" => 10,
                "project_id" => 0,
                "title" => "My Task 5",
                "description" => "Lorem ipsum dolor set amet",
                "progress" => 0	,
                "completed" => false,		
                "created_at" => "2023-02-13 15:52:01+07",
                "updated_at" => "2023-02-13 15:52:42+07"   
            ]
        ];

        $roles = [
            [ "id" => 0, "name" => "Admin", "code" => "ADMIN", "created_at" => "2023-02-23 15:58:43+07", "updated_at" => "2023-02-23 16:06:23+07" ],
            [ "id" => 2, "name" => "Programmer", "code" => "PRGMR", "created_at" => "2023-02-23 15:58:43+07", "updated_at" => "2023-02-23 16:06:23+07"  ],
            [ "id" => 3, "name" => "Manager", "code" => "MNGR", "created_at" => "2023-02-23 15:58:43+07", "updated_at" => "2023-02-23 16:06:23+07"  ],
            [ "id" => 4, "name" => "System Analyst", "code" => "SA", "created_at" => "2023-02-23 15:58:43+07", "updated_at" => "2023-02-23 16:06:23+07"  ],
            [ "id" => 5, "name" => "Testing Engineer", "code" => "TESTER", "created_at" => "2023-02-23 15:58:43+07", "updated_at" => "2023-02-23 16:06:23+07"  ],
        ];

        $tags = [
            [
                "id" => 2,
                "name" => "Dev",
                "description" => "Testing",
                "created_at" => "2023-02-13 15:52:01+07",
                "updated_at" => "2023-02-13 15:52:42+07" 
            ],
            [
                "id" => 3,
                "name" => "Testing",
                "description" => "Testing",
                "created_at" => "2023-02-13 15:52:01+07",
                "updated_at" => "2023-02-13 15:52:42+07" 
            ],
            [
                "id" => 4,
                "name" => "Production",
                "description" => "Testing",
                "created_at" => "2023-02-13 15:52:01+07",
                "updated_at" => "2023-02-13 15:52:42+07" 
            ]
        ];

        foreach ($users as $i => $user) {
            \App\Models\User::create($user);
        }
        
        foreach ($projects as $i => $project) {
            \App\Models\Project::create($project);
        }

        foreach ($tasks as $i => $task) {
            \App\Models\Task::create($task);
        }
        
        foreach ($roles as $i => $role) {
            \App\Models\Role::create($role);
        }
        


        $user_task = [
            [
                "id" => 1,
                "user_id" => 0,	
                "task_id" => 6,
            ],
            [
                "id" => 2,
                "user_id" => 0,	
                "task_id" => 5,
            ],
            [
                "id" => 1,
                "user_id" => 0,	
                "task_id" => 7,
            ]			
        ];
        
        $task_tag = [
            "id" => 3,	"task_id" => 5,	"tag_id" => 3,	
            "id" => 5,	"task_id" => 4,	"tag_id" => 2,		
            "id" => 6,	"task_id" => 6,	"tag_id" => 2,		
            "id" => 7,	"task_id" => 6,	"tag_id" => 4,		
            "id" => 9,	"task_id" => 5,	"tag_id" => 4,		
            "id" => 10,	"task_id" => 7,	"tag_id" => 3,		
            "id" => 11,	"task_id" => 8,	"tag_id" => 2		
        ];
        
        foreach ($user_task as $i => $user) {
            $user = \App\Models\User::find($user['user_id']);
            $user->tasks()->attach($user['task_id']);
        }
        
        foreach ($task_tag as $i => $task) {
            $task = \App\Models\Task::find($task['task_id']);
            $task->tags()->attach($task['tag_id']);
        }
    }
}
