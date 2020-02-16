from flask import Flask, render_template
app = Flask(__name__)


@app.route('/')
def hello():
    return render_template('login.html')

@app.route('/<name>')
def helloName(name):

    modname = name
    if modname[-1] != 'y':
        modname = modname + 'y'
    else:
        modname = modname[0:-1] + 'iful'

    return "Hello {}!".format(modname)



if __name__ == '__main__':
    app.run()