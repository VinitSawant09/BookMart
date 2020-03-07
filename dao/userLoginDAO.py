from datetime import date
import time

import pyodbc
from flask import session

from dao.db import dataBase as database

class userLoginDAO:

    def __init__(self):
        self.conn = pyodbc.connect('Driver={SQL Server};'
                                   'Server=HP\\SQLEXPRESS;'
                                   'Database=BookMart;'
                                   'Trusted_Connection=yes;'
                                   )

    def validateUserLogin(self, data, session):

        print("inside validateUserLogin in dao")
        username = data.get('username')

        password = data.get('password')

        response=1
        try:
            objdatabase = database()
            cursor = objdatabase.dbConn()
            sql = 'SELECT * FROM dbo.BM_USERS where UserName=?'
            cursor.execute(sql, username)
            records = cursor.fetchall()
            print(records)
            for row in records:
                if row[2] == password:
                    response=0
                    session["userType"] = row[4]


                    return response

            return response
        except:
            ("Something went wrong.!! Contact the administrator.!")
        finally:
            cursor.close()

    def registerUser(self, data):

        print("inside registerUser in dao")
        username = data.get('username')
        password = data.get('password')
        email = data.get('email')
        db = database()
        cursor = db.insertdbConn(self.conn)
        try:
            miscObj = userLoginDAO()
            flag = miscObj.checkExistingUser(username, cursor)
            if flag!=1 :
                userStatus=0
                userType= 'User'

                sql = 'insert into dbo.BM_USERS (UserId,UserName,UserPassword,UserStatus,UserType,Email) values(next value for dbo.SEQ_USER_ID,?,?,?,?,?)'
                with self.conn as cursor:
                    print("execute")
                    cursor.execute(sql, username, password, userStatus, userType, email)
            else:
                return 1
            return 0
        except:
            ("Something went wrong.!! Contact the administrator.!")
        finally:
            cursor.close()

    def checkExistingUser(self, username, cursor):

        print("inside checkExistingUser in dao")

        response = 0
        try:
            sql = 'SELECT * FROM dbo.BM_USERS where UserName=?'
            print(sql)
            cursor.execute(sql, username)
            records = cursor.fetchall()
            print(records)
            for row in records:

                    response = response+1

            return response
        except:
            ("Something went wrong.!! Contact the administrator.!")



    def changePassword(self, username,password):

        print("inside changePassword in dao")

        db = database()
        cursor = db.insertdbConn(self.conn)
        try:
            sql = 'update  dbo.BM_USERS set UserPassword=? where UserName=?'
            with self.conn as cursor:
                print("execute")
                cursor.execute(sql, password, username)
            return 0
        except:
            ("Something went wrong.!! Contact the administrator.!")
        finally:
            cursor.close()

    def fetchEmail(self, data):

        print("inside fetchEmail in dao")

        response = ''
        try:
            objdatabase = database()
            cursor = objdatabase.dbConn()
            sql = 'SELECT Email FROM dbo.BM_USERS where UserName=?'
            cursor.execute(sql, data)
            records = cursor.fetchall()
            print(records)

            for row in records:
                response = row[0]

            return response
        except:
            ("Something went wrong.!! Contact the administrator.!")
        finally:
            cursor.close()

    def checkPassword(self, username, userdata):

        print("inside checkPassword in dao")
        password = userdata.get('password')

        response = 1
        try:
            objdatabase = database()
            cursor = objdatabase.dbConn()
            sql = 'SELECT UserPassword FROM dbo.BM_USERS where UserName=?'
            cursor.execute(sql, username)
            records = cursor.fetchall()
            print(records)
            for row in records:
                if row[0] == password:
                    response =  0
                    return response

            return response
        except:
            ("Something went wrong.!! Contact the administrator.!")
        finally:
            cursor.close()

    def getAllBooks(self):

        print("inside getAllBooks in dao")

        response = []

        try:
            objdatabase = database()
            cursor = objdatabase.dbConn()
            sql = 'SELECT BOOKID, TITLE, AUTHOR, BOOK_DESCRIPTION, COST, P_YEAR, IMAGE  FROM dbo.BM_BOOKS'
            cursor.execute(sql)
            rowlist = cursor.fetchall()

            for row in rowlist:
                #response.append(row)

                response.append([x for x in row])
            print(len(response))
            session["bookcount"] = len(response)

        except:
            ("Something went wrong.!! Contact the administrator.!")
        finally:
            cursor.close()
        return response

    def getUserCount(self):

        print("inside getUserCount in dao")

        count =0

        try:
            objdatabase = database()
            cursor = objdatabase.dbConn()
            sql = 'select COUNT(*) from  dbo.BM_USERS where USERTYPE=\'User\''
            cursor.execute(sql)
            rowlist = cursor.fetchall()

            for row in rowlist:
                count = row[0]
            print(count)


        except:
            ("Something went wrong.!! Contact the administrator.!")
        finally:
            cursor.close()
        return count

    def orderBook(self, data):

        print("inside orderBook in dao")
        bookname = data.get('bookname')

        userName = session["username"]
        recvName = data.get('recvName')
        addr = data.get('addr')
        phno = data.get('phno')
        price = data.get('price')

        db = database()
        cursor = db.insertdbConn(self.conn)
        try:

                sql = 'insert into dbo.BM_TRANSACTION (TRANSACTIONID,USERNAME,BOOKNAME,ADDR,PHNO,TRANSACTIONTIME,RECEIVERNAME,PRICE) values(next value for dbo.SEQ_TRANSAC_ID,?,?,?,?,GETDATE(),?,?)'
                with self.conn as cursor:
                    print("execute")
                    cursor.execute(sql, userName, bookname, addr, phno, recvName, price)
                return 0
        except:
            ("Something went wrong.!! Contact the administrator.!")
        finally:
            cursor.close()


    def getorderBookUser(self,data):

        print("inside getorderBookUser in dao")

        response = []

        try:
            objdatabase = database()
            cursor = objdatabase.dbConn()
            sql = 'SELECT * FROM dbo.BM_TRANSACTION where USERNAME=?'
            cursor.execute(sql,data)
            rowlist = cursor.fetchall()

            for row in rowlist:
                response.append([x for x in row])
            print(len(response))


        except:
            ("Something went wrong.!! Contact the administrator.!")
        finally:
            cursor.close()
        return response

    def getallorderBook(self):

        print("inside getallorderBook in dao")

        response = []

        try:
            objdatabase = database()
            cursor = objdatabase.dbConn()
            sql = 'SELECT * FROM dbo.BM_TRANSACTION'
            cursor.execute(sql)
            rowlist = cursor.fetchall()

            for row in rowlist:
                response.append([x for x in row])
            print(len(response))


        except:
            ("Something went wrong.!! Contact the administrator.!")
        finally:
            cursor.close()
        return response

    def fetchCart(self,data):

        print("inside fetchCart in dao")

        response = []

        try:
            objdatabase = database()
            cursor = objdatabase.dbConn()
            sql = 'SELECT * FROM dbo.BM_CART where USERNAME=?'
            cursor.execute(sql, data)
            rowlist = cursor.fetchall()

            for row in rowlist:
                response.append([x for x in row])
            print(len(response))


        except:
            ("Something went wrong.!! Contact the administrator.!")
        finally:
            cursor.close()
        return response


