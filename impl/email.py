import smtplib, ssl
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import random
import string

class email:

    def __init__(self):
        try:
            pass

        except:
            print("Something went wrong in database connection.!! Contact the administrator.!")

    def genPassword(self,stringLength=10):
        letters = string.ascii_lowercase

        password = ''.join(random.choice(letters) for i in range(stringLength))

        return password

    def sendEmail(self,userEmail,rpassword):
        print("inside sendEmail")
        smtp_server = "smtp.gmail.com"
        port = 587  # For starttls
        sender_email = "#"
        password = "#"
        # Create a secure SSL context
        context = ssl.create_default_context()

        if rpassword!='':
            # Try to log in to server and send email

            try:
                server = smtplib.SMTP(smtp_server, port)

                server.starttls(context=context)  # Secure the connection

                server.login(sender_email, password)

                # TODO: Send email here
                message = MIMEMultipart("alternative")
                message["Subject"] = "multipart test"
                message["From"] = sender_email
                message["To"] = userEmail
                text = "Hi, your password is "+rpassword

                part = MIMEText(text, "plain")
                message.attach(part)
                context = ssl.create_default_context()

                with smtplib.SMTP_SSL("smtp.gmail.com", 465, context=context) as server:
                    server.login(sender_email, password)
                    server.sendmail(
                        sender_email, userEmail, message.as_string()
                    )
                return 0

            except:
                print("Something went wrong !! Contact the administrator.!")


    def sendOrderEmail(self,userEmail,data):
        print("inside sendOrderEmail")
        smtp_server = "smtp.gmail.com"
        port = 587  # For starttls
        sender_email = "vinitvilassawant@gmail.com"
        password = "9167041011"
        # Create a secure SSL context
        context = ssl.create_default_context()

        if data.get('bookname') !='':
            print("inside")
            # Try to log in to server and send email

            try:
                server = smtplib.SMTP(smtp_server, port)

                server.starttls(context=context)  # Secure the connection

                server.login(sender_email, password)

                # TODO: Send email here
                message = MIMEMultipart("alternative")
                message["Subject"] = "Book Mart Order Confirmation"
                message["From"] = sender_email
                message["To"] = userEmail
                text = "Hi, Your order has been successfully placed for the book   " + data.get('bookname') + " Your order will be delivered within 5 working days. Thanks for shopping at BookMart."

                part = MIMEText(text, "plain")
                message.attach(part)
                context = ssl.create_default_context()

                with smtplib.SMTP_SSL("smtp.gmail.com", 465, context=context) as server:
                    server.login(sender_email, password)
                    server.sendmail(
                        sender_email, userEmail, message.as_string()
                    )
                return 0

            except:
                print("Something went wrong !! Contact the administrator.!")
