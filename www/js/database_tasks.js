var DatabaseTasks = null;

function test_database()
{
    console.log('test_database called');

    DatabaseTasks.executeSql('SELECT * FROM TableActiveTasks', [],
        function (resultSet)
        {
            console.log('query successful');
            console.log('TableActiveTasks: ' + resultSet.rows.item(0).description);
        },
        function (error)
        {
            console.log("transaction ERROR: " + error.message);
        });
};

function database_tasks_update_version_1()
{
    DatabaseTasks = window.sqlitePlugin.openDatabase({name : 'BashboredTasks.db', location: 'default'},
        function (DatabaseTasks)
        {
            console.log('Open database successful!');
        },
        function (error)
        {
            console.log('Open database ERROR: '+ JSON.stringify(error));
        });

    DatabaseTasks.transaction(function (tx) {
        tx.executeSql('CREATE TABLE IF NOT EXISTS TableActiveTasks (description TEXT, owner TEXT, start_date INTEGER, due_date INTEGER, expiry_date INTEGER)');
        tx.executeSql('INSERT INTO TableActiveTasks VALUES (?, ?, ?, ?, ?)',
            ['First task', 'David Lau', 0, 0, 0]);
    },
    function (error)
    {
        console.log("error creating database: " + error.message);
    },
    function ()
    {
        var event = new Event('database_ready');
        window.dispatchEvent(event);

        localStorage.setItem('database_tasks_version',  1);
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
