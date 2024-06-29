"use client";
import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import fetchCustomer from "./fetchCustomer";
import updateCustomer from "./updateCustomer";
import Link from "next/link";

export default function UpdatePage(props) {
  const router = useRouter();
  const id = props.params.id;
  const formRef = useRef();
  const [customerInfo, setCustomerInfo] = useState([]);
  const [error, setError] = useState(null); // エラーステートを追加

  useEffect(() => {
    const fetchAndSetCustomer = async () => {
      try {
        const customerData = await fetchCustomer(id);
        setCustomerInfo(customerData[0]);
      } catch (err) {
        setError("Failed to fetch customer data");
        console.error(err);
      }
    };
    fetchAndSetCustomer();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(formRef.current);
    try {
      const result = await updateCustomer(formData);
      console.log("Customer updated successfully:", result);

      // 更新後に顧客情報を再フェッチ
      const updatedCustomerData = await fetchCustomer(id);
      setCustomerInfo(updatedCustomerData[0]);

      // 確認ページにリダイレクト
      const customerId = formData.get("customer_id");
      router.push(`/customers/update/${customerId}/confirm`);
    } catch (error) {
      console.error("Error updating customer:", error);
    }
  };

  const previous_customer_name = customerInfo.customer_name;
  const previous_customer_id = customerInfo.customer_id;
  const previous_age = customerInfo.age;
  const previous_gender = customerInfo.gender;

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
