import { useState, useEffect } from "react";
import ListApp from "./ListApp";
import { v4 as uuidv4 } from "uuid";

const Modal = () => {
  const defaultItems = [
    {
      id: 1,
      name: "☕ Cofee",
    },
    {
      id: 2,
      name: "💻 Code",
    },
    {
      id: 3,
      name: "😴 Sleep",
    },
  ];

  const [item, setItem] = useState("");
  const [list, setList] = useState<any[]>([...defaultItems]);


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
      setList([...list, itemprop]);
      setItem("");
    } else {
      alert("Please Input an Item");
    }
  };




  const [primKey ,setPrimKey] = useState();
  const [reqItem, setReqItem] = useState("");

  const readItem = (id: any, item: string) => {
    setReqItem(item);
    setPrimKey(id);
  };

  const updateItems = list.map((li) => {
    if (li.id === primKey && reqItem !== "") {
      return {...li, name:reqItem}; // new value
    }
    return li; // walang nagbago sa array
  });



  const removeItem = (idThatWasAboutToRemove:any) => {
    const filteredItems = list.filter(li => li.id !== idThatWasAboutToRemove);
    setList(filteredItems);
  }

  return (
    <>
      <ListApp list={list} edit={readItem} del={removeItem} />

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
                Add New Item
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
                className="btn btn-primary"
                data-bs-dismiss="modal"
                onClick={addNewItem}
              >
                <i className="fa-solid fa-floppy-disk"></i> Save
              </button>
            </div>
          </div>
        </div>
      </div>




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
                Edit Item
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
                className="btn btn-primary"
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
