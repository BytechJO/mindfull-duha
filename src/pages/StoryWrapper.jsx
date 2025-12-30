import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import React from "react";
import { h1 } from "motion/react-client";


export default function StoryWrapper() {
  const { unitId, lessonId } = useParams();
  const [lessonData, setLessonData] = useState(null);
  const [storyPageComponent, setStoryPageComponent] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    setError(null);
    setLessonData(`Unit: ${unitId}, Lesson: ${lessonId}`);

    const loadStoryPage = async () => {
      try {
        const module = await import(
          `../units/g1/unit${unitId}/L${lessonId}/StoryPage.jsx`
        );
        setStoryPageComponent(() => module.default);
        setIsLoading(false);
      } catch (error) {
        console.error("Failed to load StoryPage:", error);
        setError(error.message);
        setIsLoading(false);
      }
    };

    loadStoryPage();
  }, [unitId, lessonId]);

  if (isLoading) {
    return (

      <div style={{ padding: 30, textAlign: 'center' }}>
        <p>Loading...</p>
      </div>

    );
  }

  if (error) {
    return (

      <div style={{ padding: 30, textAlign: 'center', color: 'red' }}>
        <p>somthing happend: {error}</p>
      </div>

    );
  }

  if (!storyPageComponent) {
    return (

      <div style={{ padding: 30, textAlign: 'center' }}>
        <p>Not Found</p>
      </div>

    );
  }

  const StoryPageComponent = storyPageComponent;

  return (
    <>
    <br />
    <br />
      {/* <h1 className="text-4xl sm:text-5xl font-bold text-center text-[#6a3996] drop-shadow-lg">
        Unit {unitId}
      </h1> */}
      <StoryPageComponent unitId={unitId} lessonId={lessonId} />
    </>
  );
}