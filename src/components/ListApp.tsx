import AddIcon from "@mui/icons-material/Add";
import List from "@mui/material/List";
import Button from "@mui/material/Button";
import LiComponent from "./LiComponent";
import Archives from "./Archives";
// import ArchiveIcon from "@mui/icons-material/Archive";
// import ChecklistIcon from "@mui/icons-material/Checklist";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
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
  const [content, setContent] = useState("Archive");

  const toggleContent = () => {
    setContent((prevContent) =>
      prevContent === "Archive" ? "Tasks" : "Archive"
    );
  };

  // const icon = content === "Archive" ? "ArchiveIcon" : "ChecklistIcon";

  return (
    <>
      <div className="app-box">
        <div className="head">
          <div className="title">To-Do List</div>
          <p className="sub-title">
            To-Do List aims to enhance productivity and time management by
            providing a centralized space for users to plan their activities,
            ensuring that important tasks are not forgotten and goals are
            achieved efficiently.
          </p>
        </div>

        <div className="app-body">
          <div className="insertRow">
            <Button variant="contained" color="primary" onClick={toggleContent}>
              {content === "Archive" ? <ArrowForwardIcon/> : <ArrowBackIcon />}
              <span id="btn-name">{content}</span>
            </Button>

            <Button
              variant="contained"
              color="success"
              data-bs-toggle="modal"
              data-bs-target="#addNew"
            >
              <AddIcon /> <span id="btn-name">Add Task</span>
            </Button>
          </div>

          <br />
          <List className="listbox">
            <div className="typelist">{content === "Tasks" ? "Archive Lists" : "Tasks Lists"}</div>
            <hr />
            {/* if */}
            {content !== "Tasks" ? (
              list.length == 0 ? (
                <>
                <ListItem className="noitembox">
                  <ListItemText primary={"No items found."} className="no-items" />
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
                <ListItemText primary={"No items found."} className="no-items" />
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
