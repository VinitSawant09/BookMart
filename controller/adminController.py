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