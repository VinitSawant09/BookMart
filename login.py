from flask import Flask, render_template
app = Flask(__name__)

@app.route('/')
def hello():
     return render_template('login.html')

@app.route('/login/', methods=['GET','POST'])
def userLogin():

     print("inside login")

     return 'false'

@app.route('/home/',methods=['GET','POST'])
def home():

     print("inside home")

     return render_template('home.html')

if __name__ == '__main__':
    app.run(debug=True)