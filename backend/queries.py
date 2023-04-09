import sqlite3


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


def get_object_info(wg_id, object_type):
    connection = sqlite3.connect('backend/db/database.db')
    cursor = connection.cursor()
    result = cursor.execute("""select tasks.object_id, tasks.object_county, objects.district, tasks.object_address, objects.condition, objects.square, objects.owner, objects.actual_user, objects.cadastral_number from tasks
					join objects
					on tasks.object_id = objects.id
					where tasks.wg_id = {key_wg_id}
					and objects.object_type = '{key_object_type}'"""
                            .format(key_wg_id=wg_id, key_object_type=object_type)).fetchall()
    connection.commit()
    connection.close()
    return result


def get_done_objects(wg_id):
    connection = sqlite3.connect('backend/db/database.db')
    cursor = connection.cursor()
    result = cursor.execute("""SELECT COUNT(*) as 'Завершено' FROM tasks
						where wg_id = {key} and status = 'Завершено'
						"""
                            .format(key=wg_id)).fetchone()
    connection.commit()
    connection.close()
    return result


def get_new_objects(wg_id):
    connection = sqlite3.connect('backend/db/database.db')
    cursor = connection.cursor()
    result = cursor.execute("""SELECT COUNT(*) as 'Новый' FROM tasks
						where wg_id = {key} and status = 'Новый'
						"""
                            .format(key=wg_id)).fetchone()
    connection.commit()
    connection.close()
    return result


def get_process_objects(wg_id):
    connection = sqlite3.connect('backend/db/database.db')
    cursor = connection.cursor()
    result = cursor.execute("""SELECT COUNT(*) as 'В работе' FROM tasks
						where wg_id = {key} and status = 'В работе'
						"""
                            .format(key=wg_id)).fetchone()
    connection.commit()
    connection.close()
    return result


def get_meetings_info(meeting_id):
    connection = sqlite3.connect('backend/db/database.db')
    cursor = connection.cursor()
    result = cursor.execute("""SELECT meeting.date_of_meeting, work_groups.name,  meeting.reference FROM meeting
					join work_groups
					on meeting.wg_id = work_groups.id
					WHERE meeting.id = {key_meet}
					"""
                            .format(key_meet=meeting_id)).fetchone()
    connection.commit()
    connection.close()
    return result


def get_wg_tasks(wg_id):
    connection = sqlite3.connect('backend/db/database.db')
    cursor = connection.cursor()
    result = cursor.execute("""SELECT meeting.date_of_meeting, work_groups.name,  meeting.reference FROM meeting
					join work_groups
					on meeting.wg_id = work_groups.id
					WHERE meeting.id = {key_meet}
					"""
                            .format(key_meet=wg_id)).fetchone()
    connection.commit()
    connection.close()
    return result


def get_reestr_info(wg_id, object_type):
    connection = sqlite3.connect('backend/db/database.db')
    cursor = connection.cursor()
    result = cursor.execute("""select tasks.object_id, tasks.object_county, objects.district, tasks.object_address, objects.condition, objects.square, objects.owner, objects.actual_user, objects.cadastral_number from tasks
					join objects
					on tasks.object_id = objects.id
					where tasks.wg_id = {key_wg_id}
					and objects.object_type = '{key_object_type}'"""
                            .format(key_wg_id=wg_id, key_object_type=object_type)).fetchall()
    connection.commit()
    connection.close()
    return result


def get_user_info(user_id):
    connection = sqlite3.connect('backend/db/database.db')
    cursor = connection.cursor()
    result = cursor.execute("""select name, login, type from users
					where id = '{user}'"""
                            .format(user=user_id)).fetchone()
    connection.commit()
    connection.close()
    return result


# заполяем таблички после создания задачи
def get_ob_info_for_task(user_id):
    connection = sqlite3.connect('backend/db/database.db')
    cursor = connection.cursor()
    result = cursor.execute("""select name, login, type from users
					where id = '{user}'"""
                            .format(user=user_id)).fetchone()
    connection.commit()
    connection.close()
    return result

def get_id_group_by_name(name_id):
    connection = sqlite3.connect('backend/db/database.db')
    cursor = connection.cursor()
    result = cursor.execute("""select id from work_groups
    					where name = '{name}'"""
                            .format(name=name_id)).fetchone()
    connection.commit()
    connection.close()
    return result