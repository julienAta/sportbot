"use client";
import React, { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

const AskQuestion: React.FC = () => {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [selectedSport, setSelectedSport] = useState("Tennis");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuestion(event.target.value);
  };

  const handleSportChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedSport(event.target.value);
  };

  const handleSubmit = async () => {
    const response = await fetch(`/api/getAnswer?sport=${selectedSport}`, {
      method: "GET",
    });
    const data = await response.json();
    setAnswer(data.answer);
  };

  return (
    <div className="text-xl font-semibold">
      <select
        className="m-5"
        value={selectedSport}
        onChange={handleSportChange}
      >
        <option value="Tennis">Tennis</option>
        <option value="Football">Football</option>
        <option value="Rugby">Rugby</option>
        <option value="Volley">Volley</option>
        <option value="Cyclisme">Cyclisme</option>
        {/* ...other sports */}
      </select>
      <input
        type="text"
        value={question}
        onChange={handleInputChange}
        placeholder="Posez votre question"
      />
      <Button onClick={handleSubmit}>Envoyer</Button>

      {answer && <div className="p-5 text-center">Réponse : {answer}</div>}
    </div>
  );
};

export default AskQuestion;
