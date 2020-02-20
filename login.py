from flask import *
from controller.userLogin import userLogin as userLogin
import json
from dao.userLoginDAO import userLoginDAO as userLoginDAO
from dao.db import dataBase as database
app = Flask(__name__)
@app.route('/')
def hello():
     session["username"] = ''
     return render_template('login.html')

@app.route('/login/', methods=['POST'])
def validateLogin():

     print("inside login")
     userdata = json.loads(request.data)

     response = userLogin.validateUserLogin(userdata)
     if response==0:
         session["username"] = userdata.get('username')
     return str(response)

@app.route('/home/',methods=['GET','POST'])
def home():
     username= session['username']
     print("inside home")
     if session["username"]=='':
         return render_template('login.html')

     return render_template('home.html', username = username)

@app.route("/register/")
def register():
    print("inside  register")


    return render_template('register.html')

@app.route("/signup/", methods=['POST'])
def signup():
    print("inside signup")
    userdata = json.loads(request.data)

    response = userLogin.registerUser(userdata)

    return str(response)

@app.route("/sendPassword/", methods=['POST'])
def sendPassword():
    print("inside sendPassword")
    userdata = json.loads(request.data)
    username = userdata.get('username')
    objdatabase = database()
    cursor = objdatabase.dbConn()
    response = userLoginDAO.checkExistingUser('',username, cursor)
    print(response)
    if response == 1:
        print()


    return str(response)


@app.route("/logout/")
def userlogout():
    print("inside userlogout")
    session["username"] = ''

    return render_template('login.html')




if __name__ == '__main__':
    app.secret_key = 'namonamo'
    app.config['SESSION_TYPE'] = 'filesystem'

    app.run(debug=True)