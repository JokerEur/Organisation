import sqlite3

def get_count():
    connection = sqlite3.connect('backend/db/database.db')
    cursor = connection.cursor()
    result = cursor.execute("""select count(*) 
                        from objects""").fetchall()[0]
    connection.commit()
    connection.close()
    return result

def get_wg_id(agenda_id):
    connection = sqlite3.connect('backend/db/database.db')
    cursor = connection.cursor()
    result = cursor.execute("""select wg_id from agenda
                                where id = {key}""".format(key=agenda_id)).fetchall()
    connection.commit()
    connection.close()
    return result

def get_count_meet():
    connection = sqlite3.connect('backend/db/database.db')
    cursor = connection.cursor()
    result = cursor.execute("""select count(*) 
                        from meeting""").fetchall()[0]
    connection.commit()
    connection.close()
    return result


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


def get_object_info(object_id):
    connection = sqlite3.connect('backend/db/database.db')
    cursor = connection.cursor()
    result = cursor.execute("""select objects.address, objects.county, objects.district, objects.object_type, objects.owner, objects.condition
                    from objects
					where objects.id = {key}"""
                            .format(key=object_id)).fetchall()[0]
    connection.commit()
    connection.close()
    return result

def get_object_info_2(object_id):
    connection = sqlite3.connect('backend/db/database.db')
    cursor = connection.cursor()
    result = cursor.execute("""select address, county, district, owner,
                    coordinate, cadastral_number, object_type, condition, square,
                    owner, actual_user, additional_info
                    from objects
					where objects.id = {key}"""
                            .format(key=object_id)).fetchall()[0]
    connection.commit()
    connection.close()
    return result

def rename(wg_id, object_type):
    connection = sqlite3.connect('backend/db/database.db')
    cursor = connection.cursor()
    result = cursor.execute("""select tasks.object_id, tasks.object_county, objects.district, tasks.object_address, objects.condition, objects.square, objects.owner, objects.actual_user, objects.cadastral_number from tasks
					join objects
					on tasks.object_id = objects.id
					where tasks.wg_id = {key_wg_id}
					and objects.object_type = '{key_object_type} '"""
                            .format(key_wg_id=wg_id, key_object_type=object_type)).fetchall()
    connection.commit()
    connection.close()
    return result

def get_povistka(object_id):
    connection = sqlite3.connect('backend/db/database.db')
    cursor = connection.cursor()
    result = cursor.execute("""select agenda.id, agenda.date from agenda
                        join tasks on agenda.task_id = tasks.id
                        where tasks.object_id = {key}"""
                            .format(key=object_id)).fetchone()
    connection.commit()
    connection.close()
    return result

def tasks_by_object(object_id):
    connection = sqlite3.connect('backend/db/database.db')
    cursor = connection.cursor()
    print(1)
    result = cursor.execute("""SELECT tasks.id, tasks.time_stamp, tasks.description, tasks.deadline, tasks.wg_id, tasks.status, tasks.wg_report FROM tasks
    					join objects
    					on tasks.object_id = objects.id
    					WHERE objects.id = {key}
    					"""
                            .format(key=object_id)).fetchall()
    print(2)
    connection.commit()
    connection.close()
    return result

def tasks_by_object(object_id):
    connection = sqlite3.connect('backend/db/database.db')
    cursor = connection.cursor()
    result = cursor.execute("""SELECT tasks.id, tasks.time_stamp, tasks.description, tasks.deadline, tasks.wg_id, tasks.status, tasks.wg_report FROM tasks
    					join objects
    					on tasks.object_id = objects.id
    					WHERE objects.id = {key}
    					"""
                            .format(key=object_id)).fetchall()
    connection.commit()
    connection.close()
    return result

def povistka_info(pov_id):
    connection = sqlite3.connect('backend/db/database.db')
    cursor = connection.cursor()
    result = cursor.execute("""SELECT objects.id, objects.address, objects.county, objects.district, objects.object_type, objects.owner FROM objects
    					join tasks on tasks.object_id = objects.id
    					WHERE tasks.id = {key}
    					""".format(key=pov_id)).fetchall()
    connection.commit()
    connection.close()
    return result

def protocol_info(protocol_id):
    connection = sqlite3.connect('backend/db/database.db')
    cursor = connection.cursor()
    result = cursor.execute("""SELECT tasks.id, objects.address, objects.county, objects.district, objects.cadastral_number, tasks.deadline, tasks.description, tasks.feedback FROM tasks
                        join objects on tasks.object_id = objects.id
    					WHERE tasks.id = {key}
    					""".format(key=protocol_id)).fetchall()
    connection.commit()
    connection.close()
    return result

def all_objects():
    connection = sqlite3.connect('backend/db/database.db')
    cursor = connection.cursor()
    result = cursor.execute("""select * from objects""").fetchall()
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


def get_meetings_info1(agenda_id):
    connection = sqlite3.connect('backend/db/database.db')
    cursor = connection.cursor()
    result = cursor.execute("""SELECT meeting.date_of_meeting, work_groups.name,  meeting.reference FROM meeting
					join work_groups
					on meeting.wg_id = work_groups.id
					WHERE meeting.agenda_id = {key_meet}
					"""
                            .format(key_meet=agenda_id)).fetchone()
    connection.commit()
    connection.close()
    return result


def get_meetings_info(meeting_id):
    connection = sqlite3.connect('backend/db/database.db')
    cursor = connection.cursor()
    result = cursor.execute("""SELECT meeting.date_of_meeting, work_groups.name,  meeting.reference, meeting.agenda_id FROM meeting
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
                            .format(name=name_id)).fetchone()[0]
    connection.commit()
    connection.close()
    return result

def update_status_task_by_id(name_id, text_u):
    connection = sqlite3.connect('backend/db/database.db')
    cursor = connection.cursor()
    cursor.execute("""update tasks
                        set status = '{text}'
    					where id = '{name}'"""
                            .format(name=name_id, text = text_u))
    connection.commit()
    connection.close()

def update_feed_task_by_id(name_id, text_u):
    connection = sqlite3.connect('backend/db/database.db')
    cursor = connection.cursor()
    cursor.execute("""update tasks
                        set feedback = '{text}'
    					where id = '{name}'"""
                            .format(name=name_id, text = text_u))
    connection.commit()
    connection.close()


def add_report_task_by_id(name_id, text_u):
    connection = sqlite3.connect('backend/db/database.db')
    cursor = connection.cursor()
    cursor.execute("""update tasks
                        set wg_report = '{text}'
    					where id = '{name}'"""
                            .format(name=name_id, text = text_u))
    connection.commit()
    connection.close()

def select_image(object_id):
    connection = sqlite3.connect('backend/db/database.db')
    cursor = connection.cursor()
    cursor.execute("""select link from media
                        where id = '{object}'""".format(object = object_id))