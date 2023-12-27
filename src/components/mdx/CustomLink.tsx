import React from 'react'

const CustomLink = (props) => {
    const href = props.href;
    const isInternalLink = href && (href.startsWith('/') || href.startsWith('#'));

    if (isInternalLink) {
      return (
          <a href={href} {...props} />
      );
    }

    return <a target="_blank" rel="noopener noreferrer" {...props} />;

};

export default CustomLink
