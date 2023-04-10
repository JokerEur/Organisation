import sqlite3

def db_start():
    connection = sqlite3.connect('backend/db/database.db')
    with connection as con:
        tables = ["'users'", "groups_status", "work_groups", "'objects'", "'tasks'", "'meeting'", "'agenda'"]
        table_names = ','.join(tables)

        SQL = f"SELECT count(*) FROM sqlite_master WHERE type='table' AND name in ({table_names});"
        num = con.execute(SQL).fetchone()[0]
        if num != len(tables):
            db_create_tables()
    connection.commit()
    connection.close()

def db_create_tables():
    connection = sqlite3.connect('backend/db/database.db')
    cursor = connection.cursor()
    cursor.execute('''CREATE TABLE IF NOT EXISTS objects (
      id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
      county TEXT  ,
      district TEXT  ,
      address TEXT  ,
      cadastral_number TEXT,
      object_type TEXT  ,
      condition TEXT  ,
      coordinate TEXT,
      square REAL  ,
      owner TEXT  ,
      actual_user TEXT  ,
      additional_info TEXT,
      media BLOB  

    )''')

    #county - ЗАО, ЦАО и так далее
    cursor.execute('''CREATE TABLE IF NOT EXISTS tasks (
      id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
      object_id INTEGER  ,
      description TEXT  ,
      status TEXT   DEFAULT 'new',
      time_stamp TIMESTAMP   DEFAULT CURRENT_TIMESTAMP,
      deadline TIMESTAMP  ,
      wg_id INTEGER  ,
      wg_report TEXT DEFAULT NULL,
      feedback TEXT DEFAULT NULL,
      closed INTEGER DEFAULT 0,
      FOREIGN KEY (object_id) REFERENCES objects(id),
      FOREIGN KEY (wg_id) REFERENCES work_groups(id)
    )''')

    cursor.execute('''CREATE TABLE IF NOT EXISTS work_groups (
      id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
      name VARCHAR(255)  

    )''')
    
    cursor.execute('''CREATE TABLE IF NOT EXISTS groups_status (
      id INTEGER NOT NULL PRIMARY KEY,
      wg_status TEXT  ,
      report TEXT DEFAULT NULL,
      approved INTEGER DEFAULT NULL,
      FOREIGN KEY (id) REFERENCES tasks(id)
    )''')

    cursor.execute('''CREATE TABLE IF NOT EXISTS meeting (
      id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
      agenda_id INTEGER  ,
      wg_id INTEGER  ,
      date_of_meeting TIMESTAMP  ,
      reference TEXT DEFAULT NULL,
      FOREIGN KEY (agenda_id) REFERENCES agenda(id),
      FOREIGN KEY (wg_id) REFERENCES work_groups(id)
    )''')

    cursor.execute('''CREATE TABLE IF NOT EXISTS agenda (
      id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
      task_id INTEGER,
      wg_id INTEGER  ,
      date TIMESTAMP,
      status INTEGER DEFAULT 0  ,
      FOREIGN KEY (task_id) REFERENCES tasks(id),
      FOREIGN KEY (wg_id) REFERENCES work_groups(id)
    )''')

    cursor.execute('''CREATE TABLE IF NOT EXISTS users (
      id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
      name TEXT  ,
      type TEXT  ,
      login TEXT UNIQUE  ,
      password TEXT  

     )''')

    cursor.execute('''CREATE TABLE IF NOT EXISTS media(
        id INTEGER NOT NULL ,
        object_id INTEGER NOT NULL ,
        link TEXT NOT NULL , 
        FOREIGN KEY (object_id) REFERENCES task(id)
    )''')

    cursor.execute('''create trigger if not exists agenda_autogenerate
        after INSERT on tasks
        begin
        insert into agenda (task_id, wg_id, date, status)
        values (new.id, new.wg_id, new.deadline, new.status);
        end;
    ''')

    connection.commit()
    connection.close()

