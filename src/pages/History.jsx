import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Navbar from "../components/Navbar";
import { mobile } from "../responsive";
import { userRequest } from "../../src/requestMethods";
import { useSelector } from "react-redux";
import { DataGrid } from "@mui/x-data-grid";
import { format } from "timeago.js";
import { Link } from "react-router-dom";

const Container = styled.div``;

const Wrapper = styled.div``;
const Title = styled.h2`
  text-align: center;
`;
const DataTable = styled.div`
  height: 600px;
  width: 100%;
  margin: 20px;
`;

const Button = styled.button`
  border: none;
  border-radius: 10px;
  padding: 5px 10px;
  background-color: #3bb077;
  color: white;
  cursor: pointer;
  margin-right: 20px;
`;

const History = () => {
  const [orders, setOrders] = useState([]);
  const id = useSelector((state) => state?.user?.currentUser._id);

  useEffect(() => {
    const getOrders = async () => {
      try {
        const res = await userRequest.get("/orders/find/" + id);
        setOrders(res.data);
      } catch (error) {}
    };
    getOrders();
    console.log(orders);
  }, [id]);

  //Data Columns
  const columns = [
    { field: "_id", headerName: "Order ID", width: 200 },
    {
      field: "createdAt",
      headerName: "Date",
      width: 200,
      editable: true,
    },
    {
      field: "amount",
      headerName: "Order Amount",
      width: 150,
      editable: true,
    },
    {
      field: "collector",
      headerName: "Recipient",
      type: "number",
      width: 110,
      editable: true,
    },
    {
      field: "status",
      headerName: "Order Status",
      type: "number",
      width: 110,
      editable: true,
    },
    {
      field: "email",
      headerName: "Email",
      type: "number",
      width: 220,
      editable: true,
    },
    {
      field: "action",
      headerName: "Action",
      width: 100,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/order-history/" + params.row._id}>
              <Button>Details</Button>
            </Link>
          </>
        );
      },
    },
    // {
    //   field: "fullName",
    //   headerName: "Full name",
    //   description: "This column has a value getter and is not sortable.",
    //   sortable: false,
    //   width: 160,
    //   valueGetter: (params) =>
    //     `${params.row.firstName || ""} ${params.row.lastName || ""}`,
    // },
  ];

  return (
    <Container>
      <Navbar />
      <Wrapper>
        <Title>Order History</Title>
      </Wrapper>

      <DataTable>
        <DataGrid
          rows={orders}
          disableSelectionOnClick
          columns={columns}
          getRowId={(row) => row._id}
          pageSize={8}
          rowsPerPageOptions={[5]}
        />
      </DataTable>
    </Container>
  );
};

export default History;
