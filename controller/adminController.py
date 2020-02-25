from dao.adminDAO import adminDAO as adminDAO

class adminController:

    def addBooks (title, author, desc, cost, year):

         print("inside addBooks")
         ladminDAO = adminDAO()

         response = ladminDAO.addBooks(title, author, desc, cost, year)

         return response