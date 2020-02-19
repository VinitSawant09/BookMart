from dao.userLoginDAO import userLoginDAO as userLoginDAO

luserLoginDAO = userLoginDAO()
class userLogin:

    def __init__(self):
        self.loginId = ""
        self.password = ""
        self.validUser = ""

    def validateUserLogin(self):
         luserLoginDAO.validateUserLogin()


