import React, { useState, useEffect } from "react";
import { axiosWithAuth as axios } from '../utils/axiosAuth';
import Bubbles from "./Bubbles";
import ColorList from "./ColorList";

const BubblePage = () => {
  const [colorList, setColorList] = useState([]);
  const [refresh, setRefresh] = useState(false);
  // fetch your colors data from the server when the component mounts
  // set that data to the colorList state property

  useEffect(() => {
    axios().get('/api/colors')
      .then(res => {
        setColorList(res.data)
      })
      .catch(err => {
        console.log(err, 'You did not get your bubbles!')
      })
  }, [refresh])

  const makeRefresh = () => {
    setRefresh(!refresh)
  }

  return (
    <>
      <ColorList colors={colorList} makeRefresh={makeRefresh} />
      <Bubbles colors={colorList} />
    </>
  );
};

export default BubblePage;