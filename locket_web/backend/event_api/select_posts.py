from flask import request, jsonify
from backend.connect_database import select_post,connect
def selec_post():
	data = []
	sql=[]
	for row in select_post():
		print(type(select_post()))
		# print(sql)
		data.append({'id_post': row[0],'image': row[1],'content': row[2],'like': row[3],'time_post': row[4]})
	return jsonify(data)

