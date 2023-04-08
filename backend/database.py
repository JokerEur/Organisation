import sqlite3

# connection = sqlite3.connect('db/database.db')
# cursor = connection.cursor()

def db_start():
    global connection, cursor

    connection = sqlite3.connect('db/database.db')
    # connection.execute("PRAGMA foreign_keys = 1")

    cursor = connection.cursor()

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
      report TEXT NULL,
      feedback TEXT NULL,
      FOREIGN KEY (object_id ,object_county, object_address) REFERENCES objects(id , county, address)
      
    )''')

    connection.commit()
    #connection.close()


def create_user(id):
    cursor.execute("INSERT OR IGNORE INTO users VALUES(?, ?, ?, ?, ?)",
                   (id, '', '', '', ''))
    connection.commit()
    user = cursor.execute("SELECT 1 FROM users WHERE id == '{key}'".format(key=id)).fetchone()
    return user