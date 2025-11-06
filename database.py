import sqlite3 as s

conn = s.connect('user.db')
c = conn.cursor() # cursor
c.execute("PRAGMA foreign_keys = ON")

def create_user_table():
    c.execute('''
        CREATE TABLE IF NOT EXISTS users (
            user_id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT NOT NULL,
            email TEXT NOT NULL,
            password TEXT NOT NULL
        )
    ''')
    conn.commit()
    conn.close()

def create_progress_table():
    c.execute('''
        CREATE TABLE IF NOT EXIST user_progress (
            progress_id INTERGER PRIMARY KEY AUTOINCREMENT,
            completed BOOLEAN,
            lesson_id INTERGER,
            user_id INTERGER,
            FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
            FOREIGN KEY (lesson_id) REFERENCES lessons(lesson_id) ON DELETE CASCADE
        )
    ''')

def new_user(username, email, password):
    c.execute(f'INSERT INTO users VALUES({username}, {email}, {password})')


def drop_table(name):
    c.execute(f'DROP TABLE IF EXIST {name}')
    conn.commit()

