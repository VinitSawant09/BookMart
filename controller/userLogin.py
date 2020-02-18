from flask import Flask, render_template
app = Flask(__name__)

@app.route('/login', methods=['GET'])
def userLogin():

     return render_template('home.html')