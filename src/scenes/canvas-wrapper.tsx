"use client";

import { useEffect, useRef } from "react";
import { SceneManager } from "./scene";

interface CanvasWrapperProps {
  reactionKey: string | null;
}

export const CanvasWrapper = ({ reactionKey }: CanvasWrapperProps) => {
  const mountRef = useRef<HTMLDivElement>(null);
  // Use a ref to hold the SceneManager instance to prevent re-creation on re-renders
  const sceneManagerRef = useRef<SceneManager | null>(null);

  // Effect for initializing and cleaning up the Three.js scene
  useEffect(() => {
    if (!mountRef.current) return;

    const manager = new SceneManager(mountRef.current);
    sceneManagerRef.current = manager;
    manager.animate();

    // Cleanup function runs when the component unmounts
    return () => {
      manager.cleanup();
      sceneManagerRef.current = null;
    };
  }, []); // Empty dependency array ensures this runs only once

  // Effect for triggering animations when the reactionKey changes
  useEffect(() => {
    if (sceneManagerRef.current) {
      sceneManagerRef.current.triggerReaction(reactionKey);
    }
  }, [reactionKey]);

  return (
    <div ref={mountRef} className="w-full h-full rounded-lg overflow-hidden" />
  );
};
