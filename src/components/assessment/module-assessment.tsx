// src/components/assessment/module-assessment.tsx
"use client"

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { toast } from '@/components/ui/use-toast';
import { CheckCircle, XCircle, ArrowRight, AlertTriangle } from 'lucide-react';

interface Question {
  id: string;
  text: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

interface AssessmentProps {
  moduleId: string;
  questions: Question[];
  passingScore: number;
  onComplete: (passed: boolean) => void;
  onClose: () => void;
}

export function ModuleAssessment({ 
  moduleId, 
  questions, 
  passingScore, 
  onComplete,
  onClose 
}: AssessmentProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [showResults, setShowResults] = useState(false);
  const [reviewing, setReviewing] = useState(false);

  const currentQuestion = questions[currentQuestionIndex];
  const progress = (currentQuestionIndex / questions.length) * 100;

  const handleAnswer = (value: string) => {
    setAnswers(prev => ({
      ...prev,
      [currentQuestion.id]: parseInt(value)
    }));
  };

  const calculateScore = () => {
    let correct = 0;
    questions.forEach(question => {
      if (answers[question.id] === question.correctAnswer) {
        correct++;
      }
    });
    return (correct / questions.length) * 100;
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      submitAssessment();
    }
  };

  const submitAssessment = async () => {
    const score = calculateScore();
    const passed = score >= passingScore;

    try {
      const token = localStorage.getItem('token');
      const response = await fetch('/api/assessments/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          moduleId,
          answers,
          score,
          passed
        })
      });

      if (!response.ok) {
        throw new Error('Failed to submit assessment');
      }

      setShowResults(true);
      onComplete(passed);

      if (passed) {
        toast({
          title: "Assessment Completed!",
          description: `You scored ${score.toFixed(1)}% and passed the assessment.`,
          duration: 5000,
        });
      } else {
        toast({
          title: "Assessment Not Passed",
          description: `You scored ${score.toFixed(1)}%. Required score: ${passingScore}%`,
          variant: "destructive",
          duration: 5000,
        });
      }
    } catch (error) {
      console.error('Assessment submission error:', error);
      toast({
        title: "Error",
        description: "Failed to submit assessment. Please try again.",
        variant: "destructive",
      });
    }
  };

  if (showResults) {
    const score = calculateScore();
    const passed = score >= passingScore;

    return (
      <div className="space-y-6">
        <div className="text-center">
          {passed ? (
            <CheckCircle className="w-16 h-16 mx-auto text-green-500 mb-4" />
          ) : (
            <AlertTriangle className="w-16 h-16 mx-auto text-yellow-500 mb-4" />
          )}
          <h3 className="text-2xl font-bold mb-2">
            {passed ? 'Assessment Passed!' : 'Assessment Not Passed'}
          </h3>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            You scored {score.toFixed(1)}%
          </p>
        </div>

        <div className="flex justify-between">
          <Button variant="outline" onClick={() => setReviewing(true)}>
            Review Answers
          </Button>
          <Button onClick={onClose}>
            {passed ? 'Continue to Next Module' : 'Try Again'}
          </Button>
        </div>
      </div>
    );
  }

  if (reviewing) {
    return (
      <div className="space-y-6">
        {questions.map((question, index) => (
          <Card key={question.id} className="p-6">
            <div className="flex items-start gap-4">
              <div className="flex-1">
                <p className="font-medium mb-4">{question.text}</p>
                <RadioGroup
                  value={answers[question.id]?.toString()}
                  disabled
                >
                  {question.options.map((option, optionIndex) => (
                    <div key={optionIndex} className="flex items-center space-x-2">
                      <RadioGroupItem
                        value={optionIndex.toString()}
                        id={`${question.id}-${optionIndex}`}
                      />
                      <Label htmlFor={`${question.id}-${optionIndex}`}>
                        {option}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>
              {answers[question.id] === question.correctAnswer ? (
                <CheckCircle className="w-6 h-6 text-green-500" />
              ) : (
                <XCircle className="w-6 h-6 text-red-500" />
              )}
            </div>
            <p className="mt-4 text-sm text-gray-600 dark:text-gray-300">
              {question.explanation}
            </p>
          </Card>
        ))}
        <Button onClick={() => setReviewing(false)}>Back to Results</Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Progress value={progress} className="mb-4" />
      
      <Card className="p-6">
        <p className="font-medium mb-6">{currentQuestion.text}</p>
        <RadioGroup
          value={answers[currentQuestion.id]?.toString()}
          onValueChange={handleAnswer}
        >
          {currentQuestion.options.map((option, index) => (
            <div key={index} className="flex items-center space-x-2">
              <RadioGroupItem
                value={index.toString()}
                id={`question-${index}`}
              />
              <Label htmlFor={`question-${index}`}>{option}</Label>
            </div>
          ))}
        </RadioGroup>
      </Card>

      <div className="flex justify-between">
        <Button
          variant="outline"
          onClick={() => setCurrentQuestionIndex(prev => prev - 1)}
          disabled={currentQuestionIndex === 0}
        >
          Previous
        </Button>
        <Button
          onClick={handleNext}
          disabled={!answers[currentQuestion.id]}
        >
          {currentQuestionIndex < questions.length - 1 ? (
            <>
              Next
              <ArrowRight className="ml-2 h-4 w-4" />
            </>
          ) : (
            'Submit'
          )}
        </Button>
      </div>
    </div>
  );
}