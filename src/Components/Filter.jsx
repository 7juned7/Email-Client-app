import React from 'react';

const Filter = ({ onHandleFilter, activeFilter }) => {

    return (
        <div className='filter' style={{ color: "black" }}>
            <legend>Filter By:</legend>
            <button className={`btn ${activeFilter === "All" ? ("selected") : ("")}`} onClick={() => onHandleFilter("All")}>All</button>
            <button className={`btn ${activeFilter === "Favorites" ? ("selected") : ("")}`} onClick={() => onHandleFilter("Favorites")}>Favorites</button>
            <button className={`btn ${activeFilter === "Read" ? ("selected") : ("")}`} onClick={() => onHandleFilter("Read")}>Read</button>
            <button className={`btn ${activeFilter === "Unread" ? ("selected") : ("")}`} onClick={() => onHandleFilter("Unread")}>Unread</button>
        </div>
    );
}

export default Filter;
