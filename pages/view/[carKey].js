import React from "react";

const ViewCar = ({ carKey }) => {
  return <p>{carKey}</p>;
};

export async function getServerSideProps(props) {
  return {
    props: props.query,
  };
}

export default ViewCar;
