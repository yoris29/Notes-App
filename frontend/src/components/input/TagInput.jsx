import PropTypes from "prop-types";
import { Plus, X } from "lucide-react";
import { useRef, useState } from "react";

export const TagInput = ({ tags, setTags }) => {
  const [inputValue, setInputValue] = useState("");
  const tagInput = useRef(null);

  const addTags = () => {
    if (inputValue.trim() !== "") {
      // Set the tags array into the old array plus the new tag
      setTags([...tags, inputValue.trim()]);
      setInputValue("");
      tagInput.current.value = "";
    }
  };

  const removeTag = (i) => {
    setTags((prevTags) => prevTags.filter((tag) => tag !== i));
  };

  return (
    <div className="ml-0 mt-2">
      <div className="flex gap-2">
        {tags.map((tag, index) => (
          <span
            className="flex items-center bg-blue-400 rounded-md"
            key={index}
          >
            #{tag}
            <X
              className="cursor-pointer ml-2"
              onClick={() => removeTag(tag)}
              size={"20px"}
            />
          </span>
        ))}
      </div>
      <div className="flex items-center gap-3 mt-2">
        <input
          ref={tagInput}
          value={inputValue}
          className="border border-gray-400 p-2 rounded-sm w-72"
          type="text"
          placeholder="Add Tags"
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button>
          <Plus
            onClick={addTags}
            className="border border-blue-600 text-blue-600 cursor-pointer h-10 w-10 rounded-md hover:bg-blue-600 hover:text-white transition-[0.3s]"
          />
        </button>
      </div>
    </div>
  );
};

TagInput.propTypes = {
  tags: PropTypes.array,
  setTags: PropTypes.func,
};
