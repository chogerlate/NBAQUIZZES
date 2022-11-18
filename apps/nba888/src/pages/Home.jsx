import { useState,useEffect } from "react";
import QuizzCard from "../components/QuizzCard";
import axios from "axios"
function Home() {
  return (
    <div className="flex flex-col fixheight  ">
      <div className="flex flex-row grow h-100% flex-wrap">
        <div className="flex grow justify-center ">
          <section className=" grid content-center">
            <QuizzCard></QuizzCard>
            <button >HELLO</button>
          </section>
        </div>
        <div className="flex grow justify-center ">
          <section className=" grid content-center">
            <QuizzCard></QuizzCard>
          </section>
        </div>
      </div>
    </div>
  );
}

export default Home;
