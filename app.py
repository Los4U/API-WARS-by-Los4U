from flask import Flask, render_template, request, session
from flask_bootstrap import Bootstrap


app = Flask(__name__)
Bootstrap(app)

@app.route('/')
def index():
    return render_template('index.html')


@app.route('/login')
def login():
    return render_template('login.html')


@app.route('/register')
def register():
    return render_template('register.html')


@app.route("/register_user", methods=["POST", "GET"])
def new_user():

    name = request.form["uname"]
    psw = request.form["psw"]

    print("name", name, "psw", psw)

    return render_template('register.html')

# @app.route("/register", methods=["POST", "GET"])
# def register():
#     #check if login and password is correct!
#     print(request.form)
#     login = request.form['login']
#
#     password = request.form['password']
#     id_and_name = data_manager.check_user_login_and_password(login, password)
#
#     if id_and_name != []:
#         login = login.upper()
#         flash('Username {login} already exists'.format(login=login))
#
#         return redirect(url_for('registration'))
#     else:
#         # place for function adding user to database
#         user_id = len(data_manager.get_all_users()) + 1
#
#         data_manager.add_user(user_id, login, password)
#         id_and_name = data_manager.check_user_login_and_password(login, password)
#         session['username'] = id_and_name[0]['name']
#         session['id'] = id_and_name[0]['id']
#
#         return redirect(url_for('boards') )


if __name__ == '__main__':
    app.run(debug=True)
