import { useState } from "react";
import Notes from "./Notes";

const DragAndDrop = () => {
  const [notes, setNotes] = useState([
    {
      id: 1,
      text: "Hello world 100",
    },
    {
      id: 2,
      text: "Hello world 200",
    },
  ]);
  return (
    <div>
      <Notes notes={notes} setNotes={setNotes} />
    </div>
  );
};

export default DragAndDrop;
