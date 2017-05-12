var DatabaseTasks = null;

function database_tasks_update_version_1()
{
    DatabaseTasks = window.sqlitePlugin.openDatabase({name : 'BashboredTasks.db', location: 'default'});

    DatabaseTasks.transaction(function (tx) {
        tx.executeSql('CREATE TABLE TableActiveTasks (description TEXT, owner TEXT, start_date TEXT, due_date TEXT, expiry_date TEXT)');
    },
    function (error)
    {
        console.log("error creating database: " + error.message);
    },
    function ()
    {
        localStorage.setItem('database_tasks_version') = 1;
        console.log("database updated to version 1");
    });
};

function update_database()
{
    if (!localStorage.getItem('database_tasks_version'))
    {
        database_tasks_update_version_1();
    }
};
