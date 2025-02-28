import { useState } from "react";
import { NoteCard } from "../../components/cards/NoteCard";
import { Navbar } from "../../components/navbar/Navbar";

export const Home = () => {
  // TODO: new note button, map through notes using notes state
  const [isPinned, setIsPinned] = useState();

  const onPin = () => {};

  return (
    <div>
      <Navbar />
      <NoteCard
        title="New note"
        date="14-14-2024"
        description="This note's description"
        tags="#Work #Meeting"
        isPinned={true}
        onEdit={() => {}}
        onDelete={() => {}}
        onPin={() => {}}
      />
    </div>
  );
};

export default Home;
