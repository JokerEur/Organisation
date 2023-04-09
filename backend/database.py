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


def get_reestr_info(wg_id, object_type):
    result = cursor.execute("""select tasks.object_id, tasks.object_county, objects.district, tasks.object_address, objects.condition, objects.square, objects.owner, objects.actual_user, objects.cadastral_number from tasks
					join objects
					on tasks.object_id = objects.id
					where tasks.wg_id = {key_wg_id}
					and objects.object_type = '{key_object_type}'"""
					.format(key_wg_id=wg_id, key_object_type=object_type)).fetchall()
    connection.commit()
    return result

def get_user_info(user_id):
    result = cursor.execute("""select name, login, type from users
					where id = '{user}'"""
					.format(user=user_id)).fetchone()
    connection.commit()
    return result

def get_meetings_info(meeting_id):
    result = cursor.execute("""SELECT meeting.date_of_meeting, work_groups.name,  meeting.reference FROM meeting
					join work_groups
					on meeting.wg_id = work_groups.id
					WHERE meeting.id = {key_meet}
					"""
					.format(key_meet=meeting_id)).fetchone()
    connection.commit()
    return result

def get_wg_tasks(wg_id):
    result = cursor.execute("""SELECT meeting.date_of_meeting, work_groups.name,  meeting.reference FROM meeting
					join work_groups
					on meeting.wg_id = work_groups.id
					WHERE meeting.id = {key_meet}
					"""
					.format(key_meet=wg_id)).fetchone()
    connection.commit()
    return result

def get_new_objects(wg_id):
    result = cursor.execute("""SELECT COUNT(*) as 'Новый' FROM tasks
						where wg_id = {key} and status = 'Новый'
						"""
						.format(key=wg_id)).fetchone()
    connection.commit()
    return result

def get_process_objects(wg_id):
    result = cursor.execute("""SELECT COUNT(*) as 'В работе' FROM tasks
						where wg_id = {key} and status = 'В работе'
						"""
						.format(key=wg_id)).fetchone()
    connection.commit()
    return result

def get_done_objects(wg_id):
    result = cursor.execute("""SELECT COUNT(*) as 'Завершено' FROM tasks
						where wg_id = {key} and status = 'Завершено'
						"""
						.format(key=wg_id)).fetchone()
    connection.commit()
    return result

def get_object_info(wg_id, object_type):
    result = cursor.execute("""select tasks.object_id, tasks.object_county, objects.district, tasks.object_address, objects.condition, objects.square, objects.owner, objects.actual_user, objects.cadastral_number from tasks
					join objects
					on tasks.object_id = objects.id
					where tasks.wg_id = {key_wg_id}
					and objects.object_type = '{key_object_type}'"""
					.format(key_wg_id=wg_id, key_object_type=object_type)).fetchall()
    connection.commit()
    return result

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
                 wg_id,
                 report,
                 feedback):
    cursor.execute("INSERT OR IGNORE INTO users VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?. ?)",
                   (id, object_id, object_county, object_address, description, status, time_stamp, deadline, wg_id, report, feedback))
    connection.commit()


async def get_objects_by_id(id):
    user = cursor.execute(
        "SELECT * FROM users WHERE id == '{key}'".format(key=id)).fetchone()
    return user


async def remove_objects_by_id(id):
    cursor.execute("DELETE FROM users WHERE id == '{key}'".format(key=id))

async def m(id):
    a = '''
    SELECT id, date_of_meeting, name,  reference
    FROM meeting WHERE id == '{key}' 
    inner join groups_status
    on meeting.wg_id == groups_status.id
    '''.fetchone()


def get_test_query(id):
    connection = sqlite3.connect('backend/db/database.db')
    cursor = connection.cursor()

    a = f'''
    SELECT meeting.id, meeting.date_of_meeting, work_groups.name, meeting.reference 
    FROM meeting 
    JOIN work_groups ON meeting.wg_id = work_groups.id 
    WHERE meeting.id = {id}
    '''

    a = cursor.execute(a).fetchone()

    connection.commit()
    connection.close()

    return a


def create_meeting(id,
      agenda_id,
      wg_id,
      date_of_meeting,
      reference):
    connection = sqlite3.connect('backend/db/database.db')
    cursor = connection.cursor()

    cursor.execute("INSERT OR IGNORE INTO meeting VALUES(?, ?, ?, ?, ?)",
                   (id, agenda_id, wg_id, date_of_meeting, reference))
    connection.commit()
    connection.close()

def create_groups_status(id,
      wg_status,
      report,
      approved):
    connection = sqlite3.connect('backend/db/database.db')
    cursor = connection.cursor()

    cursor.execute("INSERT OR IGNORE INTO groups_status VALUES(?, ?, ?, ?)",
                   (id, wg_status, report, approved))
    connection.commit()
    connection.close()

def create_work_groups(id, name):
    connection = sqlite3.connect('backend/db/database.db')
    cursor = connection.cursor()

    cursor.execute("INSERT OR IGNORE INTO work_groups VALUES(?, ?)",
                   (id, name))
    connection.commit()
    connection.close()