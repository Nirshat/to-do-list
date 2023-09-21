import { useState, useEffect } from "react";
import ListApp from "./ListApp";
import { v4 as uuidv4 } from "uuid";



type ItemTypes = {
  id: string
  name: string
}

const Modal = () => {
  const defaultItems : ItemTypes[] = [
    {
      id: 'dos1',
      name: "☕ Cofee",
    },
    {
      id: 'dos2',
      name: "💻 Code",
    },
    {
      id: 'dos3',
      name: "😴 Sleep",
    },
    {
      id: 'dos4',
      name: "↩ Repeat",
    },
  ];

  const [item, setItem] = useState("");
  const [list, setList] = useState([...defaultItems]);

  // Load data from local storage when the component mounts
  useEffect(() => {
    const storedList = localStorage.getItem("list");
    if (storedList) {
      setList(JSON.parse(storedList));
    }
  }, []);

  // Save data to local storage whenever the list changes
  useEffect(() => {
    localStorage.setItem("list", JSON.stringify(list));
  }, [list]);

  const addNewItem = () => {
    const itemprop = { id: uuidv4(), name: item };
    if (item !== "") {
      setList([itemprop, ...list]);
      setItem("");
    } else {
      alert("Please Input an Item");
    }
  };

  const [primKey, setPrimKey] = useState();
  const [reqItem, setReqItem] = useState("");

  const readItem = (id: any, item: string) => {
    setReqItem(item);
    setPrimKey(id);
  };

  const updateItems = list.map((li) => {
    if (li.id === primKey && reqItem !== "") {
      return { ...li, name: reqItem }; // new value
    }
    return li; // walang nagbago sa array
  });



  const removeItem = (idThatWasAboutToRemove: any) => {
    const filteredItems = list.filter((li) => li.id !== idThatWasAboutToRemove);
    setList(filteredItems);
  };




  const [archived, setArchived] = useState<any[]>([]);

  useEffect(() => {
    const storedArchives = localStorage.getItem("archived");
    if (storedArchives) {
      setArchived(JSON.parse(storedArchives));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("archived", JSON.stringify(archived));
  }, [archived]);

  const archiveItem = (idOfDoneTasks:string, task: string) => {
    const filteredItems = list.filter((li) => li.id !== idOfDoneTasks);
    setList(filteredItems);

    const done = { id: idOfDoneTasks, name: task };
    setArchived([done, ...archived]);
  };




  const unarchiveItem = (idToUnarchived: any, task: string) => {
    const filterArchived = archived.filter(item => item.id !== idToUnarchived);
    // new list of all id na archieved
    //  alisin yung id na i-a-unarchived. 
    setArchived(filterArchived);

    const undone = { id: idToUnarchived, name: task };
    //  from Done to Not Done
    //  pasok ulit sa tasks list
    setList([undone, ...list,]);
  };

  const deleteArchivedItem = (idToDelete:any) => {
    const filterArchived = archived.filter(item => item.id !== idToDelete);
    setArchived(filterArchived);
  }

  return (
    <>
      <ListApp
        list={list}
        edit={readItem}
        del={removeItem}
        done={archiveItem}
        archives={archived}
        undone={unarchiveItem}
        delArchived={deleteArchivedItem}
      />


      {/* ADD MODAL */}
      <div
        className="modal fade"
        id="addNew"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="staticBackdropLabel">
                Add New Task
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <input
                type="text"
                className="form-control"
                id="input"
                placeholder="type here..."
                value={item}
                onChange={(event) => setItem(event.target.value)}
                maxLength={100}
              />
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-success"
                data-bs-dismiss="modal"
                onClick={addNewItem}
              >
                <i className="fa-solid fa-floppy-disk"></i> Save
              </button>
            </div>
          </div>
        </div>
      </div>




      {/* Read/Update Modal */}
      <div
        className="modal fade"
        id="editList"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="staticBackdropLabel">
                Edit Task
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <input
                type="text"
                className="form-control"
                id="input"
                placeholder="type here..."
                maxLength={100}
                value={reqItem}
                onChange={(event) => setReqItem(event.target.value)}
              />
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-success"
                data-bs-dismiss="modal"
                onClick={() => setList(updateItems)}
              >
                <i className="fa-solid fa-floppy-disk"></i> Update
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;

// Lorem ipsum dolor sit amet consectetur adipisicing elit. Error recusandae, qui commodi tempora culpa corporis vero accusantium doloremque consequatur enim quas, repudiandae ipsam nostrum placeat voluptate deleniti nemo incidunt? Quia.