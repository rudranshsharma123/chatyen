import React, { useState } from "react";

import Modal from "react-modal";
import * as s from "../../styles/globalStyles";
import Project from "../../contracts/Project.json";
import { Button } from "react-bootstrap";

const customStyles = {
    content: {
        top: "50%",
        left: "50%",
        right: "auto",
        bottom: "auto",
        marginRight: "-50%",
        transform: "translate(-50%, -50%)",
    },
};


function PopUpModal() {
    const [modalIsOpen, setIsOpen] = React.useState(false);
    const [projectName, setProjectName] = useState("");
    const [description, setDesciption] = useState("");
    const [buyPrice, setBuyPrice] = useState(0);
    const [leasePrice, setLeasePrice] = useState(0)
    const [leaseDuration, setLeaseDuration] = useState(0)
    const [link, setLink] = useState("");
    function openModal() {
        setIsOpen(true);
    }

    function closeModal() {
        setIsOpen(false);
    }
    return (
        <div>
            <Button onClick={openModal} variant="danger">
                Start A Project
            </Button>

            <Modal
                isOpen={modalIsOpen}
                // onAfterOpen={afterOpenModal}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Example Modal">
                <p>Start a FundRaiser</p>

                <form>
                    <label>
                        Enter the name of the ChatBot: <br></br>
                        <input
                            type={"text"}
                            value={projectName}
                            name="Enter the name of the Project"
                            ref={(input) => {
                                // words = input;
                            }}
                            onChange={(event) => {
                                setProjectName(event.target.value);
                                console.log(projectName);
                            }}
                        />
                    </label>
                    <br></br>
                    <label>
                        Enter the description of the ChatBot <br></br>
                        <input
                            type={"text"}
                            value={description}
                            name="Enter the name of the Project"
                            onChange={(event) => {
                                setDesciption(event.target.value);
                                console.log(description);
                            }}
                        />
                    </label>
                    <br></br>
                    <label>
                        Selling Price <br></br>
                        <input
                            type={"number"}
                            name="Enter the name of the Project"
                            value={buyPrice}
                            onChange={(event) => {
                                setBuyPrice(event.target.value)
                                console.log(buyPrice);
                            }}
                        />
                    </label>
                    <br></br>
                    <label>
                        Leasing Price <br></br>
                        <input
                            type={"number"}
                            name="Enter the name of the Project"
                            value={leasePrice}
                            onChange={(event) => {
                                setLeasePrice(event.target.value);
                                console.log(leasePrice);
                            }}
                        />
                    </label>
                    <br></br>
                    <label>
                        Lease duration{" "}
                        <br></br>

                        <input
                            type={"number"}
                            value={leaseDuration}
                            name="Enter the name of the Project"
                            onChange={(event) => {
                                setLeaseDuration(event.target.value);
                                console.log(leaseDuration);
                            }}
                        />
                    </label>
                    <br></br>
                    <label>
                        Link to your chatbot{" "}
                        <br></br>

                        <input
                            type={"text"}
                            value={link}
                            name="Enter the name of the Project"
                            onChange={(event) => {
                                setLink(event.target.value);
                                console.log(link);
                            }}
                        />
                    </label>
                    <br></br>


                    <Button type={"submit"} value={"Submit"} >
                        {" "}
                        Submit{" "}
                    </Button>
                </form>


                <Button variant="danger" onClick={closeModal}>
                    close
                </Button>
            </Modal>
        </div>
    )
}

export default PopUpModal