from dao.db import dataBase as database

class userLoginDAO:

    def __init__(self):
      self.login=""

    def validateUserLogin(self, data):

        print("inside validateUserLogin in dao")
        username = data.get('username')
        print(username)
        password = data.get('password')
        print(password)
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

