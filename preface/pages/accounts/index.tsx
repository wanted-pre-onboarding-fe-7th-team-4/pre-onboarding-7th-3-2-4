import CreateAccount from "components/Layout/accountDetail/CreateAccount";
import UpdateAccount from "components/Layout/accountDetail/UpdateAccount";
import Modal from "components/Modal";

export default function Accounts() {
  const closeModal = () => {
    console.log("bye");
  };
  return (
    <>
      <Modal closeModal={closeModal}>
        <UpdateAccount />
      </Modal>
    </>
  );
}
