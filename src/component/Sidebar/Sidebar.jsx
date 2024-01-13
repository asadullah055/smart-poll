import React, { useState } from "react";
import { Button, Input, Modal, ModalBody, ModalHeader } from "reactstrap";
import PollFrom from "../PollFrom/PollFrom";
import PollList from "./PollList";

const Sidebar = (props) => {
  const [openModal, setOpenModal] = useState(false);
  const toggleModal = () => {
    setOpenModal(!openModal);
  };
  return (
    <div style={{ background: "#efefef", padding: "10px" }}>
      <div className="d-flex mb-5">
        <Input
          type="search"
          placeholder="search"
          value={props.search}
          onChange={(e) => props.handleSearch(e.target.value)}
        />
        <Button color="success" className="ms-2" onClick={toggleModal}>
          New
        </Button>
      </div>
      <h3>List of polls</h3>
      <hr />
      <PollList polls={props.polls} selectedPoll={props.selectedPoll} />
      <Modal isOpen={openModal} toggle={toggleModal} unmountOnClose={true}>
        <ModalHeader toggle={toggleModal}>Create a new Modal</ModalHeader>
        <ModalBody>
          <PollFrom submit={props.newPoll} />
        </ModalBody>
      </Modal>
    </div>
  );
};

export default Sidebar;
