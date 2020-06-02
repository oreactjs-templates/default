import React from 'react';
import PropTypes from 'prop-types';

const HTML = (props) => {
    const { htmlAttributes, bodyAttributes, headerElements, bodyElements, appBodyString } = props;

    return (
        <html {...htmlAttributes}>
        <head>
            <meta httpEquiv="X-UA-Compatible" content="IE=edge"/>
            <meta charSet="utf-8"/>
            <meta name="viewport" content="width=device-width, initial-scale=1"/>
            <link rel="manifest" href="/manifest.json" />
            <link rel="icon" sizes="16x16 32x32" href="/favicon.ico" />
            {headerElements}
        </head>
        <body {...bodyAttributes}>
        {bodyElements}
        <div id="root" dangerouslySetInnerHTML={{ __html: appBodyString }} />
        </body>
        </html>
    );
};

HTML.propTypes = {
    htmlAttributes: PropTypes.object,
    bodyAttributes: PropTypes.object,
    headerElements: PropTypes.node,
    bodyElements: PropTypes.node,
    appBodyString: PropTypes.string,
};

HTML.defaultProps = {
    htmlAttributes: null,
    bodyAttributes: null,
    headerElements: null,
    bodyElements: null,
    appBodyString: '',
};

// EXPORT
export default HTML;
