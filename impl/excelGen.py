import xlsxwriter
from datetime import datetime
from dao.adminDAO import adminDAO as adminDAO

class ExcelGen:


    def excelGen(self):
        # Workbook() takes one, non-optional, argument
        # which is the filename that we want to create.
        todaysdate = datetime.today().strftime('%d-%m-%y')
        workbook = xlsxwriter.Workbook(todaysdate+'.xlsx')

        title = ['Transaction Id .', 'UserName ', 'BookName', 'Address',
                 'Contact no', 'Transaction Time','Receiver name', 'Price'
                ]
        row = 0
        col = 0
        j = 0
        bold = workbook.add_format({'bold': True})
        # The workbook object is then used to add new
        # worksheet via the add_worksheet() method.
        worksheet = workbook.add_worksheet()
        worksheet.write('A1', 'Transaction Id .', bold)
        worksheet.write('B1', 'UserName ', bold)
        worksheet.write('C1', 'BookName ', bold)
        worksheet.write('D1', 'Address ', bold)
        worksheet.write('E1', 'Contact no ', bold)
        worksheet.write('F1', 'Receiver name ', bold)
        worksheet.write('G1', 'Price', bold)
        # Use the worksheet object to write
        # data via the write() method.
        response = adminDAO.ordersTodays('')

        # Start from the first cell below the headers.
        row = 1
        col = 0
        print(len(response))
        rowTable = len(response)
        tr=0
        # Iterate over the data and write it out row by row.
        for x in range(1, rowTable+1) :
            worksheet.write(x, 0, response[tr][0])
            worksheet.write(x , 1, response[tr][1])
            worksheet.write(x, 2, response[tr][2])
            worksheet.write(x, 3, response[tr][3])
            worksheet.write(x, 4,response[tr][4])
            worksheet.write(x, 5, response[tr][5])
            worksheet.write(x , 6, response[tr][6])
            tr=tr+1
        # Finally, close the Excel file
        # via the close() method.
        workbook.close()
        return todaysdate+'.xlsx'
