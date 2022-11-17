import Modal from "components/Modal";

export default function Accounts() {
  const closeModal = () => {
    console.log("bye");
  };
  return (
    <>
      <Modal closeModal={closeModal}>
        <CreateAccount />
      </Modal>
    </>
  );
}
