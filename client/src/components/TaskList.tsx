interface TaskListProps {
  notes: string[];
}

export default function TaskList({ notes }: TaskListProps) {
  return (
    <div className="h-[300px] overflow-y-auto border-t-2 border-gray-200 mt-2">
      {notes.map((item, index) => (
        <div key={index} className="p-2 border-b-2 border-gray-200">
          {item}
        </div>
      ))}
    </div>
  );
}
