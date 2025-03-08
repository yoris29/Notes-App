import { useState } from "react";
import { TagInput } from "../../components/input/TagInput";
import { X } from "lucide-react";
import PropTypes from "prop-types";

export const AddEditNotes = ({ noteData, type, closeModal }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState([]);
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

  const editNote = async () => {};

  const addNote = async () => {};

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
        ADD
      </button>{" "}
    </div>
  );
};

AddEditNotes.propTypes = {
  noteData: PropTypes.object,
  type: PropTypes.string,
  closeModal: PropTypes.func,
};

export default AddEditNotes;
