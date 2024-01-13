import React from "react";
import {
  Button,
  Form,
  FormFeedback,
  FormGroup,
  Input,
  Label,
} from "reactstrap";

const MyForm = ({
  title,
  description,
  option,
  error,
  buttonValue,
  handleChange,
  handleOptionChange,
  createOption,
  deleteOption,
  handleSubmit,
}) => {
  return (
    <Form onSubmit={handleSubmit}>
      <FormGroup>
        <Label for="title">Title</Label>
        <Input
          name="title"
          id="title"
          placeholder="A Dummy Title"
          value={title}
          onChange={handleChange}
          invalid={error.title ? true : false}
        />
        {error.title && <FormFeedback>{error.title}</FormFeedback>}
      </FormGroup>
      <FormGroup>
        <Label for="description">description</Label>
        <Input
          name="description"
          id="description"
          type="textarea"
          placeholder="Describe Your Poll"
          value={description}
          onChange={handleChange}
          invalid={error.description ? true : false}
        />
        {error.description && <FormFeedback>{error.description}</FormFeedback>}
      </FormGroup>
      <FormGroup>
        <Label>
          Enter Option
          <span
            style={{
              marginLeft: "30px",
              background: "green",
              color: "white",
              padding: "5px",
              borderRadius: "5px",
              cursor: "pointer",
            }}
            onClick={createOption}
          >
            Add Option
          </span>
        </Label>
        {option &&
          option.map((opt, index) => (
            <div className="d-flex my-2" key={opt.id}>
              <Input
                value={opt.value}
                type="text"
                placeholder="Type option"
                onChange={(e) => handleOptionChange(e, index)}
              />
              <Button
                color="danger"
                disabled={option.length <= 2}
                className="ms-2"
                onClick={() => deleteOption(index)}
              >
                Delete
              </Button>
            </div>
          ))}
      </FormGroup>
      <Button color="primary" type="submit">
        {buttonValue}
      </Button>
    </Form>
  );
};

export default MyForm;
