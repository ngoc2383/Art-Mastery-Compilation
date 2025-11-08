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

def create_watched_table():
    c.executescript('''
        CREATE TABLE IF NOT EXIST videos_watched (
            id TEXT PRIMARY KEY,
            level TEXT NOT NULL,     
            title TEXT NOT NULL,
            url TEXT NOT NULL
        );

        INSERT INTO videos (id, level, title, creator, url) VALUES
            ('b1', 'Beginner', 'Learning to Draw Digitally for Beginners', 'https://www.youtube.com/watch?v=WLU26nqcvfY'),
            ('b2', 'Beginner', 'START HERE with Digital Art | Step by step Tutorial', 'https://www.youtube.com/watch?v=noNbuBqvxQE'),
            ('i1', 'Intermediate', 'How to Learn MORE Digital Painting', 'https://www.youtube.com/watch?v=9QEGEBK6nIY'),
            ('a1', 'Advanced', 'Mind-Bending Art Techniques in Procreate #1', 'https://www.youtube.com/watch?v=GS06AtdlzvY');

    ''')

def new_user(username, email, password):
    c.execute(f'INSERT INTO users VALUES({username}, {email}, {password})')


def drop_table(name):
    c.execute(f'DROP TABLE IF EXIST {name}')
    conn.commit()

