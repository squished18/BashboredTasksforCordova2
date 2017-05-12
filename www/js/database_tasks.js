function database_tasks_update_version_1()
{
    localStorage['database_tasks_version'] = 1;
    console.log("database updated to version 1");
};

function update_database()
{
    console.log("update_database called");
    console.log(localStorage['database_tasks_version']);
    if (!localStorage['database_tasks_version'])
    {
        database_tasks_update_version_1();
    }
};
