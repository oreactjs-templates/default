import React from 'react';
import {OScrollbar} from '@oreact/ui';
import {makeStyles} from '@material-ui/styles';
import Toolbar from './components/Toolbar';
import Footer from './components/Footer';
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
        backgroundColor: '#fff',
        color: theme.palette.text.primary,
        '&.boxed': {
            maxWidth: 1280,
            margin: '0 auto',
            boxShadow: theme.shadows[3]
        },
        '&.scroll-body': {
            '& $content': {}
        },
        '&.scroll-content': {
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
        flex: '1 1 auto'
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
        height: '100%',
        '-webkit-overflow-scrolling': 'touch',
        zIndex: 2
    },
    innerContent: {
        margin: '0 auto',
        width: '100%',
        '@media (min-width: 1280px)': {
            maxWidth: '1024px',
            margin: '0 auto'
        }
    },
    fullInnerContent: {
        'flex-grow': 1,
        position: 'relative',
        overflow: 'hidden',
    }
}));

export default observer((props) => {
    const {
        pageRoutes,
        config: {
            scroll,
            style,
            toolbar,
            footer
        }} = props;

    const classes = useStyles(props);

    return (
        <div className={clsx(classes.root, style, 'scroll-' + scroll)}>

            <div className="flex flex-1 flex-col overflow-hidden relative">

                {style === 'fullwidth' &&
                <div className={classes.wrapper}>

                    <div className={classes.contentWrapper}>

                        {toolbar.display && (
                            <Toolbar/>
                        )}

                        <OScrollbar className={classes.content} scrollToTopOnChildChange
                                    id={'windowScrollContainer'}>

                            {pageRoutes}

                            {footer.display &&
                                <Footer/>
                            }

                        </OScrollbar>

                    </div>

                </div>

                }

                {style === 'fullwidth fullheight' &&
                <React.Fragment>
                    {toolbar.display && (
                        <Toolbar/>
                    )}

                    <div className={clsx(classes.innerContent, classes.fullInnerContent)}>
                        {pageRoutes}
                    </div>

                </React.Fragment>
                }
            </div>
        </div>
    )

});
