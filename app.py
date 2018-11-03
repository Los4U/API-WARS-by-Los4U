from flask import Flask, render_template, request, session, redirect, flash, url_for
from flask_bootstrap import Bootstrap
import data_manager

app = Flask(__name__)
Bootstrap(app)

app.secret_key = "fdgssverfsd54fd54fd564fds822fds002we25rwf3w332w3r33h32n32fhvgohroighvogihvvdkb"

@app.route('/')
def index():
    return render_template('index.html')


@app.route('/login', methods=["POST", "GET"])
def login():
    return render_template('login.html')

@app.route('/logout', methods=["POST", "GET"])
def logout():
    session.clear()
    return redirect(url_for('index'))



@app.route('/check_login', methods=["POST", "GET"])
def check_login():
    login = request.form["uname"]
    password = request.form["psw"]

    user_exist = data_manager.check_user_login_and_password(login, password)

    print("User:", user_exist)

    if user_exist == []:
        flash('User login or password are incorrect')

        return redirect(url_for('login'))
    else:
        session['username'] = user_exist[0]['username']
        session['id'] = user_exist[0]['id']
        session['logged_in'] = True

        return redirect(url_for('index'))



@app.route('/register')
def register():
    return render_template('register.html')


@app.route("/register_user", methods=["POST", "GET"])
def new_user():
    login = request.form["uname"]
    password = request.form["psw"]

    login_exist = data_manager.check_user_login(login)

    if login_exist != []:
        login = login.upper()
        flash('Username {login} already exists'.format(login=login))

        return redirect(url_for('register'))
    else:
        data_manager.add_user(login, password)
        return redirect(url_for('index') )


if __name__ == '__main__':
    app.run(debug=True)
