from flask import request
from backend.connect_database import signUp,connect
def sign_up():
    username = request.form['username']
    password = request.form['password']
    email = request.form['email']
    full_name = request.form['full_name']
    date_of_birth = request.form['date_of_birth']
    gender = request.form['gender'] 
    signUp(username,password,email,full_name,date_of_birth,gender)
    return 'dang ky thanh cong'