import ListItemText from "@mui/material/ListItemText";
// import IconButton from "@mui/material/IconButton";
// import DeleteIcon from "@mui/icons-material/Delete";
// import EditIcon from "@mui/icons-material/Edit";
import ListItem from "@mui/material/ListItem";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

// Destructure mo na yung objects na galing kay ListApp
interface ItemType {
  id: any;
  name: string;
}

interface ItemProp {
  item: ItemType;
  edit: (id: any, item: string) => void;
  del: (idThatWasAboutToRemove: any) => void;
  done: (idOfDoneTasks:any, task:string) => void;
}

const LiComponent = ({ item, edit, del, done }: ItemProp) => {
  return (
    <ListItem key={item.id} className="listitembox">
      <ListItemText primary={item.name} className="listext" />
      {/* text styled by MUI */}
      <div className="actionbox">
        <div className="dropdown">
          <MoreHorizIcon
            className="dropdown-toggle"
            data-bs-toggle="dropdown"
            aria-expanded="false"
            style={{color:'#777'}}
          />
          <ul className="dropdown-menu">
            <li
              id="action-btn"
              onClick={() => done(item.id, item.name)}
              className="dropdown-item"
            >
              Archive
            </li>
            <li
              id="action-btn"
              data-bs-toggle="modal"
              data-bs-target="#editList"
              onClick={() => edit(item.id, item.name)}
              className="dropdown-item"
            >
              Edit
            </li>

            <li
              id="action-btn"
              onClick={() => del(item.id)}
              className="dropdown-item"
            >
              Delete
            </li>
          </ul>
        </div>
      </div>
    </ListItem>
  );
};

export default LiComponent;




{
  /* <IconButton
                aria-label="delete"
                id="action-btn"
                data-bs-toggle="modal"
                data-bs-target="#editList"
                onClick={() => edit(item.id, item.name)}
                className="dropdown-item"
              >
                <EditIcon />
              </IconButton> */
}



{/* <IconButton
aria-label="delete"
id="action-btn"
onClick={() => del(item.id)}
>
<DeleteIcon />
</IconButton> */}