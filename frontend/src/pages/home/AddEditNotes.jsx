import { useState } from "react";
import { TagInput } from "../../components/input/TagInput";

export const AddEditNotes = () => {
  const [tags, setTags] = useState([]);
  return (
    <div className="">
      <div className="flex flex-col gap-2">
        <label>TITLE</label>
        <input
          className="text-2xl text-slate-950 outline-none"
          placeholder="title..."
          type="text"
        />
      </div>
      <div className="flex flex-col gap-2">
        <label className="">DESCRIPTION</label>
        <textarea
          className="text-md text-slate-950 bg-slate-50 p-2 rounded-md outline-none"
          placeholder="description..."
          type="text"
          rows={10}
        />
      </div>
      <div>
        <label>TAGS</label>
        <TagInput tags={tags} setTags={setTags} />
      </div>
      <button
        onClick={() => {}}
        className="mt-5 p-3 w-full bg-blue-500 text-white rounded-lg "
      >
        ADD
      </button>{" "}
    </div>
  );
};

export default AddEditNotes;
