import { useState } from "react";
import { NoteCard } from "../../components/cards/NoteCard";
import { Navbar } from "../../components/navbar/Navbar";
import PropTypes from "prop-types";
import { Plus } from "lucide-react";
import Modal from "react-modal";
import AddEditNotes from "./AddEditNotes";

export const Home = () => {
  // TODO: new note button, map through notes using notes state

  const [openModal, setOpenModal] = useState();
  const [isPinned, setIsPinned] = useState(false);

  const onPin = () => {
    isPinned ? setIsPinned(false) : setIsPinned(true);
  };

  return (
    <div>
      <Navbar />
      <div className="grid grid-cols-3 gap-1 w-full">
        <NoteCard
          title="New note"
          date="14-14-2024"
          description="This note's description"
          tags="#Work #Meeting"
          isPinned={isPinned}
          onEdit={() => {}}
          onDelete={() => {}}
          onPin={onPin}
        />
      </div>
      <button
        onClick={() => setOpenModal(true)}
        className="absolute bottom-8 right-8 w-16 h-16 rounded-2xl bg-sky-600 hover:bg-sky-800 transition-[.3s] cursor-pointer text-white flex justify-center items-center"
      >
        <Plus size={"38px"} strokeWidth={"1.5px"} />
      </button>

      <Modal
        isOpen={openModal}
        onRequestClose={() => setOpenModal(false)}
        style={{
          overlay: { backgroundColor: "rgba(0,0,0,0.4)" },
        }}
        contentLabel="Example Modal"
        className="w-256 mx-auto mt-18 bg-white p-6 rounded-md"
      >
        <AddEditNotes />
      </Modal>
    </div>
  );
};

NoteCard.PropTypes = {
  title: PropTypes.string,
  date: PropTypes.string,
  description: PropTypes.string,
  tags: PropTypes.string,
  isPinned: PropTypes.bool,
  onEdit: PropTypes.func,
  onDelete: PropTypes.func,
  onPin: PropTypes.func,
};

export default Home;
