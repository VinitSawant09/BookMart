from flask import *
from controller.userLogin import userLogin as userLogin
import json
from dao.userLoginDAO import userLoginDAO as userLoginDAO
from dao.db import dataBase as database
from impl.email import email as email
app = Flask(__name__)
@app.route('/')
def hello():
     session["username"] = ''
     return render_template('login.html')

@app.route('/login/', methods=['POST'])
def validateLogin():

     print("inside login")
     userdata = json.loads(request.data)

     response = userLogin.validateUserLogin(userdata, session)
     if response == 0:
         session["username"] = userdata.get('username')

     return str(response)

@app.route('/home/',methods=['GET','POST'])
def home():
     username= session['username']
     print("inside home")
     if session["username"] == '':
         return render_template('login.html')
     if session["userType"] == 'Admin':
         return render_template('adminHome.html', username = username)
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
    count = userLoginDAO.checkExistingUser('',username, cursor)
    objemail = email()
    if count == 1:
        password = objemail.genPassword()

        response = userLogin.changePassword(username, password)
        if response == 0:
            emailId = userLogin.fetchEmail(username)
            response = objemail.sendEmail(emailId,password)

    return str(response)


@app.route("/logout/")
def userlogout():
    print("inside userlogout")
    session["username"] = ''

    return render_template('login.html')

@app.route("/checkUserName/",methods=['POST'])
def checkUserName():
    print("inside checkUserName")
    userdata = json.loads(request.data)
    username = userdata.get('username')
    objdatabase = database()
    cursor = objdatabase.dbConn()
    count = 0

    count = userLoginDAO.checkExistingUser('', username, cursor)

    return str(count)


@app.route("/checkPassword/",methods=['POST'])
def checkPassword():
    print("inside checkPassword")
    userdata = json.loads(request.data)
    userName = session["username"]

    count = 0

    count = userLoginDAO.checkPassword('', userName, userdata)

    return str(count)

@app.route("/changePassword/",methods=['POST'])
def changePassword():
    print("inside changePassword")
    userdata = json.loads(request.data)
    userName = session["username"]
    password = userdata.get('password')
    count = 0

    count = userLogin.changePassword(userName, password)

    return str(count)

if __name__ == '__main__':
    app.secret_key = 'namonamo'
    app.config['SESSION_TYPE'] = 'filesystem'

    app.run(debug=True)