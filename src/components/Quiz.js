import { useContext, useEffect } from "react";
import { QuizContext } from "../contexts/quiz";
import Question from "./Question";

function Quiz() {
    const [quizState, dispatch] = useContext(QuizContext);
    const apiUrl =
        "https://opentdb.com/api.php?amount=10&type=multiple&encode=url3986";

    useEffect(() => {
        if (quizState.questions.length > 0) {
            return;
        }
        fetch(apiUrl)
            .then((res) => res.json())
            .then((data) => {
                dispatch({ type: "LOADED", payload: data.results });
            });
    });

    return (
        <div className="quiz">
            {quizState.showResults && (
                <div className="results">
                    <div className="congratulations">Good Job!</div>
                    <div className="results-info">
                        <div>You have complite the quiz</div>
                        <div>
                            You have got {quizState.correctAnswersCount} of{" "}
                            {quizState.questions.length} questions.
                        </div>
                        <div
                            className="next-button"
                            onClick={() => dispatch({ type: "RESTART" })}
                        >
                            Restart
                        </div>
                    </div>
                </div>
            )}
            {!quizState.showResults && quizState.questions.length > 0 && (
                <div>
                    <div className="score">
                        Question {quizState.currentQuestionIndex + 1}/
                        {quizState.questions.length}
                    </div>
                    <Question />
                    <div
                        className="next-button"
                        onClick={() => dispatch({ type: "NEXT_QUESTION" })}
                    >
                        Next Question
                    </div>
                </div>
            )}
        </div>
    );
}

export default Quiz;
