from flask import Flask, jsonify,render_template,request,redirect,url_for,session, make_response
from flask_socketio import SocketIO
import sys
from datetime import datetime, timedelta
import os
import base64
from PIL import Image
import logging
import io
from flask_socketio import SocketIO, emit
sys.path.append('E:/doan/locket_web/backend')
from backend.connect_database import update_post, get_friend,setting_profile,agree_friend,confirm_friendship,signIn,connect,create_post,signIn,signUp,search_name,insert_friend,check_friend,select_post_user,save_mess,get_mess

def image_to_blob(file_path):
    # Đọc ảnh từ thư mục
    with open(file_path, 'rb') as file:
        img = Image.open(file)
        # Chuyển đổi ảnh thành dạng nhị phân
        img_byte_array = io.BytesIO()
        img.save(img_byte_array, format='JPEG')  # Thay đổi 'JPEG' thành định dạng ảnh của bạn nếu cần
        img_byte_array = img_byte_array.getvalue()
        return img_byte_array
def date(date):
    # Lấy thời gian hiện tại
    current_time = datetime.now()

    # Tính khoảng cách thời gian giữa date_from_mysql và thời gian hiện tại
    time_difference = current_time - date

    # Kiểm tra nếu thời gian cách đó chưa đến 1 ngày
    if time_difference < timedelta(days=1):
        # Tính số phút cách đó
        minutes_difference = int(time_difference.total_seconds() / 60)
        if minutes_difference < 60:
            time_ago = f"{minutes_difference} phút trước"
        else:
            hours_difference = minutes_difference // 60
            time_ago = f"{hours_difference} giờ trước"
    else:
        # Kiểm tra nếu thời gian cách đó chưa đến 1 tuần
        if time_difference < timedelta(weeks=1):
            days_difference = time_difference.days
            time_ago = f"{days_difference} ngày trước"
        else:
            # Nếu lớn hơn 1 tuần, hiển thị ngày tháng
            time_ago = date.strftime("%d/%m")
                # Kiểm tra nếu thời gian cách đó chưa đến 1 năm
            if time_difference < timedelta(days=365):
                time_ago = date.strftime("%d/%m")
            else:
                # Nếu lớn hơn 1 năm, hiển thị ngày tháng năm
                time_ago = date.strftime("%d/%m/%Y")
    return time_ago
app = Flask(__name__,static_url_path='/static')
app.config['SECRET_KEY'] = 'locket'
socketio = SocketIO(app, async_mode='eventlet')


@app.route('/')
def home():
    return render_template('signin.html')


@app.route('/signup', methods=['POST'])
def signup():
    if request.method=='POST':
        # for key, value in request.form.items():
        #     print(f'{key}: {value}')
        username = request.form['username']
        password = request.form['password']
        email = request.form['email']
        full_name = request.form['full_name']
        date_of_birth = request.form['date_of_birth']
        gender = request.form['gender']
        file = image_to_blob('E:/doan/locket_web/static/img/avatar_default.jpg')
        signUp(username,password,email,full_name,date_of_birth,gender,file)
    return jsonify({'message': 'đăng ký thành công!'})

@app.route('/signin', methods=['GET', 'POST'])
def signin():
    error = None
    if request.method=='POST':
        username = request.form['username']
        password = request.form['password']
        sign=signIn(username,password)
        id_user=str(sign[0])
        if sign:
            session['id_user'] = id_user
            resp = make_response('đã được thiết lập')
            resp.set_cookie('iduser_cookie', id_user, max_age=60*60*24*3)
            print(session)
            print(request.cookies)
            return resp
        else:
            error = 'Invalid username or password. Please try again.'
    return render_template('signin.html', error=error)

@app.route('/post',methods=['GET', 'POST'])
def post():
    # if request.method=='GET':
        
    return render_template('home.html')
@app.route('/create_posts', methods=['POST'])
def cr_posts():
    file = request.files['image'].read()
    
    content = request.form['content']
    date = request.form['date']
    id_user=request.form['id']
    print(file,content,date,id_user)
    if create_post(content,file,date,id_user):
        return jsonify({'sucsses': 'true'})
    else:
        return jsonify({'error': 'failed'})



@app.route('/search',methods=['GET', 'POST'])
def search():
    if request.method=='POST':
        text_search = request.form['search']
        id_client = request.form['id_client']
        data_name=search_name(text_search,int(id_client))
        data_with_base64 = []
        for row in data_name:
            id_user,image_bytes, username = row
            # Chuyển đổi bytes thành Base64 string
            image_base64 = base64.b64encode(image_bytes).decode('utf-8')
            # Thêm vào mảng mới
            data_with_base64.append((id_user, image_base64, username))

        # Trả về dữ liệu đã được chuyển đổi sang Base64 cho client
        return jsonify(data_with_base64)

    return render_template('search_friend.html')


