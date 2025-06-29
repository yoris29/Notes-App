import { useState } from "react";
import { TagInput } from "../../components/input/TagInput";
import { X } from "lucide-react";
import { axiosInstance } from "../../utils/axiosInstance";

export const AddEditNotes = ({
  noteData,
  type,
  closeModal,
  getAllNotes,
  showToastMessage,
}) => {
  const [title, setTitle] = useState(noteData?.title || "");
  const [description, setDescription] = useState(noteData?.content || "");
  const [tags, setTags] = useState(noteData?.tags || []);
  const [error, setError] = useState(null);

  const handleAddNote = () => {
    if (!title) {
      setError("Please provide a title");
      return;
    }
    if (!description) {
      setError("Please provide a description");
      return;
    }
    setError("");

    type === "edit" ? editNote() : "";
    type === "add" ? addNote() : "";
  };

  // edit note
  const editNote = async () => {
    const noteId = noteData._id;
    try {
      const res = await axiosInstance.patch(`/tasks/edit-note/${noteId}`, {
        title,
        content: description,
        tags,
      });

      if (res.data && res.data.note) {
        getAllNotes();
        closeModal();
        showToastMessage("edit", "Note edited successfully!");
      }
    } catch (err) {
      console.log(err);
      if (err.response.data && err.response.data.error) {
        setError(err.response.data.msg);
      }
    }
  };

  // add note
  const addNote = async () => {
    try {
      const res = await axiosInstance.post("/tasks/addNote", {
        title,
        content: description,
        tags,
      });

      if (res.data && res.data.note) {
        getAllNotes();
        closeModal();
        showToastMessage("add", "Note added successfully!");
      }
    } catch (err) {
      console.log(err);
      if (err.response.data && err.response.data.error) {
        setError(err.response.data.msg);
      }
    }
  };

  return (
    <div className="">
      <button
        className="absolute right-45 top-22 cursor-pointer"
        onClick={closeModal}
      >
        <X
          size={"30px"}
          className="text-slate-400 transition-[0.3s] hover:text-slate-600"
        />
      </button>
      <div className="flex flex-col gap-2">
        <label>TITLE</label>
        <input
          className="text-2xl text-slate-950 outline-none"
          placeholder="title..."
          type="text"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
        />
      </div>
      <div className="flex flex-col gap-2">
        <label className="">DESCRIPTION</label>
        <textarea
          className="text-md text-slate-950 bg-slate-50 p-2 rounded-md outline-none"
          placeholder="description..."
          type="text"
          rows={10}
          onChange={(e) => setDescription(e.target.value)}
          value={description}
        />
      </div>
      <div>
        <label>TAGS</label>
        <TagInput tags={tags} setTags={setTags} />
      </div>
      {error ? <p className="text-red-600 mt-4">{error}</p> : ""}
      <button
        onClick={handleAddNote}
        className="mt-5 p-3 w-full bg-blue-500 text-white rounded-lg cursor-pointer"
      >
        {type === "add" ? "ADD" : "EDIT"}
      </button>{" "}
    </div>
  );
};

export default AddEditNotes;
