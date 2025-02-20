// import React from "react";

import { useState } from "react";
import TagInput from "../../components/Input/TagInput";
import { MdClose } from "react-icons/md";
import axiosInstance from "../../utils/axiosInstance";

const AddEditNotes = ({
  noteData,
  type,
  getAllNotes,
  onClose,
  showToastMessage,
}) => {
  const [title, setTitle] = useState(noteData?.title || "");
  const [content, setContent] = useState(noteData?.content || "");
  const [tags, setTags] = useState(noteData?.tags || []);
  const [error, setError] = useState([]);

  //Add Note
  const addNewNote = async () => {
    try {
      const response = await axiosInstance.post("/add-note", {
        title,
        content,
        tags,
      });
      if (response.data && response.data.note) {
        showToastMessage("Note Added Successfully");
        getAllNotes();
        onClose();
      }
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setError(error.response.data.message);
      }
    }
  };

  //edit note
  const editNote = async () => {
    const noteId = noteData._id;
    try {
      const response = await axiosInstance.put("/edit-note/" + noteId, {
        title,
        content,
        tags,
      });
      if (response.data && response.data.note) {
        showToastMessage("Note Updated Successfully");
        getAllNotes();
        onClose();
      }
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setError(error.response.data.message);
      }
    }
  };

  const handleAddNote = () => {
    if (!title) {
      setError("Please enter the title");
      return;
    }
    if (!content) {
      setError("Please enter the content of the title");
      return;
    }
    setError("");
    if (type === "edit") {
      editNote();
    } else {
      addNewNote();
    }
  };
  return (
    <div className="relative">
      <button
        className="w-10 h-10 rounded-full flex items-center justify-center absolute -top-3 -right-3 hover:bg-slate-500"
        onClick={onClose}
      >
        <MdClose className="text-xl text-slate-400" />
      </button>
      <div className="flex flex-col gap-2">
        <label className="input-label">Title</label>
        <input
          type="text"
          className="text-2xl text-slate-950 outline-none"
          placeholder="Go To Gym At 5"
          value={title}
          onChange={({ target }) => setTitle(target.value)}
        />
      </div>
      <div className="flex flex-col gap-2 mt-4">
        <label className="input-label">Content</label>
        <textarea
          type="text"
          className="text-sm text-slate-950 outline-none bg-slate-50 p-2 rounded"
          placeholder="Content"
          rows={10}
          value={content}
          onChange={({ target }) => setContent(target.value)}
        />
      </div>
      <div className="mt-3">
        <label className="input-label">TAGS</label>
        <TagInput tags={tags} setTags={setTags} />
      </div>
      {error && <p className="text-red-500 text-xs pt-4">{error}</p>}
      <button
        className="btn-primary font-medium mt-5 p-3"
        onClick={handleAddNote}
      >
        {type === "edit" ? "UPDATE" : "ADD"}
      </button>
    </div>
  );
};
export default AddEditNotes;

// import React, { useState } from "react";
// import Modal from "react-modal"; // Import the Modal component
// import TagInput from "../../components/Input/TagInput";
// import { MdClose } from "react-icons/md";
// import axiosInstance from "../../utils/axiosInstance";

// // Set the app element for accessibility
// Modal.setAppElement("#root");

// const AddEditNotes = ({ noteData, type, getAllNotes, onClose }) => {
//   const [title, setTitle] = useState(noteData?.title || "");
//   const [content, setContent] = useState(noteData?.content || "");
//   const [tags, setTags] = useState(noteData?.tags || []);
//   const [error, setError] = useState([]);

//   // Add Note
//   const addNewNote = async () => {
//     try {
//       const response = await axiosInstance.post("/add-note", {
//         title,
//         content,
//         tags,
//       });
//       if (response.data && response.data.note) {
//         getAllNotes();
//         onClose();
//       }
//     } catch (error) {
//       if (
//         error.response &&
//         error.response.data &&
//         error.response.data.message
//       ) {
//         setError(error.response.data.message);
//       }
//     }
//   };

//   // Edit Note
//   const editNote = async () => {
//     const noteId = noteData._id;
//     try {
//       const response = await axiosInstance.post("/edit-note/" + noteId, {
//         title,
//         content,
//         tags,
//       });
//       if (response.data && response.data.note) {
//         getAllNotes();
//         onClose();
//       }
//     } catch (error) {
//       if (
//         error.response &&
//         error.response.data &&
//         error.response.data.message
//       ) {
//         setError(error.response.data.message);
//       }
//     }
//   };

//   const handleAddNote = () => {
//     if (!title) {
//       setError("Please enter the title");
//       return;
//     }
//     if (!content) {
//       setError("Please enter the content of the title");
//       return;
//     }
//     setError("");
//     if (type === "edit") {
//       editNote();
//     } else {
//       addNewNote();
//     }
//   };

//   return (
//     <Modal
//       isOpen={true}
//       onRequestClose={onClose}
//       contentLabel={type === "edit" ? "Edit Note" : "Add Note"}
//     >
//       <div className="relative">
//         <button
//           className="w-10 h-10 rounded-full flex items-center justify-center absolute -top-3 -right-3 hover:bg-slate-500"
//           onClick={onClose}
//         >
//           <MdClose className="text-xl text-slate-400" />
//         </button>
//         <div className="flex flex-col gap-2">
//           <label className="input-label">Title</label>
//           <input
//             type="text"
//             className="text-2xl text-slate-950 outline-none"
//             placeholder="Go To Gym At 5"
//             value={title}
//             onChange={({ target }) => setTitle(target.value)}
//           />
//         </div>
//         <div className="flex flex-col gap-2 mt-4">
//           <label className="input-label">Content</label>
//           <textarea
//             type="text"
//             className="text-sm text-slate-950 outline-none bg-slate-50 p-2 rounded"
//             placeholder="Content"
//             rows={10}
//             value={content}
//             onChange={({ target }) => setContent(target.value)}
//           />
//         </div>
//         <div className="mt-3">
//           <label className="input-label">TAGS</label>
//           <TagInput tags={tags} setTags={setTags} />
//         </div>
//         {error && <p className="text-red-500 text-xs pt-4">{error}</p>}
//         <button
//           className="btn-primary font-medium mt-5 p-3"
//           onClick={handleAddNote()}
//         >
//           {type === "edit" ? "UPDATE" : "ADD"}
//         </button>
//       </div>
//     </Modal>
//   );
// };

// export default AddEditNotes;
