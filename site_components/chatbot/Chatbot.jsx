"use client";

import { useState, useEffect, useRef } from "react";
import ChatbotWindow from "./components/ChatbotWindow";
import { IoLogoOctocat } from "react-icons/io5";

const Chatbot = () => {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState("categories");
  const [category, setCategory] = useState(null);
  const [question, setQuestion] = useState(null);
  const [showTyping, setShowTyping] = useState(false);

  const boxRef = useRef(null);

  useEffect(() => {
    boxRef.current?.scrollTo(0, boxRef.current.scrollHeight);
  }, [step, showTyping]);

  useEffect(() => {
    if (step === "answer") {
      setShowTyping(true);
      const timer = setTimeout(
        () => setShowTyping(false),
        1000 + Math.random() * 1000,
      );
      return () => clearTimeout(timer);
    }
  }, [step]);

  return (
    <>
      <IoLogoOctocat
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 cursor-pointer right-6 z-50 text-4xl w-15 h-15 bg-chart-2 dark:text-black text-white p-3 rounded-full"
      />

      {/* Chat Window */}
      <ChatbotWindow
        open={open}
        setOpen={setOpen}
        boxRef={boxRef}
        step={step}
        setCategory={setCategory}
        setStep={setStep}
        category={category}
        question={question}
        setQuestion={setQuestion}
        showTyping={showTyping}
      />
    </>
  );
};

export default Chatbot;
