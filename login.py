from flask import *
from flask import flash
import os
import base64
from controller.userLogin import userLogin as userLogin
from controller.adminController import adminController as adminController
import json
from dao.userLoginDAO import userLoginDAO as userLoginDAO
from dao.db import dataBase as database
from impl.email import email as email
from werkzeug.utils import secure_filename
from impl.excelGen import ExcelGen as excel


app = Flask(__name__)
UPLOAD_FOLDER = './books'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif'}

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
            response = objemail.sendEmail(emailId, password)

    return str(response)


@app.route("/logout/")
def userlogout():
    print("inside userlogout")
    session["username"] = ''
    flash("Logged Out Succesfully.!!")
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

@app.route('/addBooks/', methods=['POST'])
def addBooks():

     print("inside addBooks")
     userdata = json.loads(request.data)
     print(userdata)
     title=userdata.get('username')
     author = userdata.get('author')
     cost = userdata.get('cost')
     desc = userdata.get('desc')
     year = userdata.get('year')
     image = userdata.get('image')
     fname = userdata.get('fname')

     response = adminController.addBooks(title, author, desc, cost, year)

     # check if the post request has the file part
     if 'file' not in image:
         flash('No file part')
         print("first if")
         return redirect(request.url)
     file = image
     # if user does not select file, browser also
     # submit an empty part without filename
     if fname == '':
         flash('No selected file')
         print("second if")
         return redirect(request.url)
     if file and allowed_file(fname):
         print("third if")

         filename = secure_filename(fname)
         print(fname)
         file.save(os.path.join(app.config['UPLOAD_FOLDER'], str(response) + ".jpg"))
     return render_template('adminHome.html')

@app.route("/upload", methods=["GET","POST"])
def upload():
    print("inside upload")


    if request.method == 'POST' and session["username"] != '':

        title = request.form['title']
        print(title)
        author = request.form['author']
        print(author)
        desc = request.form['desc']
        print(desc)
        cost = request.form['cost']
        print(cost)
        year = request.form['year']
        print(year)
        file = request.files['file']
       # response = adminController.addBooks(title, author, desc, cost, year)



        # check if the post request has the file part
        if 'file' not in request.files:
            flash('No file part')
            print("first if")
            return redirect(request.url)
        file = request.files['file']

        # if user does not select file, browser also
        # submit an empty part without filename
        if file.filename == '':
            flash('No selected file')
            print("second if")
            return redirect(request.url)
        if file and allowed_file(file.filename):
            print("third if")
            filename = secure_filename(file.filename)
            print(filename)
            #response = adminController.addBooks(title, author, desc, cost, year, file)
            #print(response)
            file.save(os.path.join(app.config['UPLOAD_FOLDER'], "image" + ".jpg"))

        with open('./books/image.jpg', "rb") as imageFile:
            #str = base64.b64encode(imageFile.read())
            strb64 = base64.b64encode(imageFile.read())
            newstr =strb64.decode("utf-8")
        print(newstr)
        print(str(newstr))
        dec = base64.b64decode(str(newstr))
        print(str(dec))


        #print(base64.encodebytes(newstr))

    #    fileStr=str[2:-1]
    #   print(fileStr)

        response = adminController.addBooks(title, author, desc, cost, year, newstr)
        print(response)
        os.remove(os.path.join(app.config['UPLOAD_FOLDER'], "image.jpg"))
    #    filename = 'some_image.jpg'  # I assume you have a way of picking unique filenames
     #   with open(filename, 'wb') as f:
        #    f.write(dec)
    return render_template('adminHome.html')


def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


@app.route("/getAllBooks/", methods=['POST'])
def getAllBooks():
    print("inside getAllBooks")

    count = 0

    response = userLoginDAO.getAllBooks('')
    print("Book Count =", session["bookcount"])

    return jsonify(response)

@app.route("/getUserCount/", methods=['POST'])
def getUserCount():
    print("inside getUserCount")

    count = 0

    count = userLoginDAO.getUserCount('')
    session["usercount"] = count
    print("User Count =", session["usercount"])
    return str(count)

