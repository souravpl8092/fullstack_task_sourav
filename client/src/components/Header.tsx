import notebookIcon from "../assets/notebook-icon.png";

export default function Header() {
  return (
    <h1 className="text-2xl font-bold flex items-center gap-2">
      <img src={notebookIcon} alt="Notebook Icon" className="w-10 h-8" />
      Note App
    </h1>
  );
}
