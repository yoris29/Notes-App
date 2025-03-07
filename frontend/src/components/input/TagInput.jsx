import PropTypes from "prop-types";
import { Plus } from "lucide-react";
import { useState } from "react";

export const TagInput = ({ tags, setTags }) => {
  const [inputValue, setInputValue] = useState("");

  const addTags = () => {
    if (inputValue.trim() !== "") {
      // Set the tags array into the old array plus the new tag
      setTags([...tags, inputValue.trim()]);
      setInputValue("");
    }
  };

  return (
    <div className="flex items-center gap-3">
      <input
        className="border border-gray-400 p-2 rounded-sm w-72"
        type="text"
        placeholder="Add Tags"
        value={tags}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <button>
        <Plus
          onClick={addTags}
          className="border border-blue-600 text-blue-600 cursor-pointer h-10 w-10 rounded-md hover:bg-blue-600 hover:text-white transition-[0.3s]"
        />
      </button>
    </div>
  );
};

TagInput.propTypes = {
  tags: PropTypes.array,
  setTags: PropTypes.func,
};
