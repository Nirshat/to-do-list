import AddIcon from "@mui/icons-material/Add";
import List from "@mui/material/List";
import Button from "@mui/material/Button";
import LiComponent from "./LiComponent";
import Archives from "./Archives";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";

import { useState } from "react";

interface ListItems {
  list: any[];
  edit: (id: any, item: string) => void;
  del: (idThatWasAboutToRemove: any) => void;
  done: (idOfDoneTasks: any, task: string) => void;
  archives: any[];
  undone: (idToUnarchived: any, task: string) => void;
  delArchived: (idToDelete: any) => void;
}

const ListApp = ({
  list,
  edit,
  del,
  done,
  archives,
  undone,
  delArchived,
}: ListItems) => {
  const [content, setContent] = useState("Tasks");

  const toggleContent = (listtype:string) => {
    setContent(listtype);
  };


  return (
    <>
      <div className="body-box">
        <div className="app-box">
          <div className="title">To-Do List</div>
          <div className="app-body">
            <List className="listbox">
              <div className="typelist">
                <span
                  className={content === "Tasks" ? "active" : ""}
                  onClick={() => toggleContent("Tasks")}
                >
                  Tasks
                </span>
                <span
                  className={content === "Archives" ? "active" : ""}
                  onClick={() => toggleContent("Archives")}
                >
                  Archives
                </span>
              </div>
              <hr />
              {/* if */}
              {content === "Tasks" ? (
                list.length == 0 ? (
                  <>
                    <ListItem className="noitembox">
                      <ListItemText
                        primary={"No items found."}
                        className="no-items"
                      />
                    </ListItem>
                  </>
                ) : (
                  list.map((item) => (
                    <LiComponent
                      key={item.id}
                      item={item} // objects
                      edit={edit}
                      del={del}
                      done={done}
                    />
                  ))
                )
              ) : // else
              archives.length == 0 ? (
                <>
                  <ListItem className="noitembox">
                    <ListItemText
                      primary={"No items found."}
                      className="no-items"
                    />
                  </ListItem>
                </>
              ) : (
                archives.map((arch) => (
                  <Archives
                    key={arch.id}
                    archives={arch}
                    undone={undone}
                    delArch={delArchived}
                  />
                ))
              )}
            </List>
          </div>

          <Button
            variant="contained"
            color="success"
            data-bs-toggle="modal"
            data-bs-target="#addNew"
            style={{ padding: ".7rem 0" }}
          >
            <AddIcon /> <span id="btn-name">Add Task</span>
          </Button>

          <div className="foot">
            <span id="credits">
              Made with 💚 by <b>Aron Paul Gonzales</b>.All rights reserved.
            </span>
            <span id="techs">
              React + TypeScript + Material UI + Bootstrap + CSS{" "}
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default ListApp;
