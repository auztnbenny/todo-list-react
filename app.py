from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# In-memory data structure to store tasks
tasks = []
task_id = 1

@app.route('/tasks', methods=['GET'])
def get_tasks():
    return jsonify(tasks)

@app.route('/tasks', methods=['POST'])
def add_task():
    global task_id
    task = request.json.get('task')
    if task:
        new_task = {'id': task_id, 'description': task, 'completed': False}
        task_id += 1
        tasks.append(new_task)
        return jsonify({'message': 'Task added successfully', 'id': new_task['id']}), 201
    return jsonify({'error': 'No task provided'}), 400

@app.route('/tasks/<int:id>', methods=['DELETE'])
def delete_task(id):
    global tasks
    tasks = [task for task in tasks if task['id'] != id]
    return jsonify({'message': 'Task deleted successfully'}), 200

@app.route('/tasks/<int:id>', methods=['PUT'])
def update_task(id):
    global tasks
    task = request.json.get('task')
    if task:
        for t in tasks:
            if t['id'] == id:
                t['description'] = task
                return jsonify({'message': 'Task updated successfully'}), 200
    return jsonify({'error': 'Task not found'}), 404

if __name__ == '__main__':
    app.run(debug=True)
