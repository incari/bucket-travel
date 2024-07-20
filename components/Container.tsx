import React from "react";
import { Header } from "./Header";
import { TabContainer } from "./Tabs/TabContainer";
import { Modal } from "./Modal";
import { useGetData } from "../utils/api";

export const Container = () => {
  //  I would use getData() for SSR but any change in the local state
  // will trigger a refetch and overwriting the modified data

  const { data, isLoading } = useGetData();

  return (
    <>
      <Header />
      <TabContainer
        data={data}
        isLoading={isLoading}
      />
      <Modal />
    </>
  );
};
