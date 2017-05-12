var DatabaseTasks = null;

function database_tasks_update_version_1()
{
    window.sqlitePlugin.openDatabase({name : 'BashboredTasks.db', location: 'default'});
    
    localStorage.setItem('database_tasks_version') = 1;
    console.log("database updated to version 1");
};

function update_database()
{
    if (!localStorage.getItem('database_tasks_version'))
    {
        database_tasks_update_version_1();
    }
};
