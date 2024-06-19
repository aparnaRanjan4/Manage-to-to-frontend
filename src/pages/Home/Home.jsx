// // import React from "react";

// import NoteCard from "../../components/Cards/NoteCard";
// import Navbar from "../../components/Navbar/Navbar";
// import { MdAdd } from "react-icons/md";
// import AddEditNotes from "./AddEditNotes";
// import Modal from "react-modal";
// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axiosInstance from "../../utils/axiosInstance";
// import Toast from "../../components/ToastMessage/Toast";

// const Home = () => {
//   const [openAddEditModal, setOpenEditModel] = useState({
//     isShow: false,
//     type: "add",
//     data: null,
//   });

//   const [showToastMsg, setShowToastMsg] = useState({
//     isShown: true,
//     message: "",
//     type: "add",
//   });

//   const [allNotes, setAllNotes] = useState([]);
//   const [userInfo, setUserInfo] = useState(null);
//   const navigate = useNavigate();

//   const handleEdit = (noteDetails) => {
//     setOpenEditModel({ isShown: true, data: noteDetails, type: "edit" });
//   };

//   const showToastMessage = (message, type) => {
//     setShowToastMsg({
//       isShown: true,
//       message,
//       type,
//     });
//   };

//   const handleCloseToast = () => {
//     setShowToastMsg({
//       isShown: false,
//       message: "",
//     });
//   };

//   //Get User API:
//   const getUserInfo = async () => {
//     try {
//       const response = await axiosInstance.get("/get-user");
//       if (response.data && response.data.user) {
//         setUserInfo(response.data.user);
//       }
//     } catch (error) {
//       if (error.response.status === 401) {
//         localStorage.clear();
//         navigate("/login");
//       }
//     }
//   };

//   //Get All Notes
//   const getAllNotes = async () => {
//     try {
//       const response = await axiosInstance.get("/get-all-notes");

//       if (response.data && response.data.notes) {
//         setAllNotes(response.data.notes);
//       }
//     } catch (error) {
//       console.log("All unexpected error occurred. Please try again later.");
//     }
//   };

//   useEffect(() => {
//     getAllNotes();
//     getUserInfo();
//     return () => {};
//   }, []);

//   return (
//     <>
//       <Navbar userInfo={userInfo} />
//       <div className="container mx-auto">
//         <div className="grid grid-cols-3 gap-4 mt-8">
//           {allNotes.map((item, index) => (
//             <NoteCard
//               key={item._id}
//               title={item.title}
//               date={item.createdOn}
//               content={item.content}
//               tags={item.tags}
//               isPinned={item.isPlanned}
//               onEdit={() => {
//                 handleEdit(item);
//               }}
//               onDelete={() => {}}
//               onPinNote={() => {}}
//             />
//           ))}
//         </div>
//       </div>
//       <button
//         className="w-16 h-16 flex items-center justify-center rounded-2xl bg-primary hover:bg-blue-600 absolute right-10 bottom-10"
//         onClick={() => {
//           setOpenEditModel({ isShown: true, type: "add", data: null });
//         }}
//       >
//         <MdAdd className="text-[32px] text-white" />
//       </button>
//       <Modal
//         isOpen={openAddEditModal.isShown}
//         onRequestClose={() => {}}
//         style={{
//           overlay: {
//             backgroundColor: "rgba(0,0,0,0.2)",
//           },
//         }}
//         contentLabel=""
//         className="w-[40%] max-h-3/4 bg-white rounded-md mx-auto mt-14 p-5 overlay-scroll"
//       >
//         <AddEditNotes
//           type={openAddEditModal.type}
//           noteData={openAddEditModal.data}
//           onClose={() => {
//             setOpenEditModel({ isShown: false, type: "add", data: null });
//           }}
//           getAllNotes={getAllNotes}
//           showToastMessage={showToastMessage}
//         />
//       </Modal>
//       <Toast
//         isShown={showToastMsg.isShown}
//         message={showToastMsg.message}
//         type={showToastMsg.type}
//         onClose={handleCloseToast}
//       />
//     </>
//   );
// };
// export default Home;

// import React from "react";

import NoteCard from "../../components/Cards/NoteCard";
import Navbar from "../../components/Navbar/Navbar";
import { MdAdd } from "react-icons/md";
import AddEditNotes from "./AddEditNotes";
import Modal from "react-modal";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import Toast from "../../components/ToastMessage/Toast";
import EmptyCard from "../../components/EmptyCard/EmptyCard";
import AddNote from "../../assets/Image/AddNote.jpeg";
import NoData from "../../assets/Image/NoData.jpeg";

