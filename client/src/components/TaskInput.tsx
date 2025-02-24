import { useState } from "react";
import { FaCirclePlus } from "react-icons/fa6";
import { addNote } from "../api/api";

interface TaskInputProps {
  onTaskAdded: () => void;
}

export default function TaskInput({ onTaskAdded }: TaskInputProps) {
  const [note, setNote] = useState<string>("");

  const handleAddNote = async () => {
    await addNote(note);
    setNote("");
    onTaskAdded();
  };

  return (
    <div className="flex items-center mt-4 gap-4">
      <input
        type="text"
        className="w-full p-2 border border-gray-300 rounded-lg outline-none text-gray-700"
        placeholder="New Note..."
        value={note}
        onChange={(e) => setNote(e.target.value)}
      />
      <button
        className="bg-[#92400e] rounded-lg text-white px-4 py-2 flex items-center gap-1 font-semibold hover:bg-[#8a4e24] cursor-pointer"
        onClick={handleAddNote}
      >
        <span className="text-lg mr-1">
          <FaCirclePlus />
        </span>
        Add
      </button>
    </div>
  );
}
