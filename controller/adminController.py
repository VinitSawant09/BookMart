from dao.adminDAO import adminDAO as adminDAO

class adminController:

    def addBooks (title, author, desc, cost, year,file):

         print("inside addBooks")
         ladminDAO = adminDAO()

         response = ladminDAO.addBooks(title, author, desc, cost, year, file)

         return response

    def addcart(username, bookid, title, author, desc, cost, year, image):
        print("inside addcart")
        ladminDAO = adminDAO()

        response = ladminDAO.addcart(username, bookid, title, author, desc, cost, year, image)

        return response
    def removeCart(data):
         print("inside removeCart")
         ladminDAO = adminDAO()

         val = ladminDAO.removeCart(data)

         return val

    def countUsers(data):
        print("inside countUsers")
        ladminDAO = adminDAO()

        val = ladminDAO.countUsers()

        return val

    def transacCount(data):
        print("inside transacCount")
        ladminDAO = adminDAO()

        val = ladminDAO.transacCount()

        return val