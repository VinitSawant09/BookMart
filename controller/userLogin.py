from dao.userLoginDAO import userLoginDAO as userLoginDAO

class userLogin:


    def validateUserLogin (data,session):

         print("inside validateUserLogin")
         luserLoginDAO = userLoginDAO()

         val = luserLoginDAO.validateUserLogin(data,session)

         return val

    def registerUser (data):

         print("inside registerUser")
         luserLoginDAO = userLoginDAO()

         val = luserLoginDAO.registerUser(data)

         return val

    def changePassword (username,password):

         print("inside changePassword")
         luserLoginDAO = userLoginDAO()
         print(password)
         print(username)
         val = luserLoginDAO.changePassword(username,password)

         return val

    def fetchEmail (data):

         print("inside fetchEmail")
         luserLoginDAO = userLoginDAO()

         val = luserLoginDAO.fetchEmail(data)

         return val


