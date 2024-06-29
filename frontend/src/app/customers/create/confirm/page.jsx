"use client";
import OneCustomerInfoCard from "src/app/components/one_customer_info_card.jsx";
import fetchCustomer from "./fetchCustomer";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function ConfirmPage() {
  const router = useRouter();
  const customer_id = useSearchParams().get("customer_id");
  const [customer, setCustomer] = useState(null);

  useEffect(() => {
    const fetchAndSetCustomer = async () => {
      const customerData = await fetchCustomer(customer_id);
      setCustomer(customerData[0]);
    };
    fetchAndSetCustomer();
  }, []);

  return (
    <>
      <div className="card bordered bg-white border-blue-200 border-2 max-w-sm m-4">
        <div className="alert alert-success p-4 text-center">
          正常に作成しました
        </div>
        <OneCustomerInfoCard {...customer} />
        <a href="/" className="flex justify-center">
          <button className="btn btn-outline btn-accent">一覧に戻る</button>
        </a>
      </div>
    </>
  );
}
