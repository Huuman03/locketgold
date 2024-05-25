from flask import request, jsonify
from backend.connect_database import create_post,connect
def cr_post():
        file = request.files['image'].read()
        content = request.form['content']
        date = request.form['date']
        if create_post(content,file,date):
                return jsonify({'sucsses': 'true'})
        else:
                return jsonify({'error': 'failed'})


# formData.append('content', content);
# formData.append('image', file);
# formData.append('date', getDateTime());