const Home = () => {
  const [openAddEditModal, setOpenEditModel] = useState({
    isShow: false,
    type: "add",
    data: null,
  });

  const [showToastMsg, setShowToastMsg] = useState({
    isShown: true,
    message: "",
    type: "add",
  });
  const [isSearch, setIsSearch] = useState(false);

  const [allNotes, setAllNotes] = useState([]);
  const [userInfo, setUserInfo] = useState(null);
  const navigate = useNavigate();

  const handleEdit = (noteDetails) => {
    setOpenEditModel({ isShown: true, data: noteDetails, type: "edit" });
  };

  const showToastMessage = (message, type) => {
    setShowToastMsg({
      isShown: true,
      message,
      type,
    });
  };

  const handleCloseToast = () => {
    setShowToastMsg({
      isShown: false,
      message: "",
    });
  };

  //Get User API:
  const getUserInfo = async () => {
    try {
      const response = await axiosInstance.get("/get-user");
      if (response.data && response.data.user) {
        setUserInfo(response.data.user);
      }
    } catch (error) {
      if (error.response.status === 401) {
        localStorage.clear();
        navigate("/login");
      }
    }
  };

  //Get All Notes
  const getAllNotes = async () => {
    try {
      const response = await axiosInstance.get("/get-all-notes");

      if (response.data && response.data.notes) {
        setAllNotes(response.data.notes);
      }
    } catch (error) {
      console.log("All unexpected error occurred. Please try again later.");
    }
  };

  //Delete Note
  const deleteNote = async (data) => {
    const noteId = data._id;
    try {
      const response = await axiosInstance.delete("/delete-note/" + noteId);
      if (response.data && !response.data.error) {
        showToastMessage("Note Deleted Successfully", "delete");
        getAllNotes();
      }
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        console.log("An unexpected error occurred. Please try again later.");
      }
    }
  };

  //Search for a Note
  const onSearchNote = async (query) => {
    try {
      const response = await axiosInstance.get("/search-notes/", {
        params: { query },
      });
      if (response.data && response.data.notes) {
        setIsSearch(true);
        setAllNotes(response.data.notes);
      }
    } catch (error) {
      console.log(error);
    }
  };

  //IsPinned
  const updateIsPinned = async (noteData) => {
    const noteId = noteData._id;
    try {
      const response = await axiosInstance.put(
        "/update-note-pinned/" + noteId,
        {
          isPinned: !noteData.isPinned,
        }
      );
      if (response.data && response.data.note) {
        showToastMessage("Note Updated Successfully");
        getAllNotes();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleClearSearch = () => {
    setIsSearch(false);
    getAllNotes();
  };

  useEffect(() => {
    getAllNotes();
    getUserInfo();
    return () => {};
  }, []);

  return (
    <>
      <Navbar
        userInfo={userInfo}
        onSearchNote={onSearchNote}
        handleClearSearch={handleClearSearch}
      />
      <div className="container mx-auto">
        {allNotes.length > 0 ? (
          <div className="grid grid-cols-3 gap-4 mt-8">
            {allNotes.map((item, index) => (
              <NoteCard
                key={item._id}
                title={item.title}
                date={item.createdOn}
                content={item.content}
                tags={item.tags}
                isPinned={item.isPlanned}
                onEdit={() => {
                  handleEdit(item);
                }}
                onDelete={() => {
                  deleteNote(item);
                }}
                onPinNote={() => {
                  updateIsPinned(item);
                }}
              />
            ))}
          </div>
        ) : (
          <EmptyCard
            imgSrc={isSearch ? NoData : AddNote}
            message={
              isSearch
                ? `oops! No notes found matching your search.`
                : `Start creating your first note! Click the "Add" button to join down your thoughts,ideas and reminders. Let's get started`
            }
          />
        )}
      </div>
      <button
        className="w-16 h-16 flex items-center justify-center rounded-2xl bg-primary hover:bg-blue-600 absolute right-10 bottom-10"
        onClick={() => {
          setOpenEditModel({ isShown: true, type: "add", data: null });
        }}
      >
        <MdAdd className="text-[32px] text-white" />
      </button>
      <Modal
        isOpen={openAddEditModal.isShown}
        onRequestClose={() => {}}
        style={{
          overlay: {
            backgroundColor: "rgba(0,0,0,0.2)",
          },
        }}
        contentLabel=""
        className="w-[40%] max-h-3/4 bg-white rounded-md mx-auto mt-14 p-5 overlay-scroll"
      >
        <AddEditNotes
          type={openAddEditModal.type}
          noteData={openAddEditModal.data}
          onClose={() => {
            setOpenEditModel({ isShown: false, type: "add", data: null });
          }}
          getAllNotes={getAllNotes}
          showToastMessage={showToastMessage}
        />
      </Modal>
      <Toast
        isShown={showToastMsg.isShown}
        message={showToastMsg.message}
        type={showToastMsg.type}
        onClose={handleCloseToast}
      />
    </>
  );
};
export default Home;
