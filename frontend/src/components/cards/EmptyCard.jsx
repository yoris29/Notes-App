export const EmptyCard = ({ imgSrc, message }) => {
  return (
    <div className="flex flex-col items-center justify-center absolute right-140 top-20 mt-20 mx-auto">
      <img src={imgSrc} alt="No Notes" className="w-60" />
      <p className="w-60 text-lg font-medium text-slate-700 text-center leading-7 mt-5">
        {message}
      </p>
    </div>
  );
};
