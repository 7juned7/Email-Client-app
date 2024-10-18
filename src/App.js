import EmailCard from "./Components/EmailCard";

import { useState, useEffect } from "react";
import EmailBody from "./Components/EmailBody";
import Filter from "./Components/Filter";
import "./App.css"
import PageNavigation from "./Components/PageNavigation";
function App() {
  const [isVisible, setIsVisible] = useState(false);
  const [email, setEmail] = useState([]);
  const [selectedEmail, setSelectedEmail] = useState(null);
  const [emailBody, setEmailBody] = useState(null)

  const [status, setStatus] = useState([]);
  const [filteredEmails, setFilteredEmails] = useState([])
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages,] = useState(2)
  const [activeFilter, setActiveFilter] = useState("All");
  const [close, setClose] = useState(false)
  // https://flipkart-email-mock.now.sh/?id=3
  const fetchEmails = (currentPage) => {
    fetch(`https://flipkart-email-mock.now.sh/?page=${currentPage}`)
      .then((response) => response.json())
      .then((data) => {
        setEmail(data.list);
        setFilteredEmails(data.list);
        setClose(false);
      })
      .catch((error) => {
        console.log(`Error in fetching emails: ${error}`);
      });
  };
  useEffect(() => {
    fetchEmails(currentPage);

  }, [currentPage])
  useEffect(() => {
    const savedStatus = localStorage.getItem('emailStatus');
    if (savedStatus) {
      setStatus(JSON.parse(savedStatus));
    }
  }, []);

  const handleSelectedEmail = (emailData) => {
    setClose(true)

    setIsVisible(false);




    setSelectedEmail(emailData);

    fetch(`https://flipkart-email-mock.now.sh/?id=${emailData.id}`)
      .then((response) => response.json())
      .then((data) => {
        setIsVisible(true);
        setEmailBody(data);
      })
      .catch((error) => {
        console.log("Error in fetching email body", error);
      });


    setStatus((prevStatus) => {
      const updatedStatus = [...prevStatus];
      const emailStatus = updatedStatus.find((s) => s.id === emailData.id);
      if (emailStatus) {
        emailStatus.readStatus = true
      } else {
        updatedStatus.push({ id: emailData.id, readStatus: true })
      }
      localStorage.setItem('emailStatus', JSON.stringify(updatedStatus));
      return updatedStatus;
    });

  };
  const handleUnmark = (data) => {

    setStatus((prevStatus) => {
      // Check if the email with the given id is already in the status array
      const emailStatus = prevStatus.find((item) => item.id === data);

      // Create a copy of the previous status
      const updatedStatus = [...prevStatus];

      if (emailStatus.favourite) {
        console.log("this")
        emailStatus.favourite = false
        emailStatus.readStatus = true;
      }

      localStorage.setItem('emailStatus', JSON.stringify(updatedStatus));

      return updatedStatus;
    });
  }
  const handleFavSelected = (data) => {



    setStatus((prevStatus) => {
      // Check if the email with the given id is already in the status array
      const emailStatus = prevStatus.find((item) => item.id === data.id);

      // Create a copy of the previous status
      const updatedStatus = [...prevStatus];

      if (!emailStatus.favourite) {

        emailStatus.favourite = true
        emailStatus.readStatus = true;
      }

      localStorage.setItem('emailStatus', JSON.stringify(updatedStatus));

      return updatedStatus;
    });
  };
  const handleFilter = (type) => {
    setClose(false)
    setActiveFilter(type);

    if (type === "All") {
      setFilteredEmails(email)
    }


    if (type === "Read") {
      const readEmailsId = status.map((e) => e.id);
      const filteredEmail = email.filter((e) => readEmailsId.includes(e.id)
      );
      setEmailBody(null);
      setFilteredEmails(filteredEmail);

    }
    if (type === "Favorites") {
      const favIds = [];
      status.forEach((e) => {
        if (e.favourite === true) {
          favIds.push(e.id)
        }



      });

      const filteredEmails = email.filter((e) => favIds.includes(e.id));
      setFilteredEmails(filteredEmails)
      setEmailBody(null);
    }
    if (type === "Unread") {
      const unReadEmails = email.filter((e) => {
        return !status.some((s) => s.id === e.id && s.readStatus);
      });
      setFilteredEmails(unReadEmails);
      setEmailBody(null);

    }
  }
  const handleCurrentPage = (pageNumber) => {
    setEmailBody(null);
    setCurrentPage(pageNumber);
  };

  useEffect(() => {


  }, [status])
  const handleClose = () => {
    setClose(false)

  }


  return (
    <main className="App">
      <Filter onHandleFilter={handleFilter} activeFilter={activeFilter} />

      <section className="email-layout">
        <article className={`email-list ${close ? "display-none" : "display"}`}>
          {filteredEmails.length > 0 ? (
            filteredEmails.map((email) => (
              <EmailCard
                key={email.id}
                emailData={email}
                onSelectedEmail={handleSelectedEmail}
                status={status}
                currentPage={currentPage}
              />
            ))
          ) : (
            <p>Nothing to show</p>
          )}
        </article>


        <aside className={`email-side-content ${isVisible ? 'slide-in' : 'slide-out'} ${close ? "" : "display-none"}`}>
          <div onClick={handleClose} className="close"></div>
          {selectedEmail && (
            <EmailBody
              key={selectedEmail.id}
              data={selectedEmail}
              body={emailBody}
              handleMark={handleFavSelected}
              status={status}
              handleUnmark={handleUnmark}
            />
          )}
        </aside>

      </section>

      <nav className="page-container">
        <PageNavigation
          currentPage={currentPage}
          totalPages={totalPages}
          onSetCurrentPage={handleCurrentPage}
        />
      </nav>
    </main>
  );
}

export default App;
