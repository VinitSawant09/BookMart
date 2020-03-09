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

    def removeCart(self, data):

        print("inside removeCart in dao")
        print(data)
        response = 0
        db = database()

        try:

            cursor = db.insertdbConn(self.conn)
            sql = 'delete FROM dbo.BM_CART where CARTID=?'

            with self.conn as cursor:
                cursor.execute(sql, data)

            return 0

        except:
            ("Something went wrong.!! Contact the administrator.!")
        finally:
            cursor.close()
        return response

    def countUsers(self):

        print("inside countUsers in dao")

        response = 0
        db = database()
        usertype = 'User'
        try:

            cursor = db.dbConn()
            sql = 'SELECT COUNT(*) FROM dbo.BM_USERS where USERTYPE=?'
            cursor.execute(sql, usertype)
            rowlist = cursor.fetchall()

            for row in rowlist:
                response = row[0]

        except:
            ("Something went wrong.!! Contact the administrator.!")
        finally:
            cursor.close()
        return response

    def transacCount(self):

        print("inside transacCount in dao")

        db = database()
        response = []

        try:

            cursor = db.dbConn()
            sql = 'SELECT count(*) AS orderCount,sum(case when convert(date,TRANSACTIONTIME) = CONVERT (date, SYSDATETIME())  then 1 else 0 end) AS TODAY,sum(case when convert(date,TRANSACTIONTIME) = DATEADD(DAY, -1, CONVERT (date, SYSDATETIME()))   then 1 else 0 end) AS TODAY1,sum(case when convert(date,TRANSACTIONTIME) = DATEADD(DAY, -2, CONVERT (date, SYSDATETIME()))   then 1 else 0 end) AS TODAY2,sum(case when convert(date,TRANSACTIONTIME) = DATEADD(DAY, -3, CONVERT (date, SYSDATETIME())) then 1 else 0 end) AS TODAY3,sum(case when convert(date,TRANSACTIONTIME) = DATEADD(DAY, -4, CONVERT (date, SYSDATETIME()))  then 1 else 0 end) AS TODAY4 ,sum(case when convert(date,TRANSACTIONTIME) = DATEADD(DAY, -5, CONVERT (date, SYSDATETIME()))  then 1 else 0 end) AS TODAY5,sum(case when convert(date,TRANSACTIONTIME) = DATEADD(DAY, -6, CONVERT (date, SYSDATETIME()))  then 1 else 0 end) AS TODAY6,sum(case when convert(date,TRANSACTIONTIME) = DATEADD(DAY, -7, CONVERT (date, SYSDATETIME()))  then 1 else 0 end) AS TODAY7 FROM dbo.BM_TRANSACTION'
            cursor.execute(sql)
            rowlist = cursor.fetchall()

            for row in rowlist:
                response.append([x for x in row])



        except:
            ("Something went wrong.!! Contact the administrator.!")
        finally:
            cursor.close()
        return response

    def salesCount(self):

        print("inside salesCount in dao")

        db = database()
        response = []

        try:

            cursor = db.dbConn()
            sql = "SELECT sum(PRICE) AS TOTALCOST, sum(case when convert(date,TRANSACTIONTIME) = CONVERT (date, SYSDATETIME())  then PRICE else 0 end) AS TODAY,sum(case when convert(date,TRANSACTIONTIME) = DATEADD(DAY, -1, CONVERT (date, SYSDATETIME()))   then PRICE else 0 end) AS TODAY1,sum(case when convert(date,TRANSACTIONTIME) = DATEADD(DAY, -2, CONVERT (date, SYSDATETIME()))   then PRICE else 0 end) AS TODAY2,sum(case when convert(date,TRANSACTIONTIME) = DATEADD(DAY, -3, CONVERT (date, SYSDATETIME())) then PRICE else 0 end) AS TODAY3,sum(case when convert(date,TRANSACTIONTIME) = DATEADD(DAY, -4, CONVERT (date, SYSDATETIME()))  then PRICE else 0 end) AS TODAY4 ,sum(case when convert(date,TRANSACTIONTIME) = DATEADD(DAY, -5, CONVERT (date, SYSDATETIME()))  then PRICE else 0 end) AS TODAY5,sum(case when convert(date,TRANSACTIONTIME) = DATEADD(DAY, -6, CONVERT (date, SYSDATETIME()))  then PRICE else 0 end) AS TODAY6,sum(case when convert(date,TRANSACTIONTIME) = DATEADD(DAY, -7, CONVERT (date, SYSDATETIME()))  then PRICE else 0 end) AS TODAY7 FROM dbo.BM_TRANSACTION"
            cursor.execute(sql)
            rowlist = cursor.fetchall()

            for row in rowlist:
                response.append([x for x in row])



        except:
            ("Something went wrong.!! Contact the administrator.!")
        finally:
            cursor.close()
        return response

    def topBooks(self):

        print("inside topBooks in dao")

        db = database()
        response = []

        try:

            cursor = db.dbConn()
            sql = 'select COUNT(*) AS BOOKSSOLD,BOOKNAME from BM_TRANSACTION GROUP BY BOOKNAME ORDER BY BOOKSSOLD DESC'
            cursor.execute(sql)
            rowlist = cursor.fetchall()

            for row in rowlist:
                response.append([x for x in row])



        except:
            ("Something went wrong.!! Contact the administrator.!")
        finally:
            cursor.close()
        return response

    def topUsers(self):

        print("inside topUsers in dao")

        db = database()
        response = []

        try:

            cursor = db.dbConn()
            sql='select COUNT(*) AS BOOKSSOLD,USERNAME from BM_TRANSACTION GROUP BY USERNAME ORDER BY BOOKSSOLD DESC'
            cursor.execute(sql)
            rowlist = cursor.fetchall()

            for row in rowlist:
                response.append([x for x in row])



        except:
            ("Something went wrong.!! Contact the administrator.!")
        finally:
            cursor.close()
        return response

    def ordersTodays(self):

        print("inside ordersTodays in dao")

        db = database()
        response = []

        try:

            cursor = db.dbConn()
            sql = 'select TRANSACTIONID,USERNAME,BOOKNAME,ADDR,PHNO,RECEIVERNAME,PRICE from BM_TRANSACTION where convert(date,TRANSACTIONTIME)= CONVERT (date, SYSDATETIME())'
            cursor.execute(sql)
            rowlist = cursor.fetchall()

            for row in rowlist:
                response.append([x for x in row])



        except:
            ("Something went wrong.!! Contact the administrator.!")
        finally:
            cursor.close()
        return response



