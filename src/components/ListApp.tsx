import AddIcon from "@mui/icons-material/Add";
import List from "@mui/material/List";
import Button from "@mui/material/Button";
import LiComponent from "./LiComponent";

interface ListItems {
  list: any[];
  edit: (id: any, item: string) => void;
  del: (idThatWasAboutToRemove: any) => void;
}

const ListApp = ({ list, edit, del }: ListItems) => {
  return (
    <>
      <div className="app-box">
        <div className="head">
          <div className="title">To-Do List</div>
          <p className="sub-title">
            To-Do List aims to enhance productivity and time management by providing a centralized space for users to plan their activities, ensuring that important tasks are not forgotten and goals are achieved efficiently.
          </p>
        </div>

        <div className="app-body">
          <div className="insertRow">
            <Button
              variant="contained"
              color="success"
              data-bs-toggle="modal"
              data-bs-target="#addNew"
            >
              <AddIcon /> Add Item
            </Button>
          </div>

          <br />
          <List className="listbox">
            {
              list.length == 0
                ? <div className="no-items">no items found :)</div>

              : list.map((item) => (
                <LiComponent
                  key={item.id}
                  item={item}
                  edit={edit}
                  del={del}
                />
                // ang item props na pinapasa sa component na ito ay mga object.
                // ...mga object na nasa loob ng array (list:any[])
              ))
            }
          </List>
        </div>

        <div className="foot">
          <span id="credits">
            Made with 💚 by <b>Aron Paul Gonzales</b>
          </span>
          <span id="techs">
            {" "}
            React + TypeScript + Material UI + Bootstrap + CSS{" "}
          </span>
        </div>
      </div>
    </>
  );
};

export default ListApp;
