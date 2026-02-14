import TypingIndicator from "./TypingIndicator";
import Answer from "./AnswerBox";
import Bubble from "./Bubble";
import Option from "./Option";
import data from "../data/chatbot.json";
import { useEffect } from "react";

const ChatbotWindow = ({
  open,
  boxRef,
  step,
  setCategory,
  setStep,
  category,
  question,
  setQuestion,
  showTyping,
  setOpen,
}) => {
  useEffect(() => {
    setStep("categories");
  }, [open]);

  return (
    open && (
      <div className="fixed bottom-24 curspo right-6 z-50 w-80 max-h-[90vh] bg-card text-card-foreground border border-border rounded-xl shadow-xl flex flex-col overflow-auto">
        {/* Header */}
        <div className="p-4 bg-primary text-primary-foreground font-bold flex justify-between items-center">
          <span>قطتي–قطتك</span>
          <button
            onClick={() => setOpen(false)}
            className="text-lg hover:opacity-80 cursor-pointer transition"
            aria-label="Close chatbot"
          >
            ✖
          </button>
        </div>

        {/* Body */}
        <div
          ref={boxRef}
          className="flex-1 p-4 space-y-3 overflow-y-auto text-sm"
        >
          {/* Categories */}
          {step === "categories" && (
            <>
              <Bubble text="مياو 😸! تحب تسألني عن إيه النهارده؟ 🐾" />
              {data.categories.map((cat) => (
                <Option
                  key={cat.id}
                  text={`🐾 ${cat.title}`}
                  onClick={() => {
                    setCategory(cat);
                    setStep("questions");
                  }}
                />
              ))}
            </>
          )}

          {/* Questions */}
          {step === "questions" && (
            <>
              <Bubble text={`تمام! خلينا نحكي عن ${category.title} 😺`} />
              {category.questions.map((q) => (
                <Option
                  key={q.id}
                  text={`❓ ${q.question}`}
                  onClick={() => {
                    setQuestion(q);
                    setStep("answer");
                  }}
                />
              ))}
            </>
          )}

          {/* Answer */}
          {step === "answer" && (
            <>
              <Bubble text={question.question} />
              <Bubble text={`سؤال جميل 😺`} />

              {/* Typing indicator */}
              {showTyping ? (
                <TypingIndicator />
              ) : (
                <Answer text={question.answer} />
              )}

              <Bubble text="تحب أساعدك في حاجة تانية؟ ولا أرجع أمدد وأنام شوية؟ 😴" />
              <div className="flex gap-2">
                <Option
                  text="😸 أيوه، كمل"
                  onClick={() => {
                    setCategory(null);
                    setQuestion(null);
                    setStep("categories");
                  }}
                  disabled={showTyping}
                />
                <Option
                  text="😴 لا، كفاية كده"
                  onClick={() => setOpen(false)}
                  disabled={showTyping}
                />
              </div>
            </>
          )}
        </div>
      </div>
    )
  );
};

export default ChatbotWindow;
