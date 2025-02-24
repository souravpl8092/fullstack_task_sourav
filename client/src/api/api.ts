import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const fetchNotes = async () => {
  try {
    const response = await axios.get<string[]>(`${API_URL}/fetchAllTasks`);
    return response.data;
  } catch (error) {
    console.error("Error fetching notes", error);
    return [];
  }
};

export const addNote = async (note: string) => {
  if (!note.trim()) return;
  try {
    await axios.post(`${API_URL}/addTask`, { task: note });
  } catch (error) {
    console.error("Error adding note", error);
  }
};
