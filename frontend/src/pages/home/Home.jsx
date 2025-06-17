import { useEffect, useState } from "react";
import { NoteCard } from "../../components/cards/NoteCard";
import { Navbar } from "../../components/navbar/Navbar";
import { Plus } from "lucide-react";
import Modal from "react-modal";
import AddEditNotes from "./AddEditNotes";
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "../../utils/axiosInstance";

export const Home = () => {
  // TODO: new note button, map through notes using notes state

  const [openModal, setOpenModal] = useState({
    isShown: false,
    type: "add",
    data: null,
  });
  const [userInfo, setUserInfo] = useState();
  const navigate = useNavigate();
  const [isPinned, setIsPinned] = useState(false);

  const onPin = () => {
    isPinned ? setIsPinned(false) : setIsPinned(true);
  };

  const getUserInfo = async () => {
    try {
      const res = await axiosInstance.get("/tasks/get-user");
      if (res.data && res.data.user) {
        setUserInfo(res.data.user);
      }
    } catch (err) {
      if (err.response.status === 401) {
        localStorage.clear();
        console.log(err);
        navigate("/login");
      }
    }
  };

  useEffect(() => {
    getUserInfo();
    return () => {};
  }, []);

  return (
    <div>
      <Navbar userInfo={userInfo} />
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
        onClick={() => setOpenModal({ isShown: true, type: "add", data: null })}
        className="absolute bottom-8 right-8 w-16 h-16 rounded-2xl bg-sky-600 hover:bg-sky-800 transition-[.3s] cursor-pointer text-white flex justify-center items-center"
      >
        <Plus size={"38px"} strokeWidth={"1.5px"} />
      </button>

      <Modal
        isOpen={openModal.isShown}
        onRequestClose={() =>
          setOpenModal({ isShown: false, type: "add", data: null })
        }
        style={{
          overlay: { backgroundColor: "rgba(0,0,0,0.4)" },
        }}
        contentLabel="Example Modal"
        className="w-256 mx-auto mt-18 bg-white p-6 rounded-md"
      >
        <AddEditNotes
          type={openModal.type}
          noteData={openModal.data}
          closeModal={() =>
            setOpenModal({ isShown: false, type: "add", data: null })
          }
        />
      </Modal>
    </div>
  );
};

export default Home;
