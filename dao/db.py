import pyodbc
class dataBase:

    def __init__(self):
        try:
           self.conn = pyodbc.connect('Driver={SQL Server};'
                             'Server=HP\\SQLEXPRESS;'
                              'Database=BookMart;'
                              'Trusted_Connection=yes;'
                              )
        except:
            print("Something went wrong in database connection.!! Contact the administrator.!")

    def dbConn(self):
        try:

           cursor = self.conn.cursor()

           return cursor;
        except:
            ("Something went wrong in database connection.!! Contact the administrator.!")


