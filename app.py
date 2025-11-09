from flask import Flask, render_template
import database as db
from datetime import datetime

app = Flask(__name__)

def init_db():
    db.create_user_table()
    db.create_progress_table()
    db.new_user("ngoc2383", "host1234@gmail.com", "ngoc1102")
    print("created table successfully!")
    

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/about')
def about():
    return render_template('about.html')

@app.route('/beginner')
def beginner():
    return render_template('beginner.html')

@app.route('/intermediate')
def intermediate():
    return render_template('intermediate.html')

@app.route('/advanced')
def advanced():
    return render_template('advanced.html')

if __name__ == '__main__':
    app.run(debug=True)
