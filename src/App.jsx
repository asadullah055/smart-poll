import { useState } from "react";
import { Col, Container, Row } from "reactstrap";
import shortid from "shortid";
import POLLS from "../src/Data/poll.js";
import MainContent from "./component/MainContent/MainContent";
import Sidebar from "./component/Sidebar/Sidebar";
function App() {
  const [polls, setPolls] = useState(POLLS);

  const [selectPolls, setSelectPolls] = useState({});
  const [search, setSearch] = useState("");
  const newPoll = (poll) => {
    const newPollObject = {
      id: shortid.generate(),
      create: new Date(),
      totalVote: 0,
      opinion: [],
      ...poll,
    };

    setPolls((prevPolls) => [...prevPolls, newPollObject]);
  };
  const updatePolls = (updatedPoll) => {
    const poll = polls.find((p) => p.id === updatedPoll.id);
    (poll.title = updatedPoll.title),
      (poll.description = updatedPoll.description);
    poll.option = updatedPoll.option;
    setPolls({
      ...polls,
      polls: updatedPoll,
    });
  };
  const deletePoll = (pollId) => {
    const poll = polls.filter((p) => p.id !== pollId);
    setPolls({ poll, selectPolls });
  };
  const selectedPoll = (pollId) => {
    const poll = polls.filter((p) => p.id !== pollId);
    setPolls({ selectPolls: poll });
  };
  const handleSearch = (searchTerm) => {};

  return (
    <>
      <Container className="my-5 w-75">
        <Row>
          <Col md={4}>
            <Sidebar
              polls={polls}
              handleSearch={handleSearch}
              search={search}
              selectedPoll={selectedPoll}
              newPoll={newPoll}
            />
          </Col>
          <Col md={8}>
            <MainContent />
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default App;
