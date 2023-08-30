import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

interface ArchivesTypes {
  id: any[];
  name: string;
}

interface ArchiveProps {
  archives: ArchivesTypes;
  undone: (idToUnarchived: any, task: string) => void;
  delArch: (idToDelete: any) => void;
}

const Archives = ({archives, undone, delArch} : ArchiveProps) => {
  return (
    <>
      <ListItem className="listitembox">
        <ListItemText primary={archives.name} className="archived" />

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
              onClick={() => undone(archives.id, archives.name)}
              className="dropdown-item"
            >
              Unarchive
            </li>


            <li
              id="action-btn"
              onClick={() => delArch(archives.id)}
              className="dropdown-item"
            >
              Delete
            </li>
          </ul>
        </div>
      </div>
      </ListItem>
    </>
  )
}

export default Archives