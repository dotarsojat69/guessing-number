import React, { useState } from 'react';
import { Button } from "@/components/ui/button"
import { Input } from "./components/ui/input"
import "./index.css"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from './components/ui/dialog';




const GuessTheNumber = () => {
  const [targetNumber, setTargetNumber] = useState(Math.floor(Math.random() * 100) + 1);
  const [guess, setGuess] = useState('');
  const [attempts, setAttempts] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [showDialog, setShowDialog] = useState(false);

  const handleGuess = () => {
    const parsedGuess = parseInt(guess, 10);

    // validation
    if (isNaN(parsedGuess)) {
      setFeedback('Please enter the valid number');
      return;
    } 

    setAttempts(attempts + 1);

    if (parsedGuess < targetNumber) {
      setFeedback('Too low!');
    } else if (parsedGuess > targetNumber) {
      setFeedback('Too high!');
    } else {
      if (attempts + 1 < 4) {
        setShowDialog(true);
      }
      setFeedback(`Congratulations! You've guessed the number ${targetNumber} in ${attempts + 1} attempts.`);
      setTargetNumber(Math.floor(Math.random() * 100) + 1);
      setGuess('');
      setAttempts(0);
    }
};

  const handleReset = () => {
    setTargetNumber(Math.floor(Math.random() * 100) + 1);
    setGuess('');
    setAttempts(0);
    setFeedback('');
    setShowDialog(false);
  };

  const handleDialogClose = () => {
    setShowDialog(false);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-slate-500">
      <h1 className="text-3xl font-bold mb-8">Guessing Number</h1>
      <div className='flex gap-6'>
      <Input
        type="number"
        value={guess}
        onChange={(e) => setGuess(e.target.value)}
        placeholder="Enter your guess"
        className="mb-4 w-full"
      />
      <Button onClick={handleGuess} className="mb-4">
        Submit Guess
      </Button>
      </div>
      <p className="mb-4">{feedback}</p>
      <p className="mb-4">Attempts: {attempts}</p>
      <Button onClick={handleReset}>Reset Game</Button>

      <Dialog open={showDialog} onOpenChange={handleDialogClose}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              Great!
            </DialogTitle>
          </DialogHeader>
          <DialogDescription>
            You guess the number so fast!
          </DialogDescription>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default GuessTheNumber;
