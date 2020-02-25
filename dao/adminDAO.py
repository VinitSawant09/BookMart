import pyodbc

from dao.db import dataBase as database

class adminDAO:

    def __init__(self):
        self.conn = pyodbc.connect('Driver={SQL Server};'
                                   'Server=HP\\SQLEXPRESS;'
                                   'Database=BookMart;'
                                   'Trusted_Connection=yes;'
                                   )

    def addBooks(self, title, author, desc, cost, year):

        print("inside addBooks in dao")

        db = database()
        cursor = db.insertdbConn(self.conn)
        try:
            cursor.execute("SELECT NEXT VALUE FOR SEQ_BOOK_ID")
            result = cursor.fetchone()
            print(result[0])
            sql = 'insert into dbo.BM_BOOKS (BOOKID, TITLE, AUTHOR, BOOK_DESCRIPTION, COST, P_YEAR) values(?,?,?,?,?,?)'
            with self.conn as cursor:
                print("execute")
                cursor.execute(sql, result[0], title, author, desc, cost, year)
            return result[0]
        except:
            ("Something went wrong.!! Contact the administrator.!")
        finally:
            cursor.close()

        return 0
