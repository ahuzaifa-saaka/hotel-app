import CreateCabinForm from "./CreateCabinForm";

import Button from "../../ui/Button";
import Modal from "../../ui/Modal";

export default function AddCabin() {
  return (
    <div>
      <Modal>
        <Modal.Open opens="cabin-form">
          <Button>Add new cabin</Button>
        </Modal.Open>
        <Modal.Window name="cabin-form">
          <CreateCabinForm />
        </Modal.Window>
      </Modal>
    </div>
  );
}

// function AddCabin() {
//   const [modal, setModal] = useState(false);
//   return (
//     <div>
//       <CabinTable />
//       <Button onClick={() => setModal((show) => !show)}>Add new cabin</Button>
//       {modal && (
//         <Modal onClose={() => setModal(false)}>
//           <CreateCabinForm onCloseModal={() => setModal(false)} />
//         </Modal>
//       )}
//     </div>
//   );
// }

// export default AddCabin;
