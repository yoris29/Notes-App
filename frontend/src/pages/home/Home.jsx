import { useEffect, useState } from "react";
import { NoteCard } from "../../components/cards/NoteCard";
import { Navbar } from "../../components/navbar/Navbar";
import { Plus } from "lucide-react";
import Modal from "react-modal";
import AddEditNotes from "./AddEditNotes";
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "../../utils/axiosInstance";
import { EmptyCard } from "../../components/cards/EmptyCard.jsx";
import { Toast } from "../../components/toast/Toast.jsx";
import addNotesImg from "../../../public/images/add-notes.png";

export const Home = () => {
  // TODO: new note button, map through notes using notes state

  const [userInfo, setUserInfo] = useState();
  const navigate = useNavigate();
  const [isPinned, setIsPinned] = useState(false);
  const [allNotes, setAllNotes] = useState([]);
  const [isSearch, setIsSearch] = useState(false);
  const [openModal, setOpenModal] = useState({
    isShown: false,
    type: "add",
    data: null,
  });
  const [showToast, setShowToast] = useState({
    isShown: false,
    message: "",
    type: "add",
  });

  const onPin = () => {
    isPinned ? setIsPinned(false) : setIsPinned(true);
  };

  const handleCloseToast = (message) => {
    setShowToast({
      isShown: false,
      message,
    });
  };

  const showToastMessage = (type, message) => {
    setShowToast({
      isShown: true,
      message,
      type,
    });
  };

  const handleEdit = (noteDetails) => {
    setOpenModal({
      isShown: true,
      data: noteDetails,
      type: "edit",
    });
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

  // Get all the current user's notes
  const getAllNotes = async () => {
    try {
      const res = await axiosInstance.get("/tasks/all-notes");
      // Current user has notes
      if (res.data && !res.data.err && res.data.notes) {
        setAllNotes(res.data.notes);
        console.log("Notes set in allNotes state, even if there are none");
      }
    } catch (err) {
      console.log("Unexpected error occurred", err);
    }
  };

  const deleteNote = async (note) => {
    try {
      const res = await axiosInstance.delete(`/tasks/delete-note/${note._id}`);

      if (res.data && !res.data.err) {
        getAllNotes();
        showToastMessage("delete", "Note deleted successfully!");
      }
    } catch (err) {
      console.log(err);
      if (err.response.data && err.response.data.err) {
        console.log("Unexpected error occurred", err);
      }
    }
  };

  const onSearchNote = async (query) => {
    try {
      const res = await axiosInstance.get(`/tasks/search-notes`, {
        params: { query },
      });

      if (res.data && !res.data.err) {
        setIsSearch(true);
        setAllNotes(res.data.matchingNotes);
      }
    } catch (err) {
      console.log(err);
      if (err.response.data && err.response.data.err) {
        console.log("Unexpected error occurred", err);
      }
    }
  };

  const handleSearchClear = () => {
    setIsSearch(false);
    getAllNotes();
  };

  useEffect(() => {
    getUserInfo();
    getAllNotes();
    return () => {};
  }, []);

  return (
    <>
      <Navbar
        userInfo={userInfo}
        onSearchNote={onSearchNote}
        handleSearchClear={handleSearchClear}
      />
      <div className="container mx-auto">
        <div className="grid grid-cols-3 gap-1 w-full">
          {allNotes.length > 0 ? (
            allNotes.map((note, index) => (
              <NoteCard
                key={note._id}
                title={note.title}
                date={note.createdOn}
                description={note.content}
                tags={note.tags}
                isPinned={note.isPinned}
                onEdit={() => handleEdit(note)}
                onDelete={() => deleteNote(note)}
                onPin={onPin}
              />
            ))
          ) : (
            <EmptyCard imgSrc={addNotesImg} message="Start by adding a note!" />
          )}
        </div>
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
          getAllNotes={getAllNotes}
          showToastMessage={showToastMessage}
        />
      </Modal>
      <Toast
        isShown={showToast.isShown}
        message={showToast.message}
        type={showToast.type}
        onClose={handleCloseToast}
      />
    </>
  );
};

export default Home;