def insert_object(id, county, district, address, cadastral_number, coordinate, object_type, condition, square, owner, actual_user, media, additional_info):
    connection = sqlite3.connect('backend/db/database.db')
    cursor = connection.cursor()
    cursor.execute("INSERT OR IGNORE INTO objects VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
                   (id, county, district, address, cadastral_number, coordinate, object_type, condition, square, owner, actual_user, media, additional_info))
    connection.commit()
    connection.close()

def insert_task(id, object_id, description, status, time_stamp, deadline, wg_id, wg_report, feedback, closed):
    connection = sqlite3.connect('backend/db/database.db')
    cursor = connection.cursor()
    cursor.execute("INSERT OR IGNORE INTO tasks VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
                   (id, object_id, description, status, time_stamp, deadline, wg_id, wg_report, feedback, closed))
    connection.commit()
    connection.close()

def insert_work_group(id, name):
    connection = sqlite3.connect('backend/db/database.db')
    cursor = connection.cursor()
    cursor.execute("INSERT OR IGNORE INTO work_groups VALUES(?, ?)",
                   (id, name))
    connection.commit()
    connection.close()

def insert_groups_status(id, wg_status, report, approved):
    connection = sqlite3.connect('backend/db/database.db')
    cursor = connection.cursor()
    cursor.execute("INSERT OR IGNORE INTO groups_status VALUES(?, ?, ?, ?)",
                   (id, wg_status, report, approved))
    connection.commit()
    connection.close()

def insert_meeting(id, agenda_id, wg_id, date_of_meeting, reference):
    connection = sqlite3.connect('backend/db/database.db')
    cursor = connection.cursor()
    cursor.execute("INSERT OR IGNORE INTO meeting VALUES(?, ?, ?, ?, ?)",
                   (id, agenda_id, wg_id, date_of_meeting, reference))
    connection.commit()
    connection.close()

def insert_agenda(id, task_id, wg_id, date, status):
    connection = sqlite3.connect('backend/db/database.db')
    cursor = connection.cursor()
    cursor.execute("INSERT OR IGNORE INTO agenda VALUES(?, ?, ?, ?, ?)",
                   (id, task_id, wg_id, date, status))
    connection.commit()
    connection.close()

def insert_user(id, name, type, login, password):
    connection = sqlite3.connect('backend/db/database.db')
    cursor = connection.cursor()
    cursor.execute("INSERT OR IGNORE INTO users VALUES(?, ?, ?, ?, ?)",
                   (id, name, type, login, password))
    connection.commit()
    connection.close()


# def remove_object_by_id(id):
#     connection = sqlite3.connect('backend/db/database.db')
#     cursor = connection.cursor()
    
#     cursor.execute("DELETE FROM objects WHERE id == '{key}'".format(key=id))

#     connection.commit()
#     connection.close()

# def remove_user_by_id(id):
#     connection = sqlite3.connect('backend/db/database.db')
#     cursor = connection.cursor()
#     cursor.execute("DELETE FROM users WHERE customer_id == '{key}'".format(key=id))
#     connection.commit()
#     connection.close()

# def remove_objects_by_id_country_address(id, county, address):
#     connection = sqlite3.connect('backend/db/database.db')
#     cursor = connection.cursor()
#     cursor.execute("DELETE FROM users WHERE (id, county, address) == '{key}'".format(key=(id, county, address)))
#     connection.commit()
#     connection.close()

# def remove_objects_by_id(id):
#     connection = sqlite3.connect('backend/db/database.db')
#     cursor = connection.cursor()
    
#     cursor.execute("DELETE FROM users WHERE id == '{key}'".format(key=id))

#     connection.commit()
#     connection.close()

# def get_objects_by_id_country_address(id, county, address):
#     connection = sqlite3.connect('backend/db/database.db')
#     cursor = connection.cursor()
#     user = cursor.execute(
#         "SELECT * FROM users WHERE (id, county, address) == '{key}'".format(key=(id, county, address))).fetchone()
#     connection.commit()
#     connection.close()
#     return user

# def get_objects_by_id(id):
#     connection = sqlite3.connect('backend/db/database.db')
#     cursor = connection.cursor()
#     user = cursor.execute(
#         "SELECT * FROM users WHERE id == '{key}'".format(key=id)).fetchone()
#     connection.commit()
#     connection.close()
#     return user
