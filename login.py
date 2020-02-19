from flask import Flask, render_template, request
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
     return str(response)

@app.route('/home/',methods=['GET','POST'])
def home():

     print("inside home")

     return render_template('home.html')

if __name__ == '__main__':
    app.run(debug=True)