@app.route('/c_friendship',methods=['GET'])
def confirm_friend():
    if request.method=='GET':
        id_user = request.args.get('id_user')
        # print(id_user)
        # print(type(id_user))
        data_name=confirm_friendship(int(id_user))
        data = []
        for row in data_name:

            id_friendship,id_friend, full_name,image_bytes = row
            # Chuyển đổi bytes thành Base64 string
            image_base64 = base64.b64encode(image_bytes).decode('utf-8')
            # Thêm vào mảng mới
            data.append((id_friendship, id_friend, full_name,image_base64))
        # Trả về dữ liệu đã được chuyển đổi sang Base64 cho client
        return jsonify(data)
@app.route('/makeFriend',methods=['POST'])
def make_friend():
    id_friend = request.form['id_friend']
    id_user = request.form['id_client']
    if check_friend(id_friend,id_user) is None:
        if insert_friend(id_friend,id_user):
            return jsonify({'sucsses': 1})
        else:
            return jsonify({'sucsses': 0})
    else:
        return jsonify({'sucsses': 2})

@app.route('/logout',methods=['POST'])
def logout():
    if request.method=='POST':
        # Xóa cookie
        response = make_response()  # Chuyển hướng đến trang đăng nhập
        response.set_cookie('iduser_cookie')     # Xóa cookie có tên 'session'
        # Xóa session
        session.clear()  # Xóa tất cả các biến trong session

    return response
@app.route('/setting',methods=['GET'])
def setting():
    return render_template('setting.html')
@app.route('/getsetting',methods=['GET'])
def getsetting():
    if request.method=='GET':
        id_user = request.args.get('id_user')
        # print(id_user)
        data_name=setting_profile(int(id_user))
        # print(data_name)
        id_user, image_bytes,full_name = data_name
        # Chuyển đổi bytes thành Base64 string
        image_base64 = base64.b64encode(image_bytes).decode('utf-8')
        # Thêm vào mảng mới
        data=[id_user, image_base64,full_name]
        # Trả về dữ liệu đã được chuyển đổi sang Base64 cho client
        return jsonify(data)

@app.route('/get_post_data',methods=['GET'])
def get_post():
    if request.method=='GET':
        id_user = request.args.get('id_user')
        # print(id_user)
        # print(type(id_user))
        data_name=select_post_user(int(id_user))
        data = []
        for row in data_name:
            # print(row)
            id_user,full_name, image_user,content,image_post,time,like,id_post = row
            # Chuyển đổi bytes thành Base64 string
            image_post_base64 = base64.b64encode(image_post).decode('utf-8')
            image_avarta_base64 = base64.b64encode(image_user).decode('utf-8')
            # Thêm vào mảng mới
            time_post=date(time)
            data.append((id_user,full_name, image_avarta_base64,content,image_post_base64,time_post,like,id_post))
        # Trả về dữ liệu đã được chuyển đổi sang Base64 cho client
        return jsonify(data)
@app.route('/agree_friend',methods=['POST'])
def agreefriend():
    id_friend = request.form['id_friend']
    id_user = request.form['id_client']   
    if agree_friend(id_friend,id_user):
        return jsonify({'sucsses': 1})
    else:
        return jsonify({'sucsses': 0})

@app.route('/mess')
def mess():
    return render_template('messenger.html')
@app.route('/get_friend',methods=['GET'])
def get_friends():
    if request.method=='GET':
        id_user = request.args.get('id_user')
        data_name=get_friend(int(id_user))
        return jsonify(data_name)

@app.route('/getmess',methods=['GET'])
def get_message():
    if request.method=='GET':
        sender_id = request.args.get('sender_id')
        receiver_id = request.args.get('receiver_id')
        print(sender_id,receiver_id)
        data_name=get_mess(int(sender_id),int(receiver_id))
        return jsonify(data_name)


        
@app.route('/update_posts',methods=['POST'])
def updt_post():
    file = request.files['image'].read()
    content = request.form['content']
    id_post=request.form['id']
    if update_post(id_post ,content ,file):
        return jsonify({'sucsses': 'true'})
    else:
        return jsonify({'error': 'failed'})
@app.route('/delete_post',methods=['POST'])
def delet_post():
    id_post=request.form['id']
    if delete_post(id_post):
        return jsonify({'sucsses': 'true'})
    else:
        return jsonify({'error': 'failed'})



@socketio.on('connect')
def handle_connect():
    print("đã kết nối websocket")

# @socketio.on('disconnect')
# def handle_disconnect():
#     for user_id, socket_id in clients.items():
#         if socket_id == request.sid:
#             del clients[user_id]
#             logging.info(f'Client {user_id} disconnected')
#             break
@socketio.on('message')
def handle_message(data):
    sender_id = data.get('sender_id')
    receiver_id = data.get('receiver_id')
    message = data.get('message')  # ID của client nhận tin nhắn
    print(f'Received message from {sender_id} to {receiver_id}: {message}')

    # Lưu tin nhắn vào cơ sở dữ liệu
    save_mess(sender_id,receiver_id,message)
    emit('message', {'sender_id': sender_id, 'receiver_id': receiver_id, 'message': message}, broadcast=True)
if __name__ == '__main__':
    # app.run(debug=True)
    socketio.run(app, debug=True)







