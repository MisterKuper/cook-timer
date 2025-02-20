import React, { useEffect, useState } from "react";
import "./Timer.css";
import { Link, useParams } from "react-router-dom";
import { assets } from "../../assets/assets";

function Timer() {
  const { name, time } = useParams();
  const cookingTime = parseInt(time, 10);

  const [seconds, setSeconds] = useState(cookingTime * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [tickSound] = useState(new Audio(assets.tick_sound));
  const [finishSound] = useState(new Audio(assets.alarm_sound));
  const [isMusicPlaying, setIsMusicPlaying] = useState(true);
  const [alarmInterval, setAlarmInterval] = useState(null); // Для цикличного будильника

  const foneMusic = new Audio(assets.fone_music);

  useEffect(() => {
    let timer;
    if (isRunning && seconds > 0) {
      timer = setInterval(() => setSeconds((prev) => prev - 1), 1000);
    } else if (seconds <= 0 && !isFinished) {
      setIsFinished(true);
      setIsRunning(false);
      clearInterval(timer);

      if (!alarmInterval) {
        finishSound.currentTime = 0;
        finishSound.play();
        const interval = setInterval(() => {
          if (finishSound.ended) {
            finishSound.currentTime = 0;
            finishSound.play();
          }
        }, 1000);

        setAlarmInterval(interval);
      }
    }

    return () => clearInterval(timer);
  }, [isRunning, seconds, finishSound, alarmInterval, isFinished]);

  useEffect(() => {
    if (isMusicPlaying) {
      foneMusic.play().catch((error) => {
        console.error("Error playing music:", error);
      });
      foneMusic.loop = true;
    } else {
      foneMusic.pause();
      foneMusic.currentTime = 0;
    }

    return () => {
      foneMusic.pause();
      foneMusic.currentTime = 0;
    };
  }, [isMusicPlaying]);

  const startTimer = () => {
    setIsRunning(true);
    setIsFinished(false);
    tickSound.currentTime = 0;
    tickSound.play();
  };

  const pauseTimer = () => {
    setIsRunning(false);
    tickSound.pause();
    tickSound.currentTime = 0;
  };

  const resetTimer = () => {
    setIsRunning(false);
    setIsFinished(false);
    setSeconds(cookingTime * 60);

    tickSound.pause();
    tickSound.currentTime = 0;

    if (alarmInterval) {
      clearInterval(alarmInterval);
      setAlarmInterval(null);
    }
    finishSound.pause();
    finishSound.currentTime = 0;
  };

  const toggleMusic = () => setIsMusicPlaying((prev) => !prev);

  return (
    <div
      style={{
        backgroundImage: `url(${assets.pattern_sky})`,
        backgroundRepeat: "repeat-x",
        backgroundSize: "contain",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      <div className="timer-wrapper">
        <Link to={"/"}>
          <button className="home-page-btn">
            <img src={assets.arrow_icon} alt="Go Back" />
          </button>
        </Link>
        <button className="music-btn" onClick={toggleMusic}>
          <img
            src={isMusicPlaying ? assets.sound_on_icon : assets.sound_off_icon}
            alt={isMusicPlaying ? "Stop Music" : "Play Music"}
          />
        </button>
        <h1>{name}</h1>
        <img
          className="pot-animation"
          src={
            isFinished
              ? assets.pot_finished
              : isRunning
              ? assets.pot_boiling
              : assets.pot_static
          }
          alt="Timer"
        />
        <h2>
          {Math.floor(seconds / 60)}:{String(seconds % 60).padStart(2, "0")}
        </h2>
        <div className="button-container">
          {!isRunning && !isFinished && (
            <button className="start-btn" onClick={startTimer}>
              <img src={assets.play_icon} alt="Start" />
            </button>
          )}
          {isRunning && (
            <button className="pause-btn" onClick={pauseTimer}>
              <img src={assets.pause_icon} alt="Pause" />
            </button>
          )}
          <button className="reset-btn" onClick={resetTimer}>
            <img src={assets.reset_icon} alt="Reset" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Timer;
