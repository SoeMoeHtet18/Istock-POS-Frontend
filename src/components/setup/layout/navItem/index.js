import { useRef, useState } from "react";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Grow from "@mui/material/Grow";
import Paper from "@mui/material/Paper";
import Popper from "@mui/material/Popper";
import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";

export const NavItem = ({
  title,
  options,
  item,
  classes,
  icon,
  parentItem,
  onClick,
}) => {
  const [open, setOpen] = useState(false);
  const anchorRef = useRef(null);

  const openMiniMenu = (e) => {
    e.preventDefault();
    setOpen(true);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  return (
    <div>
      <button
        data-id={item ? item.id : title}
        onContextMenu={openMiniMenu}
        className={`flex-ver-center ${classes}`}
        ref={anchorRef}
        onClick={() => onClick(item, parentItem)}
      >
        {icon}
        <h3 className="ms-1 text-sm">
          {title ?? item.name + " - " + item.code}
        </h3>
      </button>

      <Popper
        sx={{
          zIndex: 1,
        }}
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === "bottom" ? "center top" : "center bottom",
            }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList id="split-button-menu" autoFocusItem>
                  {options.map((option, index) => (
                    <MenuItem
                      key={option.name}
                      onClick={option.onClick}
                      data-id={parentItem?.id ?? item?.id}
                    >
                      {option.name}
                    </MenuItem>
                  ))}
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </div>
  );
};
