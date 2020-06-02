import React, {useState} from 'react';
import {Avatar, Button, Icon, ListItemIcon, ListItemText, Popover, MenuItem, Typography} from '@material-ui/core';
import {Link} from 'react-router-dom';
import {makeStyles} from '@material-ui/styles';
import {observer} from "mobx-react";
import {useStores} from '@oreact/core/store';
import clsx from 'clsx';

const useStyles = makeStyles({
    item: {
        textDecoration: 'none!important',
        color: 'inherit'
    }
});

export default observer((props) => {
    const {authStore} = useStores();
    const user = authStore.user;
    const classes = useStyles(props);
    const [accountMenu, setAccountMenu] = useState(null);
    const hideLabel = props.hideLabel;

    const accountMenuClick = event => {
        setAccountMenu(event.currentTarget);
    };

    const accountMenuClose = () => {
        setAccountMenu(null);
    };

    return (
        <React.Fragment>
            <Button className={clsx(props.className, 'py-0 mx-auto')} onClick={accountMenuClick}>
                {user.thumbs && user.thumbs.sm ?
                    (
                        <Avatar className="w-28 h-28" alt="user photo"
                                src={user.thumbs.sm.url ? user.thumbs.sm.url : '/assets/images/avatars/profile.jpg'}/>
                    )
                    :
                    (
                        <Avatar className="w-28 h-28" src={'/assets/images/avatars/profile.png'} />
                    )
                }

                {!hideLabel &&
                <React.Fragment>
                    <div className="hidden md:flex flex-col ml-12 items-start">
                        <Typography component="span" className="normal-case font-600 flex">
                            {user.displayName}
                        </Typography>
                    </div>
                    <Icon className="text-16 ml-12 hidden sm:flex" variant="action">keyboard_arrow_down</Icon>
                </React.Fragment>
                }

            </Button>

            <Popover
                open={Boolean(accountMenu)}
                anchorEl={accountMenu}
                onClose={accountMenuClose}

                anchorOrigin={{
                    vertical: props.menuPosition == 'right' ? 'top' : 'bottom',
                    horizontal: 'right'
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: props.menuPosition == 'right' ? 'left' : 'right'
                }}

                classes={{
                    paper: "py-8 min-w-200"
                }}
            >
                {!user.role || user.role.length === 0 ? (
                    <React.Fragment>

                    </React.Fragment>
                ) : (
                    <React.Fragment>
                        <Link to="/logout" className={classes.item}>
                            <MenuItem>
                                <ListItemIcon className="min-w-40">
                                    <Icon>exit_to_app</Icon>
                                </ListItemIcon>
                                <ListItemText className="pl-0" primary="Logout"/>
                            </MenuItem>
                        </Link>
                    </React.Fragment>
                )}
            </Popover>
        </React.Fragment>
    );
});
