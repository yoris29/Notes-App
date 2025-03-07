import { Pin, Pencil, Trash } from "lucide-react";
import PropTypes from "prop-types";

export const NoteCard = ({
  title,
  date,
  description,
  tags,
  isPinned,
  onEdit,
  onDelete,
  onPin,
}) => {
  // TODO: toggle more button when having a long descirption, pin edit delete
  return (
    <div className="flex justify-between border border-gray-400 shadow-md pl-2 ml-16 mt-16 w-80 h-48 relative bg-gray-300 rounded-md">
      <div className="flex flex-col justify-around w-64">
        <h2 className="text-2xl font-bold mt-1">{title}</h2>
        <p className="mb-4">{date}</p>
        <p className="mb-4 text-sm">{description}</p>
        <h3 className="text-blue-600 cursor-pointer">{tags}</h3>
      </div>
      <div className="w-16">
        <Pin
          onClick={onPin}
          className={`${
            isPinned ? "text-blue-700" : ""
          } absolute top-4 right-5 hover:text-blue-700 transition-[0.3s] cursor-pointer`}
        />
        <div className="flex justify-between">
          <Pencil
            onClick={onEdit}
            className="absolute bottom-2 right-10 hover:text-green-700 transition-[0.3s] cursor-pointer"
            size="25px"
          />
          <Trash
            onClick={onDelete}
            className="absolute bottom-2 right-1 hover:text-red-700 transition-[0.3s] cursor-pointer"
            size="25px"
          />
        </div>
      </div>
    </div>
  );
};

NoteCard.propTypes = {
  title: PropTypes.string,
  date: PropTypes.string,
  description: PropTypes.string,
  tags: PropTypes.string,
  isPinned: PropTypes.bool,
  onEdit: PropTypes.func,
  onDelete: PropTypes.func,
  onPin: PropTypes.func,
};
