/** @format */

import axios from "axios";
import React, { useEffect, useState } from "react";
import { Table, Modal, Form, Button } from "react-bootstrap";
import { toast } from "react-toastify";
import HOC from "../layout/HOC";

const EAdminDelivery = () => {
  const [modalShow, setModalShow] = React.useState(false);
  const [data, setData] = useState([]);

  const fetchData = async () => {
    try {
      const { data } = await axios.get(
        "http://ec2-65-1-248-95.ap-south-1.compute.amazonaws.com:8886/api/support"
      );
      setData(data.result);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  function MyVerticallyCenteredModal(props) {
    const [ email , setEmail ] = useState("")
    const [ mobile , setMobile ] = useState("")
    const [ whatpapp , setWhatapp ] = useState("")

    const postHandler = async (e) => {
      e.preventDefault()
      try{
        const { data } = await axios.post("http://ec2-65-1-248-95.ap-south-1.compute.amazonaws.com:8886/api/support" , {
          email , mobile ,whatpapp
        })
        console.log(data.message)
        fetchData()
        toast.success("Product added")
        props.onHide()
      }catch(e){
        console.log(e)
      }
    }

    return (
      <Modal
        {...props}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            {" "}
            Add Support
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={postHandler} >
            <Form.Group className="mb-3">
              <Form.Label>Email Address</Form.Label>
              <Form.Control type="email" required  onChange={(e) => setEmail(e.target.value)}/>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Mobile Number</Form.Label>
              <Form.Control type="tel" pattern="[0-9]{10}" required onChange={(e) => setMobile(e.target.value)} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Whatsapp Number</Form.Label>
              <Form.Control type="tel" pattern="[0-9]{10}" required onChange={(e) => setWhatapp(e.target.value)} />
            </Form.Group>

            <Button className="btn" type="submit">
              Submit
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    );
  }

  const deleteHandler = async (id) => {
    try{
      const { data }  = await axios.delete(`http://ec2-65-1-248-95.ap-south-1.compute.amazonaws.com:8886/api/support/${id}`)
      console.log(data)
      fetchData
    }catch(e) { 
      console.log(e)
    }
  }


  return (
    <>
      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />

      <section>
        <p className="headP">Dashboard / Support</p>

        <div
          className="pb-4   w-full flex justify-between items-center"
          style={{ width: "98%", marginLeft: "2%" }}
        >
          <span
            className="tracking-widest text-slate-900 font-semibold uppercase"
            style={{ fontSize: "1.5rem" }}
          >
           Support (Total : {data?.length})
          </span>
          
          <button
            onClick={() => {
              setModalShow(true);
            }}
            className="md:py-2 px-3 md:px-4 py-1 rounded-sm bg-[#19376d] text-white tracking-wider"
          >
            Add Support
          </button>
        </div>
        <section className="sectionCont">
          <div className="overFlowCont">
            <Table>
              <thead>
                <tr>
                  <th>Number</th>
                  <th>Email Address</th>
                  <th>Mobile Number</th>
                  <th>Whatsapp Number</th>
                  <th>Options</th>
                </tr>
              </thead>
              <tbody>
                {data?.map((i, index) => (
                  <tr key={index}>
                    <td> #{index + 1} </td>
                    <td> {i.email} </td>
                    <td> {i.mobile} </td>
                    <td> {i.whatpapp} </td>
                    <td>
                      <i
                        className="fa-solid fa-trash"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </section>
      </section>
    </>
  );
};

export default HOC(EAdminDelivery);
