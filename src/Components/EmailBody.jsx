import React from 'react';
import { useEffect, useRef } from 'react';

const EmailBody = ({ data, body, status, handleUnmark, handleMark }) => {
    const time = new Date(data.date);
    const formattedDate = time.toLocaleString(undefined, {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric'
    }).replace(",", "");
    const avatarLetter = data.from.name.charAt(0).toUpperCase();
    const emailTextRef = useRef(null);
    const favId = status
        .filter((data) => data.favourite)
        .map((data) => data.id);

    useEffect(() => {
        if (body) {

            if (emailTextRef.current) {
                emailTextRef.current.innerHTML = body.body;
            }
        }
    }, [body]);


    return (
        <article className='email-body'>

            <section className='side-body'>
                <div className="avatar">
                    <p>{avatarLetter}</p>
                </div>
            </section>
            <section className="email-main-body">
                <header className='email-header'>
                    <div>
                        <p className='subject' ><span >{data.subject}</span></p>
                        <p >{formattedDate}</p>
                    </div>
                    <footer>
                        <button className="fav-btn" >{favId.includes(data.id) ? (<p onClick={() => handleUnmark(data.id)}>Unmark as Favourite</p>) : (<p onClick={() => handleMark(data)}>Mark as Favourite</p>)}</button>
                    </footer>
                </header>
                <section className="email-text" ref={emailTextRef}>

                </section>
            </section>
        </article>
    );
}

export default EmailBody;
