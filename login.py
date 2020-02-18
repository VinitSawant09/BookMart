from flask import Flask, render_template, jsonify, url_for
from werkzeug.utils import redirect

app = Flask(__name__)


@app.route('/')
def hello():

     #error ='Invalid Login'
     return render_template('login.html')#, error=error)

@app.route('/login/', methods=['GET','POST'])
def userLogin():

     print("inside login")

     return render_template('home.html')

if __name__ == '__main__':
    app.run()