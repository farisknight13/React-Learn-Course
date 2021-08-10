import React from 'react';
import PropTypes from 'prop-types';

const Footer_v1 = ({title, website, postcode, isOpen}) => {
    // const {title, website, postcode} = props;

    return (
        <div>
            <h1 style={styles.title}>{title} &copy; {new Date().getFullYear()} </h1>
            <p>{website} {postcode} {isOpen.toString()}</p>
            <p style={styles.title} >farisknight</p>
        </div>
    )
}

const styles = {
    title: {
        color: 'red'
    }
}

Footer_v1.propTypes = {
    title: PropTypes.string,
    website: PropTypes.string,
    postcode: PropTypes.number,
    isOpen: PropTypes.bool
};

export default Footer_v1
