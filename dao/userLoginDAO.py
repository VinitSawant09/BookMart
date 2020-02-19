from dao.db import dataBase as database
class userLoginDAO:

    def __init__(self):
        self.loginId = ""
        self.password = ""
        self.validUser = ""

    def validateUserLogin(self,cursor):
        try:
            cursor.execute('SELECT * FROM dbo.Employee')
            dash = '-' * 180
            print(dash)
            print(
                '{:<5s}{:>30s}{:>30s}{:>30s}{:>30s}{:>30s}'.format("Id", "Name", "Designation", "DOB", "PPS", "Salary"))
            print(dash)
            for row in cursor:
                print('{:<5s}{:>30s}{:>30s}{:>30s}{:>30s}{:>30s}'.format(str(row[0]), row[1], row[2], row[4], row[5],
                                                                         str(row[6])))
        except:
            ("Something went wrong.!! Contact the administrator.!")

