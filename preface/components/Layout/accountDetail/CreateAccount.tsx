import React, { useState } from "react";
import { Brokers } from "lib/utils/account/changeToBrokerName";
import { AccountStatus } from "lib/utils/account/getAccountStatus";
import { useCreateAccount } from "components/auth/hook/useCreateAccount";
import { AccountModel } from "model/model";

// TODO: Form validation
const CreateAccount = () => {
  const onCreate = useCreateAccount();
  const [accountValue, setAccountValue] = useState<
    Omit<AccountModel, "id" | "uuid">
  >({
    broker_id: "209",
    status: 1,
    assets: "",
    payments: "",
    is_active: true,
    number: "",
    name: "",
    user_id: 123,
    created_at: new Date(),
    updated_at: new Date()
  });

  // FIXME: 버튼 작동 고치기 VALIDATION
  const disable =
    // accountValue.user_id === "" ||
    accountValue.name === "" ||
    accountValue.number === "" ||
    accountValue.assets === "" ||
    accountValue.payments === "";

  const isDisable = disable
    ? "bg-indigo-300"
    : "bg-indigo-600 hover:bg-indigo-700";

  const onChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setAccountValue({ ...accountValue, [e.target.name]: e.target.value });
  };

  const onCreateAccount = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newAccount: Omit<AccountModel, "id" | "uuid"> = {
      ...accountValue,
      created_at: new Date(),
      updated_at: new Date()
    };

    onCreate(newAccount);
    onCreate(accountValue);
  };

  return (
    <form onSubmit={onCreateAccount}>
      <div className="px-4 py-8 sm:px-10">
        <div className="mt-6">
          <div className="w-full space-y-6">
            <div className="w-full">
              <div className=" relative ">
                <input
                  type="number"
                  name="user_id"
                  className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-gray-100 text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                  placeholder="고객명"
                  onChange={onChange}
                  min={1}
                  max={100}
                />
              </div>
            </div>
            <div className="w-full">
              <div className=" relative ">
                <select
                  className="bg-gray-100 w-full py-2 px-4 items-center rounded-md outline-none"
                  name="broker_id"
                  onChange={onChange}
                >
                  {Object.entries(Brokers).map((it) => (
                    <option key={it[0]} value={it[0]}>
                      {it[1]}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="w-full">
              <div className=" relative ">
                <input
                  type="text"
                  name="number"
                  className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-gray-100 text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                  placeholder="계좌번호"
                  onChange={onChange}
                />
              </div>
            </div>
            <div className="w-full">
              <div className=" relative ">
                <select
                  className="bg-gray-100 w-full py-2 px-4 items-center rounded-md outline-none"
                  name="status"
                  onChange={onChange}
                >
                  {Object.entries(AccountStatus).map((it) => (
                    <option key={it[0]} value={it[0]}>
                      {it[1]}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <select
              className="bg-gray-100 w-full py-2 px-4 items-center rounded-md outline-none "
              name="is_active"
              onChange={onChange}
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
                  onChange={onChange}
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
                  onChange={onChange}
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
                  onChange={onChange}
                />
              </div>
            </div>
            <div>
              <span className="block w-full rounded-md shadow-sm">
                <button
                  disabled={disable}
                  type="submit"
                  className={`py-2 px-4 ${isDisable} focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg`}
                >
                  계좌 생성
                </button>
              </span>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default CreateAccount;
