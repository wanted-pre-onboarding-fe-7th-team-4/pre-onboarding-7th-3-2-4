import React, { useEffect, useState } from "react";
import { Brokers } from "lib/utils/account/changeToBrokerName";
import { AccountStatus } from "lib/utils/account/getAccountStatus";

import {
  AccountModel,
  DashboardModel,
  TAccountStatusKey,
  TBrokersKey
} from "model/model";
import { useUpdateAccountDetail } from "components/accountDetail/hook/useAccountDetail";
import { useRouter } from "next/router";

import convertKRTimeToUTC from "lib/utils/account/convertKRTimeToUTC";

interface IUpdateAccount {
  newAccountDetail: DashboardModel;
  setIsEdit: React.Dispatch<React.SetStateAction<boolean>>;
}

const UpdateAccount = ({ newAccountDetail, setIsEdit }: IUpdateAccount) => {
  const { push } = useRouter();
  const { mutate } = useUpdateAccountDetail();

  const [isDisable, setIsDisable] = useState(true);
  const [userId, setUserId] = useState(newAccountDetail.user_id);
  const [brokerId, setBrokerId] = useState(newAccountDetail.broker_id);
  const [number, setNumber] = useState(newAccountDetail.number);
  const [status, setStatus] = useState(newAccountDetail.status);
  const [isActive, setIsActive] = useState(newAccountDetail.is_active);
  const [name, setName] = useState(newAccountDetail.name);
  const [assets, setAssets] = useState(newAccountDetail.assets);
  const [payments, setPayments] = useState(newAccountDetail.payments);

  useEffect(() => {
    if (
      userId &&
      brokerId &&
      number &&
      status &&
      name &&
      assets &&
      payments &&
      isActive !== undefined
    ) {
      setIsDisable(false);
      return;
    }
    setIsDisable(true);
  }, [userId, brokerId, number, status, name, assets, payments]);

  const onUpdateAccount = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (
      userId &&
      brokerId &&
      number &&
      status &&
      name &&
      assets &&
      payments &&
      isActive !== undefined &&
      newAccountDetail.id &&
      newAccountDetail.created_at &&
      newAccountDetail.uuid &&
      newAccountDetail.updated_at
    ) {
      const created_at = convertKRTimeToUTC(newAccountDetail.created_at);
      const updated_at = convertKRTimeToUTC(newAccountDetail.updated_at);
      const obj: AccountModel = {
        id: newAccountDetail.id,
        uuid: newAccountDetail.uuid,
        user_id: userId,
        broker_id: brokerId,
        number,
        status,
        is_active: isActive,
        name,
        assets: String(assets.replace(/,/g, "")),
        payments: String(payments.replace(/,/g, "")),
        created_at,
        updated_at
      };

      mutate(
        { id: Number(newAccountDetail.id), body: obj },
        {
          onSuccess: () => {
            setIsEdit(false);
            push(`/account/${newAccountDetail.id}`);
          }
        }
      );
    }
  };

  return (
    <div className="w-full">
      <form className="w-full" onSubmit={onUpdateAccount}>
        <div className="px-4 py-8 sm:px-10">
          <div className="mt-6">
            <div className="w-full space-y-6">
              <div className="w-full">
                <div className=" relative ">
                  <input
                    type="text"
                    name="user_id"
                    className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-gray-100 text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                    placeholder="고객명"
                    value={userId}
                    onChange={(e) => setUserId(Number(e.currentTarget.value))}
                  />
                </div>
              </div>
              <div className="w-full">
                <div className="relative">
                  <select
                    className="bg-gray-100 w-full py-2 px-4 items-center rounded-md outline-none"
                    name="broker_id"
                    value={brokerId}
                    onChange={(e) =>
                      setBrokerId(e.currentTarget.value as TBrokersKey)
                    }
                  >
                    {Object.entries(Brokers).map(([key, value]) => (
                      <option key={key} value={key}>
                        {value}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="w-full">
                <div className="relative">
                  <input
                    type="text"
                    name="number"
                    className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-gray-100 text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                    placeholder="계좌번호"
                    value={number}
                    onChange={(e) => setNumber(e.currentTarget.value)}
                  />
                </div>
              </div>
              <div className="w-full">
                <div className=" relative ">
                  <select
                    className="bg-gray-100 w-full py-2 px-4 items-center rounded-md outline-none"
                    name="status"
                    value={status}
                    onChange={(e) =>
                      setStatus(
                        Number(e.currentTarget.value) as TAccountStatusKey
                      )
                    }
                  >
                    {Object.entries(AccountStatus).map(([statusCode, name]) => (
                      <option key={statusCode} value={statusCode}>
                        {name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <select
                className="bg-gray-100 w-full py-2 px-4 items-center rounded-md outline-none "
                name="is_active"
                value={String(isActive)}
                onChange={(e) => setIsActive(Boolean(e.currentTarget.value))}
              >
                <option value="true">계좌 활성화</option>
                <option value="false">계좌 비활성화</option>
              </select>
              <div className="w-full">
                <div className=" relative ">
                  <input
                    name="name"
                    type="text"
                    className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-gray-100 text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                    onChange={(e) => setName(e.currentTarget.value)}
                    value={name}
                    placeholder="계좌명"
                  />
                </div>
              </div>
              <div className="w-full">
                <div className=" relative ">
                  <input
                    name="assets"
                    type="text"
                    className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-gray-100 text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                    placeholder="평가 금액"
                    value={assets}
                    onChange={(e) => setAssets(e.currentTarget.value)}
                  />
                </div>
              </div>
              <div className="w-full">
                <div className=" relative ">
                  <input
                    name="payments"
                    type="text"
                    className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-gray-100 text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                    placeholder="입금 금액"
                    value={payments}
                    onChange={(e) => setPayments(e.currentTarget.value)}
                  />
                </div>
              </div>
              <div className="flex gap-10">
                <span className="block w-full rounded-md shadow-sm">
                  <button
                    disabled={isDisable}
                    type="submit"
                    className={`cursor-pointer py-2 px-4 ${
                      isDisable ? "bg-indigo-300" : "bg-indigo-600"
                    } focus:ring-indigo-500  hover:bg-indigo-700 focus:ring-offset-indigo-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg`}
                  >
                    계좌 수정
                  </button>
                </span>
                <span className="block w-full rounded-md shadow-sm">
                  <button
                    onClick={() => setIsEdit(false)}
                    className="cursor-pointer py-2 px-4 bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg"
                  >
                    수정 취소
                  </button>
                </span>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default UpdateAccount;
