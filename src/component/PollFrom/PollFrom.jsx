import React, { useState } from "react";
import shortid from "shortid";
import MyForm from "./MyForm";
const defaultOption = [
  { id: shortid.generate(), value: "", vote: 0 },
  { id: shortid.generate(), value: "", vote: 0 },
];
const PollFrom = (props) => {
  const [pollData, setPollData] = useState({
    title: "",
    description: "",
    option: defaultOption,
    error: {},
  });
  const handleChange = (e) => {
    setPollData({
      ...pollData,
      [e.target.name]: e.target.value,
    });
  };
  const handleOptionChange = (e, i) => {
    setPollData((prevPollData) => {
      const updateOption = [...prevPollData.option];
      updateOption[i].value = e.target.value || ""; 

      return {
        ...prevPollData,
        option: updateOption,
      };
    });
  };
  const createOption = () => {
    const { option } = pollData;
    if (option.length < 5) {
      option.push({
        id: shortid.generate(),
        value: "",
        vote: 0,
      });
      setPollData({ ...pollData, option });
    } else {
      alert("You can create max 5 option");
    }
  };
  const deleteOption = (index) => {
    const { option } = pollData;
    if (option.length > 2) {
      option.splice(index, 1);
      setPollData({ ...pollData, option });
    } else {
      alert("You must have at least two option");
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const { isValid, error } = validate();
    console.log(error);
    if (isValid) {
      const { title, description, option } = pollData;
      props.submit({
        title,
        description,
        option,
      });
      e.target.reset();
      setPollData({
        title: "",
        description: "",
        option: defaultOption,
        error: {},
      });
    } else {
      setPollData({ error });
    }
  };

  const validate = () => {
    const error = {};
    const { title, description, option } = pollData;
    if (!title) {
      error.title = "Please Provide A Title";
    } else if (title.length < 10) {
      error.title = "Title Too Short";
    } else if (title.length > 100) {
      error.title = "Title Too Long";
    }
    if (!description) {
      error.description = "Please Provide A Description";
    } else if (description.length > 500) {
      error.description = "Description Too Long";
    }
    const optionError = [];
    console.log(option, typeof option);
    option?.forEach((opt, index) => {
      if (!opt.value) {
        optionError[index] = "Option Text Empty";
      } else if (opt.value.length > 100) {
        optionError[index] = "Option Text Too Long";
      }
    });

    if (optionError.length > 0) {
      error.option = optionError;
    }
    return {
      error,
      isValid: Object.keys(error).length === 0,
    };
  };

  return (
    <MyForm
      title={pollData.title}
      description={pollData.description}
      option={pollData.option}
      error={pollData.error}
      handleChange={handleChange}
      buttonValue={props.buttonValue || "Create Poll"}
      handleOptionChange={handleOptionChange}
      createOption={createOption}
      deleteOption={deleteOption}
      handleSubmit={handleSubmit}
    ></MyForm>
  );
};

export default PollFrom;
