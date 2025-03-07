export const AddEditNotes = () => {
  return (
    <div>
      <div className="flex flex-col gap-2">
        <label>Title:</label>
        <input
          className="text-2xl text-slate-950 outline-none"
          placeholder="title..."
          type="text"
        />
      </div>
      <div className="flex flex-col gap-2">
        <label className="">Description:</label>
        <textarea
          className="text-md text-slate-950 bg-slate-50 p-2 rounded-md outline-none"
          placeholder="description..."
          type="text"
          rows={10}
        />
      </div>
    </div>
  );
};
