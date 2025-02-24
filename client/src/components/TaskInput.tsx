import { useState } from "react";
import { FaCirclePlus } from "react-icons/fa6";
import { addNote } from "../api/api";
import { ImSpinner2 } from "react-icons/im";

interface TaskInputProps {
  onTaskAdded: () => void;
}

export default function TaskInput({ onTaskAdded }: TaskInputProps) {
  const [note, setNote] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleAddNote = async () => {
    if (!note.trim()) return;

    setLoading(true);
    await addNote(note);
    setNote("");
    setLoading(false);
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
        disabled={loading}
      />
      <button
        className="bg-[#92400e] rounded-lg text-white px-4 py-2 flex items-center gap-2 font-semibold hover:bg-[#8a4e24] cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
        onClick={handleAddNote}
        disabled={loading}
      >
        {loading ? (
          <ImSpinner2 className="animate-spin text-lg" />
        ) : (
          <>
            <FaCirclePlus className="text-lg" />
            Add
          </>
        )}
      </button>
    </div>
  );
}
