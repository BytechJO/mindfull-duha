import React, { useState, useRef, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight, Play, Pause, Volume2, VolumeX, Subtitles, Maximize2, Minimize2, MessageSquareText } from 'lucide-react';
import { useParams, useNavigate } from 'react-router-dom';
import '../../shared/StoryPage.css';


const video1 = "https://res.cloudinary.com/dyf5xqazg/video/upload/v1765793994/1_misqmi.mp4";
const video2 = "https://res.cloudinary.com/dyf5xqazg/video/upload/v1765793998/2_hpxlok.mp4";
const video3 = "https://res.cloudinary.com/dyf5xqazg/video/upload/v1765794002/3_fnunav.mp4";
const video4 = "https://res.cloudinary.com/dyf5xqazg/video/upload/v1765794001/4_awh1f9.mp4";
const video5 = "https://res.cloudinary.com/dyf5xqazg/video/upload/v1765794006/5_jtl2yi.mp4";

export const StoryPage = () => {
  const [extraBubble, setExtraBubble] = useState(null);
  const [currentVideo, setCurrentVideo] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const videoRef = useRef(null);
  const [selectedWords, setSelectedWords] = useState([]);
  const { unitId, lessonId } = useParams();
  const navigate = useNavigate();
  const [showFeedback, setShowFeedback] = useState(false);
  const [showBubble, setShowBubble] = useState(true);
  const [showBanner, setShowBanner] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(0.75);
  const [volume, setVolume] = useState(1);
  const [showVolumeSlider, setShowVolumeSlider] = useState(false);
  const [showSubtitles, setShowSubtitles] = useState(true);
  const [showCaption, setShowCaption] = useState(true);
  const [showSpeedMenu, setShowSpeedMenu] = useState(false);

  const availableSpeeds = [0.5, 0.75, 1, 1.25, 1.5, 2];

  const [isFullscreen, setIsFullscreen] = useState(false);
  const fullscreenContainerRef = useRef(null);

  const videos = [
    {
      type: 'video', url: video1, title: "Section 1",
      subtitles: []
    },
    {
      type: 'video',
      url: video2,
      title: "Section 2",
      subtitles: [
        {
          start: 4.6, end: 8.1,
          words: [
            { text: "'Be", start: 4.7, end: 5.0 },
            { text: "careful,'", start: 5.0, end: 5.3 },
            { text: "Please", start: 6.2, end: 6.5 },
            { text: "don't", start: 6.5, end: 6.8 },
            { text: "play", start: 6.8, end: 7.1 },
            { text: "in", start: 7.1, end: 7.4 },
            { text: "the", start: 7.4, end: 7.7 },
            { text: "kitchen.", start: 7.7, end: 8.0 }
          ]
        },
        {
          start: 8.1, end: 10.5,
          words: [
            { text: "take", start: 8.2, end: 8.5 },
            { text: "your", start: 8.5, end: 8.8 },
            { text: "toys", start: 8.8, end: 9.2 },
            { text: "to", start: 9.2, end: 9.4 },
            { text: "your", start: 9.4, end: 9.7 },
            { text: "bedroom.'", start: 9.7, end: 10.3 }
          ]
        },
        {
          start: 10.5, end: 11.5,
          words: [
            { text: "'Okay", start: 10.7, end: 11.0 },
            { text: "Mum,'", start: 11.0, end: 11.3 }
          ]
        }
      ]
    },
    {
      type: 'video',
      url: video3,
      title: "Section 3",
      subtitles: [
        {
          start: 9, end: 11.5,
          words: [
            { text: "Oh", start: 9.2, end: 9.5 },
            { text: "dear,", start: 9.5, end: 9.8 },
            { text: "there", start: 10.3, end: 10.6 },
            { text: "is", start: 10.6, end: 10.9 },
            { text: "a", start: 10.9, end: 11.2 },
            { text: "mess!", start: 11.2, end: 11.5 }
          ]
        }
      ]
    },
    {
      type: 'video',
      url: video4,
      title: "Section 4",
      subtitles: [
        {
          start: 0.0, end: 2.5,
          words: [
            { text: "'Look", start: 0.1, end: 0.4 },
            { text: "at", start: 0.4, end: 0.7 },
            { text: "all", start: 0.7, end: 1.0 },
            { text: "the", start: 1.0, end: 1.3 },
            { text: "mess!,", start: 1.3, end: 1.6 },
            { text: "What", start: 1.6, end: 1.9 },
            { text: "happened?'", start: 1.9, end: 2.3 }
          ]
        },
        {
          start: 5.0, end: 6.5,
          words: [
            { text: "'Emma", start: 5.1, end: 5.4 },
            { text: "did", start: 5.4, end: 5.7 },
            { text: "it!'", start: 5.7, end: 6.0 }
          ]
        }
      ]
    },
    {
      type: 'video',
      url: video5,
      title: "Section 5",
      subtitles: [
        {
          start: 6.6, end: 9.3,
          words: [
            { text: "'I'm", start: 6.7, end: 7.0 },
            { text: "sorry,", start: 7.0, end: 7.4 },
            { text: "Mum.", start: 7.4, end: 7.8 },
            { text: "I", start: 8.0, end: 8.2 },
            { text: "made", start: 8.2, end: 8.5 },
            { text: "a", start: 8.5, end: 8.7 },
            { text: "mess.'", start: 8.7, end: 9.0 }
          ]
        },
        {
          start: 12.5, end: 15.8,
          words: [
            { text: "'It's", start: 13.2, end: 13.5 },
            { text: "okay.", start: 13.5, end: 13.9 },
            { text: "Let's", start: 14.0, end: 14.3 },
            { text: "clean", start: 14.3, end: 14.6 },
            { text: "up", start: 14.6, end: 14.8 },
            { text: "the", start: 14.8, end: 15.0 },
            { text: "mess", start: 15.0, end: 15.3 },
            { text: "together.'", start: 15.3, end: 15.8 }
          ]
        },
        {
          start: 15.8, end: 20.0,
          words: [
            { text: "John", start: 0.1, end: 0.4 },
            { text: "knows", start: 0.4, end: 0.8 },
            { text: "his", start: 0.8, end: 1.0 },
            { text: "sister", start: 1.0, end: 1.4 },
            { text: "might", start: 1.4, end: 1.7 },
            { text: "be", start: 1.7, end: 1.9 },
            { text: "in", start: 1.9, end: 2.1 },
            { text: "trouble", start: 2.1, end: 2.5 },
            { text: "for", start: 2.5, end: 2.8 },
            { text: "his", start: 2.8, end: 3.0 },
            { text: "mistake,", start: 3.0, end: 3.5 },
            { text: "so", start: 3.6, end: 3.8 },
            { text: "he", start: 3.8, end: 4.0 },
            { text: "tells", start: 4.0, end: 4.3 },
            { text: "the", start: 4.3, end: 4.5 },
            { text: "truth.", start: 4.5, end: 4.9 }
          ]
        }
      ]
    }
  ];

  const cloudPositions = {
    0: [
    ],
    1: [
      { top: '15%', left: '10%' },
      { top: '10%', left: '45%' },
      { top: '15%', left: '5%' }
    ],
    2: [
      { top: '10%', right: '5%', isFlipped: true },
    ],
    3: [
      { bottom: '80%', left: '28%' },
      { top: '30%', left: '35%', isFlipped: true }
    ],
    4: [
      { top: '10%', left: '50%', isFlipped: true },
      { top: '5%', left: '30%' },
      { top: '10%', left: '20%' }
    ],
    5: [
    ]
  };

  const extraBubblesData = [
    {
      itemIndex: 1, start: 0, end: 3.0,
      words: [
        { text: "John", start: 0.0, end: 0.4 },
        { text: "plays", start: 0.4, end: 0.7 },
        { text: "at", start: 0.7, end: 1.2 },
        { text: "home", start: 1.2, end: 1.5 },
        { text: "with", start: 1.5, end: 2.0 },
        { text: "his", start: 2.0, end: 2.2 },
        { text: "little", start: 2.2, end: 2.5 },
        { text: "sister", start: 2.5, end: 2.8 },
        { text: "Emma.", start: 2.8, end: 3.1 }
      ]
    },
    {
      itemIndex: 1, start: 3.1, end: 4.5,
      words: [
        { text: "They", start: 3.2, end: 3.5 },
        { text: "are", start: 3.5, end: 3.8 },
        { text: "having", start: 3.8, end: 4.1 },
        { text: "fun.", start: 4.1, end: 4.4 }
      ]
    },
    {
      itemIndex: 2, start: 0.0, end: 3.0,
      words: [
        { text: "Mum", start: 0.1, end: 1.4 },
        { text: "walks", start: 1.4, end: 1.7 },
        { text: "out", start: 1.7, end: 2.0 },
        { text: "of", start: 2.0, end: 2.3 },
        { text: "the", start: 2.3, end: 2.6 },
        { text: "kitchen.", start: 2.6, end: 2.9 }
      ]
    },
    {
      itemIndex: 2, start: 3.1, end: 9.2,
      words: [
        { text: "The", start: 3.0, end: 3.3 },
        { text: "children", start: 3.3, end: 3.8 },
        { text: "stay", start: 3.8, end: 4.1 },
        { text: "and", start: 4.1, end: 4.4 },
        { text: "play.", start: 4.4, end: 4.8 },
        { text: "John", start: 6.0, end: 6.3 },
        { text: "spills", start: 6.3, end: 6.6 },
        { text: "spices", start: 6.6, end: 6.9 },
        { text: "from", start: 6.9, end: 7.2 },
        { text: "a", start: 7.2, end: 7.5 },
        { text: "jar", start: 7.5, end: 7.8 },
        { text: "onto", start: 7.8, end: 8.1 },
        { text: "the", start: 8.1, end: 8.4 },
        { text: "kitchen", start: 8.4, end: 8.7 },
        { text: "bench.", start: 8.7, end: 9.0 }
      ]
    },
    {
      itemIndex: 3, start: 2.9, end: 4.6,
      words: [
        { text: "John", start: 3.0, end: 3.3 },
        { text: "thinks", start: 3.3, end: 3.6 },
        { text: "about", start: 3.6, end: 3.9 },
        { text: "blaming", start: 3.9, end: 4.2 },
        { text: "Emma.", start: 4.2, end: 4.5 }
      ]
    },
    {
      itemIndex: 4, start: 0.0, end: 4.5,
      words: [
        { text: "John", start: 0.1, end: 0.4 },
        { text: "knows", start: 0.4, end: 0.8 },
        { text: "his", start: 0.8, end: 1.0 },
        { text: "sister", start: 1.0, end: 1.4 },
        { text: "might", start: 1.4, end: 1.7 },
        { text: "be", start: 1.7, end: 1.9 },
        { text: "in", start: 1.9, end: 2.1 },
        { text: "trouble", start: 2.1, end: 2.5 },
        { text: "for", start: 2.5, end: 2.8 },
        { text: "his", start: 2.8, end: 3.0 },
        { text: "mistake,", start: 3.0, end: 3.5 },
        { text: "so", start: 3.6, end: 3.8 },
        { text: "he", start: 3.8, end: 4.0 },
        { text: "tells", start: 4.0, end: 4.3 },
        { text: "the", start: 4.3, end: 4.5 },
        { text: "truth.", start: 4.5, end: 4.9 }
      ]
    }
  ];

  const [showWrongFeedback, setShowWrongFeedback] = useState(false);
  const [isSelecting, setIsSelecting] = useState(false);
  const [showSettingsPopup, setShowSettingsPopup] = useState(false);
  const [autoPlayNext, setAutoPlayNext] = useState(true);
  const [textHighlight, setTextHighlight] = useState(true);
  const settingsPopupRef = useRef(null);
  const [narrationHighlight, setNarrationHighlight] = useState(true);
  const currentVideoData = videos[currentVideo];


  useEffect(() => {
    if (showSettingsPopup && videoRef.current) {
      videoRef.current.pause();
    }
  }, [showSettingsPopup]);

  const activeSubtitleIndex = currentVideoData.subtitles.findIndex(
    sub => currentTime >= sub.start && currentTime < sub.end
  );
  const activeSubtitle = activeSubtitleIndex !== -1
    ? currentVideoData.subtitles[activeSubtitleIndex]
    : null;
  const bubbleStyle = cloudPositions[currentVideo] && cloudPositions[currentVideo][activeSubtitleIndex]
    ? cloudPositions[currentVideo][activeSubtitleIndex]
    : {};

  const handleMouseDown = () => {
    setIsSelecting(true);
  };
  const handleMouseUp = () => {
    if (isSelecting) {
      handleTextSelection();
    }
    setIsSelecting(false);
  };
  useEffect(() => {
    const bubbleToShow = extraBubblesData.find(bubble =>
      bubble.itemIndex === currentVideo &&
      currentTime >= bubble.start &&
      currentTime < bubble.end
    );

    setExtraBubble(bubbleToShow || null);

  }, [currentVideo, currentTime]);
  useEffect(() => {
    const nextVideoIndex = currentVideo + 1;
    if (nextVideoIndex < videos.length) {
      const nextVideoUrl = videos[nextVideoIndex].url;
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'video';
      link.href = nextVideoUrl;
      document.head.appendChild(link);
      return () => {
        document.head.removeChild(link);
      };
    }
  }, [currentVideo, videos]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (currentVideo === 4 && isPlaying) {
      console.log(`Current Time: ${currentTime}, Duration: ${duration}`);
      if (duration > 0 && currentTime >= duration - 0.1) {
        video.pause();
        setShowBanner(true);
      }
    }
  }, [currentTime, currentVideo, isPlaying, duration]);

  const handleTryAgain = () => {
    setSelectedWords([]);
    setShowFeedback(false);
  };
  useEffect(() => {
    setSelectedWords([]);
    setShowFeedback(false);
  }, [currentVideo]);
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleTimeUpdate = () => setCurrentTime(video.currentTime);
    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    const handleLoadedData = () => setDuration(video.duration);

    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('play', handlePlay);
    video.addEventListener('pause', handlePause);
    video.addEventListener('loadeddata', handleLoadedData);

    return () => {
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('play', handlePlay);
      video.removeEventListener('pause', handlePause);
      video.removeEventListener('loadeddata', handleLoadedData);
    };
  }, []);
  useEffect(() => {
    if (showBanner && videoRef.current) {
      videoRef.current.pause();
    }
  }, [showBanner]);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load();
      setCurrentTime(0);
      setShowBubble(true);

      // حاول تشغيل الفيديو الجديد تلقائيًا
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // لا بأس، المتصفح منع التشغيل التلقائي
        });
      }
    }
  }, [currentVideo]);
  useEffect(() => {
    if (showBanner && videoRef.current) {
      videoRef.current.pause();
    }
  }, [showBanner]);


  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, []);
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = playbackSpeed;
    }
  }, [currentVideo, isPlaying, playbackSpeed]);
  const handlePrevious = () => {
    setCurrentVideo(prev => (prev > 0 ? prev - 1 : videos.length - 1));
  };
  const handleNext = () => {
    if (currentVideo === videos.length - 1) {
      navigate(`/unit/${unitId}/lesson/${lessonId}/quiz`);
    } else {
      setCurrentVideo(prev => prev + 1);
    }
  };
  const handleTextSelection = () => {
    const selection = window.getSelection();
    if (!selection || selection.rangeCount === 0) return;

    const selectedText = selection.toString().trim();
    if (!selectedText) return;

    // الكلمات الصحيحة فقط
    const allCorrectWords = ["he","tells","the", "truth"];

    // تقسيم النص المحدد لكلمات
    const wordsInSelection = selectedText
      .split(/\s+/)
      .map(word => word.replace(/[.,?!]/g, '').toLowerCase());

    // التحقق: هل كل الكلمات المحددة صحيحة؟
    const hasWrongWords = wordsInSelection.some(word =>
      word && !allCorrectWords.includes(word)
    );

    // إذا في كلمات غلط
    if (hasWrongWords) {
      setShowWrongFeedback(true);
      setTimeout(() => setShowWrongFeedback(false), 2000);
      selection.removeAllRanges();
      return;
    }

    // التحقق من الكلمات الصحيحة في التحديد
    const correctWordsInSelection = wordsInSelection.filter(word =>
      allCorrectWords.includes(word)
    );

    if (correctWordsInSelection.length > 0) {
      setSelectedWords(prev => {
        const newWords = [...new Set([...prev, ...correctWordsInSelection])];
        const allCorrectSelected = allCorrectWords.every(correctWord =>
          newWords.some(w => w.toLowerCase() === correctWord)
        );

        if (allCorrectSelected && newWords.length === allCorrectWords.length) {
          setShowFeedback(true);
          setTimeout(() => setShowFeedback(false), 2000);
        }

        return newWords;
      });
    }

    selection.removeAllRanges();
  };
  
  const togglePlay = () => {
    if (selectedWords.length === 4) {
      handleNext();
      return;
    }

    if (!videoRef.current) return;

    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }

    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    setIsMuted(prev => !prev);
  };
  const selectPlaybackSpeed = (speed) => {
    setPlaybackSpeed(speed);
    if (videoRef.current) {
      videoRef.current.playbackRate = speed;
    }
    setShowSpeedMenu(false);
  };
  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (videoRef.current) {
      videoRef.current.volume = newVolume;
    }
    setIsMuted(newVolume === 0);
  };
  const toggleFullscreen = () => {
    const container = fullscreenContainerRef.current;
    if (!container) return;

    if (!document.fullscreenElement) {
      container.requestFullscreen().catch(err => {
        alert(`Error attempting to enable full-screen mode: ${err.message} (${err.name})`);
      });
    } else {
      document.exitFullscreen();
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        settingsPopupRef.current &&
        !settingsPopupRef.current.contains(event.target)
      ) {
        setShowSettingsPopup(false);

      }
    };

    if (showSettingsPopup) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () =>
      document.removeEventListener('mousedown', handleClickOutside);
  }, [showSettingsPopup]);


  const handleEnded = useCallback(() => {
    if (currentVideo === 4) {
      setShowBanner(true);
      if (videoRef.current) {
        videoRef.current.pause();
        videoRef.current.currentTime = videoRef.current.duration;
      }
    }
    else if (currentVideo === videos.length - 1) {
      navigate(`/unit/${unitId}/lesson/${lessonId}/quiz`);
    }
    else {
      setShowBanner(false);
      if (autoPlayNext) {
        setCurrentVideo(prev => (prev < videos.length - 1 ? prev + 1 : prev));
      } else {
        if (videoRef.current) {
          videoRef.current.pause();
        }
      }
    }
  }, [currentVideo, videos.length, navigate, unitId, lessonId, autoPlayNext]);


  return (
    <div className="story-page-container">
      {isLoading && (
        <div className="loading-overlay">
          <div className="spinner"></div>
        </div>
      )}
      <div className="w-full max-w-6xl">
        <div ref={fullscreenContainerRef} className="video-wrapper">

          <video
            ref={videoRef}
            className={`
    w-full
    h-full
    object-cover

    ${isFullscreen ? 'fixed inset-0' : 'aspect-video'}
  `}
            muted={isMuted}
            onEnded={handleEnded}
            preload="auto"
            src={currentVideoData.url}
          >
            Your browser does not support the video tag.
          </video>

          {showWrongFeedback && currentVideo === 4 && showBanner && (
            <div className="wrong-feedback">
              Try Again! ❌
            </div>
          )}

          {showFeedback && (
            <div className="feedback-popup">
              Good Job! 👍
            </div>
          )}

          {currentVideo === 4 && showBanner && (
            <div className={`instruction-banner show ${isFullscreen ? 'fullscreen-banner' : ''}`}>
              <p style={{ fontSize: '1.8em', textAlign: 'left' }}>
                Highlight how John decided to take
              </p>
              <p style={{ fontSize: '1.8em', textAlign: 'left' }}>
                responsibility for the mess.
              </p>
            </div>
          )}

          {showBubble && showSubtitles && activeSubtitle && activeSubtitle.words && (
            <div className="subtitle-container" style={bubbleStyle}>

              <div className={`bubble-cloud animate__animated animate__fadeIn ${bubbleStyle?.isFlipped ? 'flipped' : ''}
`}>
                <p
                  onMouseDown={handleMouseDown}
                  onMouseUp={handleMouseUp}
                  style={{ userSelect: 'text', cursor: 'text' }}
                >
                  {activeSubtitle.words.map((word, index) => {
                    const isHighlighted = currentTime >= word.start && currentTime < word.end;
                    const cleanWord = word.text.replace(/[.,?!]/g, '');
                    const isSelected = selectedWords.some(w =>
                      w.toLowerCase() === cleanWord.toLowerCase()
                    );

                    return (
                      <span
                        key={index}
                        className={`word-span 
        ${isHighlighted && textHighlight ? 'active-word' : ''} 
        ${isSelected ? 'selected-word' : ''}`}
                      >
                        {word.text}{' '}
                      </span>
                    );
                  })}
                </p>

                {selectedWords.length === 4 && (
                  <div className="try-again-container">
                    <button
                      onClick={handleTryAgain}
                      className="tryy"
                    >
                      Try Again
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}

          {showCaption && extraBubble && extraBubble.words && (
            <div
              className="subtitle-container"
              style={{ bottom: '0%', left: '50%', transform: 'translateX(-50%)', zIndex: 101 }}
            >
              <div className="extra-cloud animate__animated animate__fadeIn">
                <p>
                  {extraBubble.words.map((word, index) => {
                    const isHighlighted = currentTime >= word.start && currentTime < word.end;
                    return (
                      <span
                        key={index}
                        className={`word-span ${isHighlighted && narrationHighlight ? 'active-word' : ''}`}
                      >
                        {word.text}{' '}
                      </span>
                    );
                  })}
                </p>
              </div>
            </div>
          )}

          <div className="video-overlay" />
          <div className="controls-container">

            <div className="controlbbtn">
              <button onClick={handlePrevious} className="control-btn left-nav-btn">
                <ChevronLeft className="w-8 h-8" />
              </button>

              <button onClick={handleNext} className="control-btn right-nav-btn">
                <ChevronRight className="w-8 h-8" />
              </button>
            </div>

            <div className="controls-wrapper-new">
              <div className="controls-row">
                <div className="controls-group-left">

                  <div className="settings-container">
                    <button
                      onClick={() => setShowSettingsPopup(prev => !prev)}
                      className="control-btn settings-btn"
                      title="Settings"
                    >
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                          d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <span className="control-label">Settings</span>
                    </button>

                    {showSettingsPopup && (
                      <>
                        {/* 1. الخلفية الضبابية (Overlay) */}
                        <div className="settings-overlay" onClick={() => setShowSettingsPopup(false)}></div>

                        {/* 2. حاوية النافذة لتوسيطها */}
                        <div className="settings-popup-container">
                          <div ref={settingsPopupRef} className="settings-popup">
                            <button
                              onClick={() => setShowSettingsPopup(false)}
                              className="close-popup-btn"
                            >
                              ×
                            </button>

                            <h3>Settings</h3>

                            <div className="settings-options-grid">
                              <div className="setting-item">
                                <span className="setting-label">Conversation Caption</span>
                                <label className="toggle-switch">
                                  <input
                                    type="checkbox"
                                    checked={showSubtitles}
                                    onChange={() => setShowSubtitles(!showSubtitles)}
                                  />
                                  <span className="toggle-slider"></span>
                                </label>
                              </div>

                              <div className="setting-item">
                                <span className="setting-label">Text Highlight</span>
                                <label className="toggle-switch">
                                  <input
                                    type="checkbox"
                                    checked={textHighlight}
                                    onChange={() => setTextHighlight(!textHighlight)}
                                  />
                                  <span className="toggle-slider"></span>
                                </label>
                              </div>

                              <div className="setting-item">
                                <span className="setting-label">Narration</span>
                                <label className="toggle-switch">
                                  <input
                                    type="checkbox"
                                    checked={showCaption}
                                    onChange={() => setShowCaption(!showCaption)}
                                  />
                                  <span className="toggle-slider"></span>
                                </label>
                              </div>

                              <div className="setting-item">
                                <span className="setting-label">Narration Highlight</span>
                                <label className="toggle-switch">
                                  <input
                                    type="checkbox"
                                    checked={narrationHighlight}
                                    onChange={() => setNarrationHighlight(!narrationHighlight)}
                                  />
                                  <span className="toggle-slider"></span>
                                </label>
                              </div>

                              <div className="setting-item">
                                <span className="setting-label">Auto Page Turn</span>
                                <label className="toggle-switch">
                                  <input
                                    type="checkbox"
                                    checked={autoPlayNext}
                                    onChange={() => setAutoPlayNext(!autoPlayNext)}
                                  />
                                  <span className="toggle-slider"></span>
                                </label>
                              </div>
                            </div>
                          </div>
                        </div>
                      </>
                    )}
                  </div>

                  <div
                    className="volume-control"
                    onMouseEnter={() => setShowVolumeSlider(true)}
                    onMouseLeave={() => setShowVolumeSlider(false)}
                  >
                    <button onClick={toggleMute} className="control-btn">
                      {isMuted || volume === 0 ? (
                        <VolumeX className="w-6 h-6" />
                      ) : (
                        <Volume2 className="w-6 h-6" />
                      )}
                    </button>
                    {showVolumeSlider && (
                      <div className="volume-slider-container">
                        <input
                          type="range"
                          min="0"
                          max="1"
                          step="0.1"
                          value={volume}
                          onChange={handleVolumeChange}
                          className="volume-slider"
                          orient="vertical"
                        />
                      </div>
                    )}
                  </div>

                  <div className="speed-control-container">
                    <button
                      onClick={() => setShowSpeedMenu(prev => !prev)}
                      className="control-btn speed-btn"
                      title="Playback Speed"
                    >
                      <span className="speed-label">{playbackSpeed}x</span>
                    </button>

                    {showSpeedMenu && (
                      <ul className="speed-dropdown-list">
                        {availableSpeeds.map((speed) => (
                          <li
                            key={speed}
                            onClick={() => selectPlaybackSpeed(speed)}
                            className={playbackSpeed === speed ? 'active-speed' : ''}
                          >
                            {speed}x
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>

                <div className="controls-group-center">
                  <button onClick={togglePlay} className="control-btn play-btn">
                    {isPlaying ? (
                      <Pause className="w-12 h-12" fill="white" />
                    ) : (
                      <Play className="w-12 h-12" fill="white" />
                    )}
                  </button>
                </div>

                <div className="controls-group-right">
                  <button onClick={toggleFullscreen} className="control-btn">
                    {isFullscreen ? (
                      <Minimize2 className="w-6 h-6" />
                    ) : (
                      <Maximize2 className="w-6 h-6" />
                    )}
                  </button>
                </div>
              </div>
            </div>

          </div>

          <div className="progress-indicator-container">
            {videos.map((_, index) => (
              <div
                key={index}
                className={`progress-dot ${index === currentVideo ? 'active' : ''}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
export default StoryPage;