import React from 'react';

const PageNavigation = ({ totalPages, onSetCurrentPage, currentPage }) => {
    return (
        <nav className="page">
            <ul className="pagination">
                {Array.from({ length: totalPages }, (_, index) => (
                    <li key={index + 1}>
                        <button
                            className={`page-btn ${currentPage === index + 1 ? 'active' : ''}`}
                            onClick={() => onSetCurrentPage(index + 1)}
                        >
                            {index + 1}
                        </button>
                    </li>
                ))}
            </ul>
        </nav>
    );
}

export default PageNavigation;
