from flask import request
from backend.connect_database import signIn,connect

def sign_in():
    username = request.form['username']
    password = request.form['password']
    sign=signIn(username,password)
    # if sign:
    #     print("đúng tài khoản")
    # else:
    #     print("không đúng tài khoản")
    return sign