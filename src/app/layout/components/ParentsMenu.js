import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Collapse from "@material-ui/core/Collapse";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import Grid from "@material-ui/core/Grid";
import Icon from '@material-ui/core/Icon'
import PropTypes from "prop-types";

function ParentsMenu(props) {
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(!open);
  };
  return (
    <React.Fragment>
      <ListItem button onClick={handleClick}>
        <ListItemIcon>
          <Icon>{props.iconName}</Icon>
        </ListItemIcon>
        <ListItemText primary={props.text} />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <Grid container style={{ paddingLeft: 20 }}>
          {props.children}
        </Grid>
      </Collapse>
    </React.Fragment>
  );
}

ParentsMenu.propTypes = {
  iconName: PropTypes.string,
  text: PropTypes.string,
};

ParentsMenu.defaultProps = {
  iconName: "",
  text: "",
};

export default ParentsMenu;
