import React from 'react';
import {OScrollbar} from '@oreact/ui';
import {makeStyles} from '@material-ui/styles';
import Toolbar from './components/Toolbar';
import Footer from './components/Footer';
import LeftSidebar from './components/LeftSidebar';
import RightSide from './components/RightSide';
import Navbar from './components/navbar';
import clsx from 'clsx';
import {observer} from 'mobx-react';

const useStyles = makeStyles(theme => ({
    root: {
        position: 'relative',
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        backgroundColor: theme.palette.background.default,
        color: theme.palette.text.primary,
        '&.boxed': {
            maxWidth: 1280,
            margin: '0 auto',
            boxShadow: theme.shadows[3]
        },
        '&.scroll-body': {
            '& $wrapper': {
                height: 'auto',
                flex: '0 0 auto',
                overflow: 'auto'
            },
            '& $contentWrapper': {},
            '& $content': {}
        },
        '&.scroll-content': {
            '& $wrapper': {},
            '& $contentWrapper': {},
            '& $content': {}
        },
        '& .navigation': {
            '& .list-subheader-text, & .list-item-text, & .item-badge, & .arrow-icon': {
                transition: theme.transitions.create('opacity', {
                    duration: theme.transitions.duration.shortest,
                    easing: theme.transitions.easing.easeInOut
                })
            },
        }
    },
    wrapper: {
        display: 'flex',
        position: 'relative',
        width: '100%',
        height: '100%',
        flex: '1 1 auto',
    },
    contentWrapper: {
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        zIndex: 3,
        overflow: 'hidden',
        flex: '1 1 auto'
    },
    content: {
        position: 'relative',
        display: 'flex',
        overflow: 'auto',
        flex: '1 1 auto',
        flexDirection: 'column',
        width: '100%',
        '-webkit-overflow-scrolling': 'touch',
        zIndex: 2
    }
}));

export default observer((props) => {
    const {
        pageRoutes,
        config: {
            scroll,
            style,
            toolbar,
            navbar,
            footer,
            leftSidePanel,
            rightSidePanel
        }} = props;
    const classes = useStyles(props);

    switch (scroll) {
        case 'body': {
            return (
                <div className={clsx(classes.root, style, 'scroll-' + scroll)}>

                    {leftSidePanel.display && (
                        <LeftSidebar/>
                    )}

                    <div className="flex flex-1 flex-col overflow-hidden relative">

                        {toolbar.display && toolbar.style === 'fixed' && toolbar.position === 'top' && (
                            <Toolbar config={props.config}/>
                        )}

                        <OScrollbar className="overflow-auto" scrollToTopOnChildChange>

                            {toolbar.display && toolbar.style !== 'fixed' && toolbar.position === 'top' && (
                                <Toolbar config={props.config}/>
                            )}

                            <div className={classes.wrapper}>

                                {navbar.display && navbar.position === 'left' && (
                                    <Navbar/>
                                )}

                                <div className={classes.contentWrapper}>

                                    {toolbar.display && toolbar.position === 'bottom' && (
                                        <Toolbar config={props.config}/>
                                    )}

                                    <div className={classes.content}>
                                        {pageRoutes}
                                    </div>

                                    {footer.display && footer.position === 'bottom' && (
                                        <Footer/>
                                    )}

                                </div>

                                {navbar.display && navbar.position === 'right' && (
                                    <Navbar/>
                                )}
                            </div>

                            {footer.display && footer.style !== 'fixed' && footer.position === 'top' && (
                                <Footer/>
                            )}

                        </OScrollbar>

                        {footer.display && footer.style === 'fixed' && footer.position === 'top' && (
                            <Footer/>
                        )}

                    </div>

                    {rightSidePanel.display && (
                        <RightSide/>
                    )}

                </div>
            );
        }
        case 'content':
        default: {
            return (
                <div className={clsx(classes.root, style, 'scroll-' + scroll)}>
                    {leftSidePanel.display && (
                        <LeftSidebar/>
                    )}

                    <div className="flex flex-1 flex-col overflow-hidden relative">

                        {toolbar.display && toolbar.position === 'top' && (
                            <Toolbar config={props.config}/>
                        )}

                        <div className={classes.wrapper}>

                            {navbar.display && navbar.position === 'left' && (
                                <Navbar/>
                            )}

                            <div className={classes.contentWrapper}>
                                {toolbar.display && toolbar.position === 'bottom' && toolbar.style === 'fixed' && (
                                    <Toolbar config={props.config}/>
                                )}

                                <OScrollbar className={classes.content} scrollToTopOnChildChange>
                                    {toolbar.display && toolbar.position === 'bottom' && toolbar.style !== 'fixed' && (
                                        <Toolbar config={props.config}/>
                                    )}

                                    {pageRoutes}

                                    {footer.display && footer.position === 'bottom' && footer.style !== 'fixed' && (
                                        <Footer/>
                                    )}
                                </OScrollbar>

                                {footer.display && footer.position === 'bottom' && footer.style === 'fixed' && (
                                    <Footer/>
                                )}

                            </div>

                            {navbar.display && navbar.position === 'right' && (
                                <Navbar/>
                            )}
                        </div>

                        {footer.display && footer.position === 'top' && (
                            <Footer/>
                        )}
                    </div>

                    {rightSidePanel.display && (
                        <RightSide/>
                    )}
                </div>
            )
        }
    }
});


