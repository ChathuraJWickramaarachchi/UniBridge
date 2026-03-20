import { useState } from "react";
import { BookOpen, Clock, CheckCircle, XCircle, AlertCircle } from "lucide-react";

const Exam = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, string>>({});
  const [timeLeft, setTimeLeft] = useState(1800); // 30 minutes
  const [examStarted, setExamStarted] = useState(false);
  const [examCompleted, setExamCompleted] = useState(false);

  const questions = [
    {
      id: 1,
      question: "What is the primary purpose of an internship?",
      options: [
        "To earn money",
        "To gain practical work experience",
        "To avoid studying",
        "To socialize with colleagues"
      ],
      correctAnswer: "To gain practical work experience"
    },
    {
      id: 2,
      question: "Which of the following is NOT typically required for internship applications?",
      options: [
        "Resume/CV",
        "Cover letter",
        "Academic transcripts",
        "Passport photo"
      ],
      correctAnswer: "Passport photo"
    },
    {
      id: 3,
      question: "What should you do during your first week of internship?",
      options: [
        "Show up late to make a statement",
        "Learn company policies and procedures",
        "Ignore your supervisor",
        "Complain about the work"
      ],
      correctAnswer: "Learn company policies and procedures"
    },
    {
      id: 4,
      question: "Which skill is most valuable for internship success?",
      options: [
        "Procrastination",
        "Communication",
        "Avoiding responsibility",
        "Making excuses"
      ],
      correctAnswer: "Communication"
    },
    {
      id: 5,
      question: "What is the best way to handle feedback during an internship?",
      options: [
        "Ignore it completely",
        "Get defensive and argue",
        "Listen actively and ask questions",
        "Complain to other interns"
      ],
      correctAnswer: "Listen actively and ask questions"
    }
  ];

  const handleAnswerSelect = (questionId: number, answer: string) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }));
  };

  const calculateScore = () => {
    return questions.filter(q => selectedAnswers[q.id] === q.correctAnswer).length;
  };

  const startExam = () => {
    setExamStarted(true);
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          setExamCompleted(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (!examStarted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 to-accent/5">
        <div className="bg-card rounded-2xl p-8 max-w-2xl w-full mx-4 shadow-xl">
          <div className="text-center mb-8">
            <BookOpen className="w-16 h-16 text-primary mx-auto mb-4" />
            <h1 className="text-3xl font-heading font-bold text-foreground mb-2">
              Internship Knowledge Exam
            </h1>
            <p className="text-muted-foreground">
              Test your knowledge about internships and professional development
            </p>
          </div>
          
          <div className="space-y-4 mb-8">
            <div className="flex items-center gap-3 p-4 bg-muted/50 rounded-lg">
              <AlertCircle className="w-5 h-5 text-primary" />
              <span className="text-foreground">5 multiple choice questions</span>
            </div>
            <div className="flex items-center gap-3 p-4 bg-muted/50 rounded-lg">
              <Clock className="w-5 h-5 text-primary" />
              <span className="text-foreground">30 minutes time limit</span>
            </div>
            <div className="flex items-center gap-3 p-4 bg-muted/50 rounded-lg">
              <CheckCircle className="w-5 h-5 text-primary" />
              <span className="text-foreground">Pass mark: 80% (4 out of 5)</span>
            </div>
          </div>
          
          <button
            onClick={startExam}
            className="w-full bg-primary text-primary-foreground py-4 rounded-lg font-semibold text-lg hover:bg-primary/90 transition-colors"
          >
            Start Exam
          </button>
        </div>
      </div>
    );
  }

  if (examCompleted) {
    const score = calculateScore();
    const percentage = Math.round((score / questions.length) * 100);
    const passed = percentage >= 80;
    
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 to-accent/5">
        <div className="bg-card rounded-2xl p-8 max-w-2xl w-full mx-4 shadow-xl text-center">
          <div className="mb-6">
            {passed ? (
              <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-4" />
            ) : (
              <XCircle className="w-20 h-20 text-red-500 mx-auto mb-4" />
            )}
            <h2 className="text-3xl font-heading font-bold text-foreground mb-2">
              {passed ? "Congratulations!" : "Exam Completed"}
            </h2>
            <p className="text-muted-foreground">
              {passed 
                ? "You've passed the internship knowledge exam!" 
                : "Review the material and try again"}
            </p>
          </div>
          
          <div className="bg-muted/50 rounded-xl p-6 mb-6">
            <div className="text-4xl font-bold text-foreground mb-2">
              {score}/{questions.length}
            </div>
            <div className="text-2xl font-semibold text-primary mb-4">
              {percentage}%
            </div>
            <div className={`text-lg font-medium ${passed ? 'text-green-600' : 'text-red-600'}`}>
              {passed ? "PASSED" : "FAILED"}
            </div>
          </div>
          
          <div className="space-y-3 text-left max-w-lg mx-auto">
            <h3 className="font-semibold text-foreground mb-3">Review Answers:</h3>
            {questions.map((q) => (
              <div key={q.id} className="p-3 bg-muted/30 rounded-lg">
                <p className="font-medium text-foreground mb-2">{q.question}</p>
                <div className="text-sm">
                  <span className="text-muted-foreground">Your answer: </span>
                  <span className={selectedAnswers[q.id] === q.correctAnswer ? 'text-green-600' : 'text-red-600'}>
                    {selectedAnswers[q.id] || 'Not answered'}
                  </span>
                </div>
                {selectedAnswers[q.id] !== q.correctAnswer && (
                  <div className="text-sm text-green-600">
                    <span>Correct answer: </span>
                    <span>{q.correctAnswer}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
          
          <button
            onClick={() => {
              setExamStarted(false);
              setExamCompleted(false);
              setCurrentQuestion(0);
              setSelectedAnswers({});
              setTimeLeft(1800);
            }}
            className="mt-6 w-full bg-primary text-primary-foreground py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors"
          >
            Retake Exam
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 to-accent/5">
      {/* Exam Header */}
      <div className="bg-card border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-heading font-bold text-foreground">
              Internship Knowledge Exam
            </h1>
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Clock className="w-5 h-5" />
                <span className="font-mono text-lg">{formatTime(timeLeft)}</span>
              </div>
              <div className="text-muted-foreground">
                Question {currentQuestion + 1} of {questions.length}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Exam Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-card rounded-2xl p-8 shadow-lg">
            <h2 className="text-xl font-semibold text-foreground mb-6">
              {questions[currentQuestion].question}
            </h2>
            
            <div className="space-y-4 mb-8">
              {questions[currentQuestion].options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswerSelect(questions[currentQuestion].id, option)}
                  className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                    selectedAnswers[questions[currentQuestion].id] === option
                      ? 'border-primary bg-primary/10 text-primary'
                      : 'border-border hover:border-primary/50 hover:bg-muted/50'
                  }`}
                >
                  <span className="font-medium">{String.fromCharCode(65 + index)}. </span>
                  {option}
                </button>
              ))}
            </div>
            
            <div className="flex justify-between">
              <button
                onClick={() => setCurrentQuestion(prev => Math.max(0, prev - 1))}
                disabled={currentQuestion === 0}
                className="px-6 py-2 bg-muted text-foreground rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-muted/80 transition-colors"
              >
                Previous
              </button>
              
              {currentQuestion === questions.length - 1 ? (
                <button
                  onClick={() => setExamCompleted(true)}
                  className="px-6 py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors"
                >
                  Submit Exam
                </button>
              ) : (
                <button
                  onClick={() => setCurrentQuestion(prev => Math.min(questions.length - 1, prev + 1))}
                  className="px-6 py-2 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
                >
                  Next
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Exam;