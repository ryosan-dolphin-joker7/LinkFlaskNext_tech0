"use client"; // Next.jsのクライアントサイドで実行されることを示す
import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation"; // Next.jsのルーティング用フックをインポート
import fetchCustomer from "./fetchCustomer"; // 顧客情報を取得する関数をインポート
import updateCustomer from "./updateCustomer"; // 顧客情報を更新する関数をインポート
import Link from "next/link"; // Linkコンポーネントをインポート

// 顧客情報を更新するページコンポーネント
export default function UpdatePage(props) {
  const router = useRouter(); // ルーティング用のオブジェクトを取得
  const id = props.params.id; // propsから顧客IDを取得
  const formRef = useRef(); // フォームの参照を作成
  const [customerInfo, setCustomerInfo] = useState([]); // 顧客情報を管理するステート
  const [error, setError] = useState(null); // エラーステートを追加

  // 顧客情報を取得してステートにセットする処理
  useEffect(() => {
    const fetchAndSetCustomer = async () => {
      try {
        const customerData = await fetchCustomer(id); // 顧客情報を取得
        setCustomerInfo(customerData[0]); // 顧客情報をステートにセット
      } catch (err) {
        setError("Failed to fetch customer data"); // エラー発生時にエラーメッセージをセット
        console.error(err); // エラー内容をコンソールに表示
      }
    };
    fetchAndSetCustomer(); // コンポーネントのマウント時に実行
  }, [id]); // idが変わった時にも再度実行

  // フォームの送信時の処理
  const handleSubmit = async (event) => {
    event.preventDefault(); // フォームのデフォルトの送信動作を防ぐ
    const formData = new FormData(formRef.current); // フォームデータを取得
    try {
      const result = await updateCustomer(formData); // 顧客情報を更新
      console.log("Customer updated successfully:", result); // 成功メッセージをコンソールに表示

      // 更新後に顧客情報を再フェッチ
      const updatedCustomerData = await fetchCustomer(id);
      setCustomerInfo(updatedCustomerData[0]); // 更新された顧客情報をステートにセット

      // 確認ページにリダイレクト
      const customerId = formData.get("customer_id"); // フォームデータから顧客IDを取得
      router.push(`/customers/update/${customerId}/confirm`); // 確認ページにリダイレクト
    } catch (error) {
      console.error("Error updating customer:", error); // エラー内容をコンソールに表示
    }
  };

  const previous_customer_name = customerInfo.customer_name; // 以前の顧客名を取得
  const previous_customer_id = customerInfo.customer_id; // 以前の顧客IDを取得
  const previous_age = customerInfo.age; // 以前の顧客年齢を取得
  const previous_gender = customerInfo.gender; // 以前の顧客性別を取得

  if (error) {
    return <div className="alert alert-error p-4 text-center">{error}</div>;
  }

  return (
    <>
      <div className="card bordered bg-white border-blue-200 border-2 max-w-md m-4">
        <div className="m-4 card bordered bg-blue-200 duration-200 hover:border-r-red">
          <form ref={formRef} onSubmit={handleSubmit}>
            <div className="card-body">
              <h2 className="card-title">
                <p>
                  <input
                    type="text"
                    name="customer_name"
                    defaultValue={previous_customer_name}
                    className="input input-bordered"
                  />
                  さん
                </p>
              </h2>
              <p>
                Customer ID:
                <input
                  type="text"
                  name="customer_id"
                  defaultValue={previous_customer_id}
                  className="input input-bordered"
                />
              </p>
              <p>
                Age:
                <input
                  type="number"
                  name="age"
                  defaultValue={previous_age}
                  className="input input-bordered"
                />
              </p>
              <p>
                Gender:
                <input
                  type="text"
                  name="gender"
                  defaultValue={previous_gender}
                  className="input input-bordered"
                />
              </p>
            </div>
            <div className="flex justify-center">
              {/* 更新ボタンを押したらhandleSubmit関数が実行される */}
              <button className="btn btn-primary m-4 text-2xl" type="submit">
                更新
              </button>
              <Link href="/">
                <button className="btn btn-primary m-4 text-2xl">戻る</button>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
