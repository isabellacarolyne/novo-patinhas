import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

class EmailSender:
    def __init__(self, ):
        self.smtp_server = 'smtp.gmail.com'
        self.port = 587 
        self.sender_email = 'app.patinhas@gmail.com'
        self.password = 'gymc rshk tvqy daro'

    def send_email(self, receiver_email, subject, message):
        msg = MIMEMultipart()
        msg['From'] = self.sender_email
        msg['To'] = receiver_email
        msg['Subject'] = subject

        msg.attach(MIMEText(message, 'plain'))

        with smtplib.SMTP(self.smtp_server, self.port) as server:
            server.starttls()
            server.login(self.sender_email, self.password)
            server.send_message(msg)


