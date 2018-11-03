import database_common

@database_common.connection_handler
def get_all_users(cursor):
    cursor.execute("""SELECT * FROM users; """)
    all_users = cursor.fetchall()
    return all_users

@database_common.connection_handler
def check_user_login_and_password(cursor, login, password):
    cursor.execute ("""
                    SELECT id, username FROM users
                    WHERE username = '{}'
                    AND password = '{}';""".format(login, password)
                    )
    user_id_and_name = cursor.fetchall()
    return user_id_and_name

@database_common.connection_handler
def check_user_login(cursor, login):
    cursor.execute ("""
                    SELECT id, username FROM users
                    WHERE username = '{}';""".format(login)
                    )
    user_login = cursor.fetchall()
    return user_login


@database_common.connection_handler # to be finished
def add_user(cursor, username, user_password):
    cursor.execute ("""
                    INSERT INTO users (username, password)
                    VALUES ('{}','{}');
                    """.format(username, user_password))
