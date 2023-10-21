"use client";
import React, { useState } from "react";
import { Suspense } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Skeleton } from "./ui/skeleton";
import { Textarea } from "./ui/textarea";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
const AskQuestion: React.FC = () => {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [selectedSport, setSelectedSport] = useState("Tennis");
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setQuestion(event.target.value);
  };

  const handleSportChange = (value: string) => {
    setSelectedSport(value);
  };

  const handleSubmit = async () => {
    setIsLoading(true);

    const encodedQuestion = encodeURIComponent(question); // Encode the question to ensure it's URL-safe
    const response = await fetch(
      `/api/getAnswer?sport=${selectedSport}&question=${encodedQuestion}`,
      {
        // Include the question in the query string
        method: "GET",
      }
    );
    const data = await response.json();
    setAnswer(data.answer);
    setIsLoading(false);
  };

  return (
    <div className="min-h-full flex flex-wrap">
      <div className="flex w-full  justify-center flex-wrap space-y-5 ">
        <Select onValueChange={handleSportChange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select a sport" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Sports</SelectLabel>
              <SelectItem value="Tennis">Tennis</SelectItem>
              <SelectItem value="Football">Football</SelectItem>
              <SelectItem value="Rugby">Rugby</SelectItem>
              <SelectItem value="Volley">Volley</SelectItem>
              <SelectItem value="Cyclisme">Cyclisme</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>

        <Textarea
          className="m-2"
          value={question}
          onChange={handleInputChange}
          placeholder="Posez votre question"
        />
        <Button className="m-5" onClick={handleSubmit}>
          Envoyer
        </Button>
      </div>
      {isLoading ? (
        <div className="flex justify-center space-x-4 p-5 ">
          <div className="space-y-2">
            <Skeleton className="h-4 w-[500px]" />
            <Skeleton className="h-4 w-[500px]" />
            <Skeleton className="h-4 w-[500px]" />
            <Skeleton className="h-4 w-[500px]" />
            <Skeleton className="h-4 w-[500px]" />
            <Skeleton className="h-4 w-[500px]" />
          </div>
        </div>
      ) : (
        answer && <div className="p-5 text-center">{answer}</div>
      )}
    </div>
  );
};

export default AskQuestion;
