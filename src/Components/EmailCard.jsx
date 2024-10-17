import React from 'react'
import "../App.css"
const EmailCard = ({ emailData, onSelectedEmail, status }) => {

    const time = new Date(emailData.date);
    const formattedDate = time.toLocaleString(undefined, {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric'
    }).replace(",", "");
    const avatarLetter = emailData.from.name.charAt(0).toUpperCase();
    const favId = status
        .filter((data) => data.favourite)
        .map((data) => data.id);


    const readId = status
        .filter((data) => data.readStatus)
        .map((data) => data.id);

    return (
        <article className={`email-card ${readId.includes(emailData.id) && "readed"}`} onClick={() => onSelectedEmail(emailData, formattedDate, avatarLetter)}>

            <div className="avatar">
                <p><b>{avatarLetter}</b></p>
            </div>
            <section className="email-content">
                <p>From : <span>{emailData.from.email}</span></p>
                <p >
                    Subject : <span>{emailData.subject}</span>
                </p>
                <p style={{ paddingBottom: "5px" }}>{emailData.short_description}</p>

                <section style={{ display: "flex", gap: "1.5rem" }}>

                    <time>{formattedDate}</time>
                    {favId.includes(emailData.id) && <p style={{ color: "#e54065", fontWeight: "500" }}>Favorite</p>}

                </section>

            </section>
        </article >
    )
}

export default EmailCard;