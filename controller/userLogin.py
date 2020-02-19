from dao.userLoginDAO import userLoginDAO as userLoginDAO

class userLogin:



    def validateUserLogin (data):

         print("inside validateUserLogin")
         luserLoginDAO = userLoginDAO()

         val = luserLoginDAO.validateUserLogin(data)

         return val

    def registerUser (data):

         print("inside registerUser")
         luserLoginDAO = userLoginDAO()

         val = luserLoginDAO.registerUser(data)

         return val


