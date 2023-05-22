"""
Источник, генерирующий случайное число
Тип: Отдельный запрос
Доступ: GET-запросы
Формат выходных данных: 
{
    value: число | "Или какой-нибудь текст"
} 
"""
from flask import Flask, jsonify
import random

app = Flask(__name__)


@app.after_request
def add_cors_headers(response):
    response.headers['Access-Control-Allow-Origin'] = '*'
    response.headers['Access-Control-Allow-Methods'] = 'GET'
    response.headers['Access-Control-Allow-Headers'] = 'Content-Type'

    return response


@app.route('/', methods=['GET'])
def get_query():
    return jsonify({"value": random.randint(0, 9)})


if __name__ == '__main__':
    app.run(host='localhost', port=9989)
