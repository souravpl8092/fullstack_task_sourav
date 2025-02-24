import { useState, useEffect } from "react";
import { fetchNotes } from "../api/api";
import Header from "../components/Header";
import TaskInput from "../components/TaskInput";
import TaskList from "../components/TaskList";

export default function NoteApp() {
  const [notes, setNotes] = useState<string[]>([]);

  useEffect(() => {
    loadNotes();
  }, []);

  const loadNotes = async () => {
    const fetchedNotes = await fetchNotes();
    setNotes(fetchedNotes);
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-5 border-2 rounded-lg shadow-sm border-[#e9e9ec]">
      <Header />
      <TaskInput onTaskAdded={loadNotes} />
      <h2 className="font-bold mt-4">Notes</h2>
      <TaskList notes={notes} />
    </div>
  );
}
