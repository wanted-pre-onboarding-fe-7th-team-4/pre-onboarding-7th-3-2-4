import UpdateAccount from "components/Layout/accountDetail/UpdateAccount";
import Modal from "components/Modal";

export default function Accounts() {
  const closeModal = () => {};
  return (
    <>
      <Modal closeModal={closeModal}>{/* <UpdateAccount /> */}</Modal>
    </>
  );
}
