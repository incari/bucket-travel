import React from "react";
import { Header } from "./Header";
import { TabContainer } from "./Tabs/TabContainer";
import { Modal } from "./Modal";
import { getData, useGetData } from "../utils/api";

export const Container = () => {
  const { data, isLoading } = useGetData();
  console.log(data);

  return (
    <>
      <Header />
      {isLoading && <div>Loading...</div>}
      {data && <TabContainer data={data} />}

      <Modal />
    </>
  );
};
