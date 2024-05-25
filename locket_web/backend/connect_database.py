import mysql.connector
from PIL import Image
from io import BytesIO
        
# # Thực hiện kết nối đến cơ sở dữ liệu MySQL
# conn = mysql.connector.connect(
#     host="localhost",          # Địa chỉ máy chủ MySQL
#     user="root",           # Tên người dùng MySQL
#     password="1234",       # Mật khẩu của người dùng MySQL
#     database="websocket"   # Tên cơ sở dữ liệu MySQL
# )


# Sau khi làm việc với cơ sở dữ liệu, đừng quên đóng kết nối
import mysql.connector

def connect():
    global conn
    try:
        conn = mysql.connector.connect(
            host='localhost',    # Change hostname if necessary
            user='root',  # Change username
            password='',  # Change password
            database='locket'
        )
        print("kết nối với MySQL thành công")
    except mysql.connector.Error as err:
        print("kết nối với MySQL không thành công", err)
    return conn

def disconnect():
    if conn:
        conn.close()
        print("đã dừng kết nối với MySQL")


def signUp(username,password,email,full_name,date_of_birth,gender,file):
    connect()
    cursor = conn.cursor()
    cursor.execute('INSERT INTO user_information (username, password, email, full_name, date_of_birth, gender,image) VALUES (%s, %s, %s, %s, %s, %s,%s)', 
                        (username, password, email, full_name, date_of_birth, gender,file))
    # Lấy id_user vừa thêm
    user_id = cursor.lastrowid

    # Thêm dữ liệu vào bảng status
    add_status = ("INSERT INTO status_user (id_user) VALUES (%s)")
    status_data = (user_id,)
    cursor.execute(add_status, status_data)

    conn.commit()
def signIn(username,password):
    connect()
    cursor = conn.cursor()
    cursor.execute('SELECT id_user FROM user_information WHERE username = %s AND password = %s', (username, password))
    user = cursor.fetchone()
    return user

def create_post(content,file,date,id_user):
    connect()
    cursor = conn.cursor()
    cursor.execute('INSERT INTO post (image,content,time_post,id_user) VALUES (%s, %s, %s, %s)', 
                        (file, content, date,id_user))
    conn.commit()
    if cursor.rowcount > 0:
        return True  # Trả về True nếu có ít nhất một hàng được thêm thành công
    else:
        return False

def select_post_user(id_user):
    connect()
    cursor = conn.cursor()
    cursor.execute('''SELECT 
    DISTINCT user_information.id_user, 
    user_information.full_name, 
    user_information.image AS user_image, 
    post.content, 
    post.image AS post_image, 
    post.time_post, 
    post.like, 
    post.id_post
FROM 
    post
JOIN 
    user_information ON post.id_user = user_information.id_user
LEFT JOIN 
    friendships ON (user_information.id_user = friendships.user_id OR user_information.id_user = friendships.friend_id)
WHERE 
    user_information.id_user = %s OR 
    friendships.user_id = %s OR 
    friendships.friend_id = %s
ORDER BY 
    post.time_post DESC;''', ( id_user,id_user,id_user,))
    posts = cursor.fetchall()
    # In kết quả
    # for row in posts:
    #     print(row)
    return posts

def search_name(text_name,id_client):
    connect()
    cursor = conn.cursor()
    cursor.execute('SELECT id_user,image,full_name FROM user_information WHERE full_name LIKE %s AND id_user != %s', ('%' + text_name + '%', id_client,))
    posts = cursor.fetchall()
    # In kết quả
    # for row in posts:
    #     print(row)
    return posts

def insert_friend(id_fiend,id_user):
    connect()
    cursor = conn.cursor()
    cursor.execute('INSERT INTO friendships (user_id,friend_id) VALUES ( %s, %s)', 
                        (id_user, id_fiend))
    cursor.execute('INSERT INTO friendships (user_id,friend_id) VALUES ( %s, %s)', 
                        (id_fiend, id_user))
    conn.commit()
    if cursor.rowcount > 0:
        return True  # Trả về True nếu có ít nhất một hàng được thêm thành công
    else:
        return False

def check_friend(id_fiend,id_user):
    connect()
    cursor = conn.cursor()
    cursor.execute('SELECT id FROM friendships WHERE user_id = %s AND friend_id = %s', (id_user, id_fiend))
    friend = cursor.fetchone()
    return friend

def confirm_friendship(id_user):
    connect()
    cursor = conn.cursor()
    cursor.execute('''SELECT id,user_id,user_information.full_name,image FROM friendships 
        JOIN user_information ON friendships.user_id = user_information.id_user 
        and friendships.status='pending' and friendships.friend_id= %s''', ( id_user,))
    posts = cursor.fetchall()
    # In kết quả
    # for row in posts:
    #     print(row)
    return posts
def agree_friend(id_friend,id_user):
    connect()
    cursor = conn.cursor()
    cursor.execute("UPDATE friendships SET status = 'accepted' WHERE user_id = %s and friend_id=%s;", 
                        (id_user, id_friend))
    cursor.execute("UPDATE friendships SET status = 'accepted' WHERE user_id = %s and friend_id=%s;", 
                        (id_friend, id_user))
    conn.commit()
    if cursor.rowcount > 0:
        return True  # Trả về True nếu có ít nhất một hàng được thêm thành công
    else:
        return False
def setting_profile(id_user):
    connect()
    cursor = conn.cursor()
    cursor.execute('SELECT id_user,image,full_name FROM user_information WHERE id_user= %s', ( id_user,))
    user = cursor.fetchone()
    return user
def get_friend(id_user):
    connect()
    cursor = conn.cursor()
    cursor.execute('''SELECT full_name,friend_id FROM friendships
    JOIN user_information ON friendships.friend_id = user_information.id_user and friendships.status='accepted' and friendships.user_id=%s;''', ( id_user,))
    users = cursor.fetchall()
    return users
def save_mess(sender_id,receiver_id,message):
    connect()
    cursor = conn.cursor()
    cursor.execute('''INSERT INTO mess (sender_id,receiver_id,message) VALUES ( %s, %s, %s)''', ( sender_id,receiver_id,message))
    conn.commit()
    if cursor.rowcount > 0:
        return True  # Trả về True nếu có ít nhất một hàng được thêm thành công
    else:
        return False
def get_mess(sender_id,receiver_id):
    connect()
    cursor = conn.cursor()
    cursor.execute('''SELECT sender_id, receiver_id, message, times
FROM locket.mess
WHERE (sender_id = %s AND receiver_id = %s)
   OR (sender_id = %s AND receiver_id = %s) ORDER BY times ASC;''', ( sender_id,receiver_id,receiver_id,sender_id))
    user = cursor.fetchall()
    return user
def update_post(id_post ,content ,img):
    connect()
    cursor = conn.cursor()
    cursor.execute("UPDATE post SET content = %s,image=%s WHERE id_post =%s ;", 
                        (content,img, id_post))
    conn.commit()
    if cursor.rowcount > 0:
        return True  # Trả về True nếu có ít nhất một hàng được sửa thành công
    else:
        return False



