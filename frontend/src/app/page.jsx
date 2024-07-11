"use client"; // クライアント側で動作するコードであることを指定しています。
import OneCustomerInfoCard from "src/app/components/one_customer_info_card.jsx"; // 顧客情報を表示するコンポーネントをインポートしています。
import Link from "next/link"; // ページ間リンクを作成するためのコンポーネントをインポートしています。
import { useEffect, useState } from "react"; // Reactのフック（useEffectとuseState）をインポートしています。
import fetchCustomers from "./fetchCustomers"; // 顧客データを取得する関数をインポートしています。

export default function Page() {
  const [customerInfos, setCustomerInfos] = useState([]); // 顧客情報を格納するための状態を初期化しています。

  useEffect(() => {
    const fetchAndSetCustomer = async () => {
      const customerData = await fetchCustomers(); // fetchCustomers関数を呼び出し、顧客データを取得しています。
      setCustomerInfos(customerData); // 取得した顧客データを状態に設定しています。
    };
    fetchAndSetCustomer(); // コンポーネントがマウントされたときにfetchAndSetCustomer関数を実行します。
  }, []); // 第二引数に空配列を指定することで、このuseEffectはコンポーネントのマウント時に一度だけ実行されます。

  return (
    <>
      <div className="p-4">
        <Link href="/customers/create" className="mt-4 pt-4" prefetch={false}>
          <button className="btn btn-neutral w-full border-0 bg-blue-200 text-black hover:text-white">
            Create
          </button>
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {customerInfos.map((customerInfo, index) => (
          <div
            key={index} // 顧客情報の一意な識別子としてインデックスを使用しています。
            className="card bordered bg-white border-blue-200 border-2 flex flex-row max-w-sm m-4"
          >
            <OneCustomerInfoCard {...customerInfo} />{" "}
            {/* 顧客情報を表示するコンポーネントをレンダリングしています。 */}
            <div className="card-body flex flex-col justify-between">
              <Link href={`/customers/read/${customerInfo.customer_id}`}>
                <button className="btn btn-neutral w-20 border-0 bg-blue-200 text-black hover:text-white">
                  Read
                </button>
              </Link>
              <Link href={`/customers/update/${customerInfo.customer_id}`}>
                <button className="btn btn-neutral w-20 border-0 bg-blue-200 text-black hover:text-white">
                  Update
                </button>
              </Link>
              <Link href={`/customers/delete/${customerInfo.customer_id}`}>
                <button className="btn btn-neutral w-20 border-0 bg-blue-200 text-black hover:text-white">
                  Delete
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
