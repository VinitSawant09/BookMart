from datetime import date

import pyodbc

from dao.db import dataBase as database

class userLoginDAO:

    def __init__(self):
        self.conn = pyodbc.connect('Driver={SQL Server};'
                                   'Server=HP\\SQLEXPRESS;'
                                   'Database=BookMart;'
                                   'Trusted_Connection=yes;'
                                   )

    def validateUserLogin(self, data):

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
        db = database()
        cursor = db.insertdbConn(self.conn)
        try:
            miscObj = userLoginDAO()
            flag = miscObj.checkExistingUser(username, cursor)
            if flag!=1 :
                userStatus=0
                userType= 'User'

                sql = 'insert into dbo.BM_USERS (UserId,UserName,UserPassword,UserStatus,UserType) values(next value for dbo.SEQ_USER_ID,?,?,?,?)'
                with self.conn as cursor:
                    print("execute")
                    cursor.execute(sql, username, password, userStatus, userType)
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
            cursor.execute(sql, username)
            records = cursor.fetchall()
            for row in records:
                    response = 1
                    return response

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