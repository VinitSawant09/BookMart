import pyodbc

from dao.db import dataBase as database
database = database()
class userLoginDAO:

    def __init__(self):
      self.login=""

    def validateUserLogin(self, user, pw):

        try:

            cursor = database.dbConn()
            sql = 'SELECT * FROM dbo.BM_USERS where UserName=?'
            cursor.execute(sql,user)
            records = cursor.fetchall()
            print(records)
            for row in records:

                if row[2] == pw:
                    return 0
                else:
                    return 1
        except:
            ("Something went wrong.!! Contact the administrator.!")

u=userLoginDAO()
u.validateUserLogin('Vinit','Vinit')