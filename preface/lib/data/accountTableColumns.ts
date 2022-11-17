import { AccountModel } from "model/model";

export const accountTableColumns: { key: keyof AccountModel; name: string }[] =
  [
    { key: "id", name: "아이디" },
    {
      key: "broker_id",
      name: "증권사"
    },
    {
      key: "user_id",
      name: "고객명"
    },
    {
      key: "number",
      name: "계좌번호"
    },
    {
      key: "name",
      name: "계좌명"
    },
    {
      key: "status",
      name: "계좌상태"
    },
    {
      key: "payments",
      name: "입금금액"
    },
    {
      key: "assets",
      name: "평가금액"
    },
    {
      key: "is_active",
      name: "계좌활성화여부"
    },
    {
      key: "created_at",
      name: "계좌개설일"
    }
  ];
