import { useEffect, useState } from "react";
import Description from "../Description/Description";
import Feedback from "../Feedback/Feedback";
import Options from "../Options/Options";
import css from "./App.module.css";

const getFeedback = () => {
    const saveFeedback = localStorage.getItem("feedbacks");
    if (saveFeedback !== null) {
        return JSON.parse(saveFeedback);
    }
    return {
      good: 0,
      neutral: 0,
      bad: 0,
    };
}

const App = () => {
  const [feedback, setFeedback] = useState(getFeedback);

  const updateFeedback = (feedbackType) => {
    if (feedbackType === "good") {
      setFeedback({
        ...feedback,
        good: feedback.good + 1,
      });
    } else if (feedbackType === "neutral") {
      setFeedback({
        ...feedback,
        neutral: feedback.neutral + 1,
      });
    } else {
      setFeedback({
        ...feedback,
        bad: feedback.bad + 1,
      });
    }
  };

  const resetFeedback = () => {
    setFeedback({
      good: 0,
      neutral: 0,
      bad: 0,
    });
  };
    
  useEffect(() => {
      localStorage.setItem("feedbacks", JSON.stringify(feedback));
  }, [feedback])

    const totalFeedback = feedback.good + feedback.neutral + feedback.bad;
    const positiveFeedback = Math.round((feedback.good / totalFeedback) * 100);

  return (
    <div className={css.container}>
      <Description />
      <Options
        updateFeedback={updateFeedback}
        totalFeedback={totalFeedback}
        resetFeedback={resetFeedback}
      />
      {totalFeedback > 0 ? (
        <Feedback
          feedbacks={feedback}
          totalFeedback={totalFeedback}
          positiveFeedback={positiveFeedback}
        />
      ) : (
        "No feedback yet"
      )}
    </div>
  );
};

export default App;
