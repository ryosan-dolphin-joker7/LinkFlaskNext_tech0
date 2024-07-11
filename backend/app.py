from flask import Flask, request  # Flaskとrequestモジュールをインポート
from flask import jsonify  # jsonifyモジュールをインポート
import json  # jsonモジュールをインポート
from flask_cors import CORS  # CORSモジュールをインポート

from db_control import crud, mymodels  # crudとmymodelsをdb_controlからインポート

import requests  # requestsモジュールをインポート

from dotenv import load_dotenv  # load_dotenvモジュールをインポート
import os  # osモジュールをインポート

# .env ファイルを読み込みます
load_dotenv()

# 環境変数の使用
api_endpoint = os.getenv('API_ENDPOINT')

# APIエンドポイントの値をコンソールに出力
print(api_endpoint)

# Flaskアプリケーションを初期化
app = Flask(__name__)
# CORSを有効にする
CORS(app)

# Flaskのトップページを表示するルート
@app.route("/")
def index():
    return "<p>Flaskのトップページです！</p>"

# 顧客を作成するルート
@app.route("/customers", methods=['POST'])
def create_customer():
    values = request.get_json()  # リクエストボディからJSONデータを取得
    if not values:
        return jsonify({"error": "Invalid JSON payload"}), 400  # JSONデータがない場合のエラーレスポンス
    tmp = crud.myinsert(mymodels.Customers, values)  # データベースに顧客情報を挿入
    result = crud.myselect(mymodels.Customers, values.get("customer_id"))  # 顧客IDでデータを取得
    return result, 200  # 成功時のレスポンス

# 顧客を1つ読み取るルート
@app.route("/customers", methods=['GET'])
def read_one_customer():
    model = mymodels.Customers
    target_id = request.args.get('customer_id')  # クエリパラメータから顧客IDを取得
    result = crud.myselect(mymodels.Customers, target_id)  # 顧客IDでデータを取得
    return result, 200  # 成功時のレスポンス

# すべての顧客を読み取るルート
@app.route("/allcustomers", methods=['GET'])
def read_all_customer():
    model = mymodels.Customers
    result = crud.myselectAll(mymodels.Customers)  # すべての顧客データを取得
    return result, 200  # 成功時のレスポンス

# 顧客情報を更新するルート
@app.route("/customers", methods=['PUT'])
def update_customer():
    try:
        print("I'm in")
        values = request.get_json()  # リクエストボディからJSONデータを取得
        if not values:
            print("Invalid JSON payload")
            return jsonify({"error": "Invalid JSON payload"}), 400  # JSONデータがない場合のエラーレスポンス

        values_original = values.copy()  # 更新前のデータをコピー
        model = mymodels.Customers

        print("Updating customer with values:", values)
        try:
            tmp = crud.myupdate(model, values)  # 顧客データを更新
        except Exception as e:
            print("Update failed:", str(e))
            return jsonify({"error": f"Update failed: {str(e)}"}), 500  # 更新失敗時のエラーレスポンス

        print("Fetching updated customer")
        try:
            result = crud.myselect(mymodels.Customers, values_original.get("customer_id"))  # 更新後のデータを取得
        except Exception as e:
            print("Select failed:", str(e))
            return jsonify({"error": f"Select failed: {str(e)}"}), 500  # データ取得失敗時のエラーレスポンス

        return result, 200  # 成功時のレスポンス
    
    except Exception as e:
        print("Error occurred:", str(e))
        return jsonify({"error": str(e)}), 500  # エラーレスポンス

# 顧客を削除するルート
@app.route("/customers", methods=['DELETE'])
def delete_customer():
    model = mymodels.Customers
    target_id = request.args.get('customer_id')  # クエリパラメータから顧客IDを取得
    result = crud.mydelete(model, target_id)  # 顧客データを削除
    return result, 200  # 成功時のレスポンス

# テスト用のデータを外部APIから取得するルート
@app.route("/fetchtest")
def fetchtest():
    response = requests.get('https://jsonplaceholder.typicode.com/users')  # 外部APIにリクエストを送信
    return response.json(), 200  # 成功時のレスポンス
