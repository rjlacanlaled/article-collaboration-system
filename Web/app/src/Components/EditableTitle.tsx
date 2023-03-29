import { useState } from 'react';

type EditableTitleProps = {
  initialValue: string;
};

function EditableTitle({ initialValue }: EditableTitleProps) {
  const [title, setTitle] = useState(initialValue);
  const [isEditing, setIsEditing] = useState(false);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = (event:any) => {
    event.preventDefault();
    setIsEditing(false);
  };

  const handleChange = (event:any) => {
    setTitle(event.target.value);
  };

  const handleKeyDown = (event: any) => {
    if (event.key === 'Enter') {
      handleSave(event);
    }
  };

  return (
    <div>
      {isEditing ? (
        <form onSubmit={handleSave}>
          <div className="relative">
            <input
              type="text"
              value={title}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              className="block w-full border border-gray-400 focus:border-slate-500 focus:ring-slate-500 outline-0 p-2 m-content rounded-lg focus-slate-500"
            />
            <button
              type="submit"
              className="absolute right-1 bottom-1 text-white bg-slate-200 hover:bg-slate-300 focus:outline-none font-medium rounded-md text-sm px-3 py-1.5 dark:bg-slate-600 dark:hover:bg-slate-500"
            >
              Done
            </button>
          </div>
        </form>
      ) : (
        <div>
          <h1 className="text-stone-800 font-semibold p-2 cursor-pointer" onClick={handleEdit}>{title}</h1>
        </div>
      )}
    </div>
  );
}

export default EditableTitle