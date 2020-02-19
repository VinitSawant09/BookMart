from flask import *
from controller.userLogin import userLogin as userLogin
import json

app = Flask(__name__)
@app.route('/')
def hello():
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

@app.route("/signup/")
def signup():
    print("inside signup")


    return render_template('register.html')


@app.route("/logout/")
def userlogout():
    print("inside userlogout")
    session["username"] = ''

    return render_template('login.html')




if __name__ == '__main__':
    app.secret_key = 'namonamo'
    app.config['SESSION_TYPE'] = 'filesystem'

    app.run(debug=True)