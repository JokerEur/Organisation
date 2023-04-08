import sqlite3

connection = sqlite3.connect('db/database.db')
cursor = connection.cursor()


def db_start():

    with connection as con:
        tables = ["'users'", "'objects'", "'tasks'"]
        table_names = ','.join(tables)

        SQL = f"SELECT count(*) FROM sqlite_master WHERE type='table' AND name in ({table_names});"
        num = con.execute(SQL).fetchone()[0]
        if num != len(tables):
            db_create_tables()


def db_create_tables():

    cursor.execute('''CREATE TABLE users(
      id INTEGER PRIMARY KEY,
      name TEXT NOT NULL,
      type TEXT NOT NULL,
      login TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL)''')

    cursor.execute('''CREATE TABLE objects(
      id INTEGER,
      county TEXT NOT NULL,
      district TEXT NOT NULL,
      address TEXT NOT NULL,
      object_type TEXT NOT NULL,
      condition TEXT NOT NULL, 
      square REAL NOT NULL,
      owner TEXT NOT NULL,
      actual_user TEXT NOT NULL,
      media BLOB NOT NULL,
      PRIMARY KEY(id, county , address)
    )''')

    cursor.execute('''CREATE TABLE tasks(
      id INTEGER PRIMARY KEY,
      object_id INTEGER NOT NULL,
      object_county TEXT NOT NULL,
      object_address TEXT NOT NULL,
      description TEXT NOT NULL,
      status TEXT NOT NULL,
      time_stamp NUMERIC NOT NULL,
      deadline NUMERIC NOT NULL,
      group TEXT NOT NULL, 
      report TEXT NULL,
      feedback TEXT NULL,
      FOREIGN KEY (object_id ,object_county, object_address) REFERENCES objects(id , county, address)
      
    )''')

    connection.commit()
    # connection.close()


def create_user(id, name, type, login, password):
    cursor.execute("INSERT OR IGNORE INTO users VALUES(?, ?, ?, ?, ?)",
                   (id, name, type, login, password))
    connection.commit()


def get_user_by_id(id):
    user = cursor.execute("SELECT * FROM users WHERE id == '{key}'".format(key=id)).fetchone()
    return user


def remove_user_by_id(id):
    cursor.execute("DELETE FROM users WHERE customer_id == '{key}'".format(key=id))


def create_objects(id,
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


def get_objects_by_id_country_address(id, county, address):
    user = cursor.execute(
        "SELECT * FROM users WHERE (id, county, address) == '{key}'".format(key=(id, county, address))).fetchone()
    return user


def remove_objects_by_id_country_address(id, county, address):
    cursor.execute("DELETE FROM users WHERE (id, county, address) == '{key}'".format(key=(id, county, address)))


def create_tasks(id,
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


def get_objects_by_id(id):
    user = cursor.execute(
        "SELECT * FROM users WHERE id == '{key}'".format(key=id)).fetchone()
    return user


def remove_objects_by_id(id):
    cursor.execute("DELETE FROM users WHERE id == '{key}'".format(key=id))