@app.route("/orderBook/", methods=['POST'])
def orderBook():
    print("inside orderBook")
    userdata = json.loads(request.data)
    objemail = email()
    response = userLogin.orderBook(userdata)
    if response == 0 :
        username = session["username"]
        emailId = userLogin.fetchEmail(username)
        response = objemail.sendOrderEmail(emailId, userdata)
    return str(response)


@app.route("/getorderBookUser/", methods=['POST'])
def getorderBookUser():
    print("inside getorderBookUser")
    if session["username"] != '':
        username = session["username"]
        response = userLogin.getorderBookUser(username)

    return jsonify(response)

@app.route("/getallorderBook/", methods=['POST'])
def getallorderBook():
    print("inside getallorderBook")

    response = userLogin.getallorderBook('')

    return jsonify(response)


@app.route('/addcart/', methods=['POST'])
def addcart():

     print("inside addcart")
     userdata = json.loads(request.data)
     print(userdata)
     bookid=userdata.get('bookid')
     title = userdata.get('title')
     author = userdata.get('author')
     desc = userdata.get('desc')
     cost = userdata.get('cost')
     year = userdata.get('year')
     image = userdata.get('image')
     username = session["username"]


     response = adminController.addcart(username,bookid, title, author, desc, cost, year, image)


     return str(response)

@app.route("/fetchCart/", methods=['POST'])
def fetchCart():
    print("inside fetchCart")

    if session["username"] != '':
        username = session["username"]
        response = userLogin.fetchCart(username)

    return jsonify(response)


@app.route("/removeCart/", methods=['POST'])
def removeCart():
    print("inside removeCart")
    userdata = json.loads(request.data)
    id = userdata.get('id')
    if session["username"] != '':

        response = adminController.removeCart(id)

    return str(response)


@app.route("/countUsers/", methods=['POST'])
def countUsers():
    print("inside countUsers")

    if session["username"] != '':
        response = adminController.countUsers('')

    return str(response)

@app.route("/transacCount/", methods=['POST'])
def transacCount():
    print("inside transacCount")

    if session["username"] != '':
        response = adminController.transacCount('')

    return jsonify(response)

@app.route("/salesCount/", methods=['POST'])
def salesCount():
    print("inside salesCount")

    if session["username"] != '':
         response = adminController.salesCount('')

    return jsonify(response)


@app.route("/topBooks/", methods=['POST'])
def topBooks():
    print("inside topBooks")

    if session["username"] != '':
         response = adminController.topBooks('')

    return jsonify(response)

@app.route("/topUsers/", methods=['POST'])
def topUsers():
    print("inside topUsers")

    if session["username"] != '':
        response = adminController.topUsers('')

    return jsonify(response)

@app.route("/ordersTodays/", methods=['POST'])
def ordersTodays():
    print("inside ordersTodays")

    if session["username"] != '':
        response = excel.excelGen('')
    try:
        return send_file('./'+response,
                         attachment_filename=response)
    except Exception as e:
        return str(e)




def encode(key, string):
    encoded_chars = []
    for i in range(len(string)):
        key_c = key[i % len(key)]
        encoded_c = chr(ord(string[i]) + ord(key_c) % 256)
        encoded_chars.append(encoded_c)
    encoded_string = "".join(encoded_chars)
    return encoded_string

def decode(key, string):
    encoded_chars = []
    for i in range(len(string)):
        key_c = key[i % len(key)]
        encoded_c = chr(ord(string[i]) - ord(key_c) % 256)
        encoded_chars.append(encoded_c)
    encoded_string = "".join(encoded_chars)
    return encoded_string


@app.errorhandler(404)
# inbuilt function which takes error as parameter
def not_found(e):
    # defining function
    return render_template("404.html")

@app.errorhandler(500)
# inbuilt function which takes error as parameter
def not_found(e):
    # defining function
    return render_template("500.html")







if __name__ == '__main__':
    app.secret_key = 'namonamo'
    app.config['SESSION_TYPE'] = 'filesystem'
    #print(encode('DonaldTrump', 'Shreya'))
    #print(decode('DonaldTrump','×àÆåÅ'))
    #password = sha256_crypt.encrypt("Saurabh")
    #print(password);
    # password2 = sha256_crypt.encrypt("Shreya")

    # print(password)
    # print(password2)

    # print(sha256_crypt.verify("Shreya", password2))

    app.run()


