"""
Источник, генерирующий данные формулы sin(x)
Тип: График
Доступ: GET-запросы
Формат выходных данных: 
{
    "data": {
        "x_label": "Значения по х"
        "y_label": "Значения функции синуса",
        "x_values": [1, 2, 3, 4, 5, 6, ... n],
        "y_values": [0.0, 0.56, 0.71, ... n]
    }
} 
"""
from flask import Flask, jsonify
import math
import gc

app = Flask(__name__)

x_label = "Ось X"
y_label = "Ось Y"
x = 0


@app.after_request
def add_cors_headers(response):
    response.headers['Access-Control-Allow-Origin'] = '*'
    response.headers['Access-Control-Allow-Methods'] = 'GET'
    response.headers['Access-Control-Allow-Headers'] = 'Content-Type'

    return response


def generate_chart_data():
    global x
    x_values = []
    y_values = []
    for i in range(100):
        x_values.append(x)
        y_values.append(math.sin(x))
        x += 0.5
    yield {
        "data": {
            "x_label": x_label,
            "y_label": y_label,
            "x_values": x_values,
            "y_values": y_values
        }
    }
    del (x_values)
    del (y_values)
    gc.collect()


@app.route('/', methods=['GET'])
def get_chart_data():
    return jsonify(list(generate_chart_data()))


if __name__ == '__main__':
    app.run(host='chart.com', port=9988)
