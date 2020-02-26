from dao.adminDAO import adminDAO as adminDAO

class adminController:

    def addBooks (title, author, desc, cost, year,file):

         print("inside addBooks")
         ladminDAO = adminDAO()

         response = ladminDAO.addBooks(title, author, desc, cost, year, file)

         return response