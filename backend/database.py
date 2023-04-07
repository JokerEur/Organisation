import sqlite3

connection = sqlite3.connect('db/database.db')

cursor = connection.cursor()

cursor.execute('''CREATE TABLE users(
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  rank TEXT NOT NULL,
  slave_group NOT NULL,
  login TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL)''')

connection.commit()
connection.close()