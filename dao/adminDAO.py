import pyodbc

from dao.db import dataBase as database
import base64

class adminDAO:

    def __init__(self):
        self.conn = pyodbc.connect('Driver={SQL Server};'
                                   'Server=HP\\SQLEXPRESS;'
                                   'Database=BookMart;'
                                   'Trusted_Connection=yes;'
                                   )

    def addBooks(self, title, author, desc, cost, year, file):

        print("inside addBooks in dao")



        db = database()
        cursor = db.insertdbConn(self.conn)
        try:
            cursor.execute("SELECT NEXT VALUE FOR SEQ_BOOK_ID")
            result = cursor.fetchone()
            print(result[0])
            #cursor.execute("SELECT BulkColumn FROM Openrowset(Bulk ?, Single_Blob)", file)

           # blb_result = cursor.fetchone()
           # print(blb_result)
            sql = 'insert into dbo.BM_BOOKS (BOOKID, TITLE, AUTHOR, BOOK_DESCRIPTION, COST, P_YEAR, IMAGE) values(?,?,?,?,?,?,?)'
            with self.conn as cursor:
                print("execute")
                cursor.execute(sql, result[0], title, author, desc, cost, year, file)

        #    with open(file, 'rb') as f:
        #       bindata = f.read()
        #       cursor.execute("update dbo.BM_BOOKS set IMAGE =? where BOOKID=?", pyodbc.Binary(bindata),result[0])
            return result[0]
        except:
            ("Something went wrong.!! Contact the administrator.!")
        finally:
            cursor.close()
        return 0

    def addcart(self, username, bookid, title, author, desc, cost, year, image):

        print("inside addcart in dao")

        db = database()
        cursor = db.insertdbConn(self.conn)
        try:
            cursor.execute("SELECT NEXT VALUE FOR SEQ_BM_CART")
            result = cursor.fetchone()
            print(result[0])

            sql = 'insert into dbo.BM_CART (CARTID, BOOKID, TITLE, AUTHOR, BOOK_DESCRIPTION, COST, P_YEAR, IMAGE,USERNAME) values(?,?,?,?,?,?,?,?,?)'
            with self.conn as cursor:
                print("execute")
                cursor.execute(sql, result[0], bookid,  title, author, desc, cost, year, image,username)

            return result[0]
        except:
            ("Something went wrong.!! Contact the administrator.!")
        finally:
            cursor.close()
        return 0
