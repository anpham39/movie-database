import React, { useState, useEffect } from "react";
import Form from "./SearchForm";
import Movies from "./Movies";
const Home = () => {
  return (
    <section>
      <Form />
      <Movies />
    </section>
  );
};

export default Home;
