import sqlite3

connection = sqlite3.connect('db/database.db')
cursor = connection.cursor()


def db_start():

    with connection as con:
        tables = ["'users'", "groups_status", "work_groups", "'objects'", "'tasks'", "'meeting'", "'agenda'"]
        table_names = ','.join(tables)

        SQL = f"SELECT count(*) FROM sqlite_master WHERE type='table' AND name in ({table_names});"
        num = con.execute(SQL).fetchone()[0]
        if num != len(tables):
            db_create_tables()


def db_create_tables():

    cursor.execute('''CREATE TABLE IF NOT EXISTS objects (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      county TEXT NOT NULL,
      district TEXT NOT NULL,
      address TEXT NOT NULL,
      cadastral_number TEXT,
      object_type TEXT NOT NULL,
      condition TEXT NOT NULL,
      square REAL NOT NULL,
      owner TEXT NOT NULL,
      actual_user TEXT NOT NULL,
      additional_info TEXT,
      media BLOB NOT NULL

    )''')

    #county - ЗАО, ЦАО и так далее
    cursor.execute('''CREATE TABLE IF NOT EXISTS tasks (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      object_id INTEGER NOT NULL,
      object_county TEXT NOT NULL,
      object_address TEXT NOT NULL,
      description TEXT NOT NULL,
      status TEXT NOT NULL DEFAULT 'new',
      time_stamp TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
      deadline TIMESTAMP NOT NULL,
      wg_id INTEGER NOT NULL,
      wg_report TEXT DEFAULT NULL,
      feedback TEXT DEFAULT NULL,
      closed INTEGER DEFAULT 0,
      FOREIGN KEY (object_id) REFERENCES objects(id),
      FOREIGN KEY (wg_id) REFERENCES work_groups(id)
    )''')

    cursor.execute('''CREATE TABLE IF NOT EXISTS work_groups (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name VARCHAR(255) NOT NULL

    )''')
    
    cursor.execute('''CREATE TABLE IF NOT EXISTS groups_status (
      id INTEGER PRIMARY KEY,
      wg_status TEXT NOT NULL,
      report TEXT DEFAULT NULL,
      approved INTEGER DEFAULT NULL,
      FOREIGN KEY (id) REFERENCES tasks(id)
    )''')

    cursor.execute('''CREATE TABLE IF NOT EXISTS meeting (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      agenda_id INTEGER NOT NULL,
      wg_id INTEGER NOT NULL,
      date_of_meeting TIMESTAMP NOT NULL,
      reference TEXT DEFAULT NULL,
      FOREIGN KEY (agenda_id) REFERENCES agenda(id),
      FOREIGN KEY (wg_id) REFERENCES work_groups(id)
    )''')

    cursor.execute('''CREATE TABLE IF NOT EXISTS agenda (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      task_id INTEGER,
      wg_id INTEGER NOT NULL,
      date TIMESTAMP,
      status INTEGER DEFAULT 0 NOT NULL,
      FOREIGN KEY (task_id) REFERENCES tasks(id),
      FOREIGN KEY (wg_id) REFERENCES work_groups(id)
    )''')

    cursor.execute('''CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      type TEXT NOT NULL,
      login TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL

     )''')

    connection.commit()
    # connection.close()


async def create_user(id, name, type, login, password):
    cursor.execute("INSERT OR IGNORE INTO users VALUES(?, ?, ?, ?, ?)",
                   (id, name, type, login, password))
    connection.commit()


async def get_user_by_id(id):
    user = cursor.execute("SELECT * FROM users WHERE id == '{key}'".format(key=id)).fetchone()
    return user


async def remove_user_by_id(id):
    cursor.execute("DELETE FROM users WHERE customer_id == '{key}'".format(key=id))


async def create_objects(id,
                   county,
                   district,
                   address,
                   object_type,
                   condition,
                   square,
                   owner,
                   actual_user,
                   media):
    cursor.execute("INSERT OR IGNORE INTO users VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
                   (id, county, district, address, object_type, condition, square, owner, actual_user, media))
    connection.commit()


async def get_objects_by_id_country_address(id, county, address):
    user = cursor.execute(
        "SELECT * FROM users WHERE (id, county, address) == '{key}'".format(key=(id, county, address))).fetchone()
    return user


async def remove_objects_by_id_country_address(id, county, address):
    cursor.execute("DELETE FROM users WHERE (id, county, address) == '{key}'".format(key=(id, county, address)))


async def create_tasks(id,
                 object_id,
                 object_county,
                 object_address,
                 description,
                 status,
                 time_stamp,
                 deadline,
                 group,
                 report,
                 feedback):
    cursor.execute("INSERT OR IGNORE INTO users VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?. ?)",
                   (id, object_id, object_county, object_address, description, status, time_stamp, deadline, group, report, feedback))
    connection.commit()


async def get_objects_by_id(id):
    user = cursor.execute(
        "SELECT * FROM users WHERE id == '{key}'".format(key=id)).fetchone()
    return user


async def remove_objects_by_id(id):
    cursor.execute("DELETE FROM users WHERE id == '{key}'".format(key=id))
