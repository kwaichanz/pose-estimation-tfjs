"use client";

import Image from "next/image";
import * as tf from "@tensorflow/tfjs";
import * as posenet from "@tensorflow-models/posenet";
import Webcam from "react-webcam";
import WebcamComponent from "@/components/WebCam";
import { drawKeypoints, drawSkeleton } from "@/lib/utils";

import { useRef } from "react";

export default function Home() {
  const webcamRef = useRef<any>(null);
  const canvasRef = useRef(null);

  const runPosenet = async () => {
    const net = await posenet.load({
      inputResolution: { width: 640, height: 480 },
      // scale: 0.5,
      architecture: "MobileNetV1",
      outputStride: 16,
      multiplier: 0.75,
    });
    setInterval(() => {
      detect(net);
    }, 100);
  };

  const detect = async (net: posenet.PoseNet) => {
    if (
      typeof webcamRef.current !== "undefined" &&
      webcamRef.current !== null &&
      webcamRef.current.video.readyState === 4
    ) {
      // Get Video Properties
      const video = webcamRef.current.video;
      const videoWidth = webcamRef.current.video.videoWidth;
      const videoHeight = webcamRef.current.video.videoHeight;

      // Set Video sizes
      webcamRef.current.video.width = videoWidth;
      webcamRef.current.video.height = videoHeight;

      // Set Detection
      const pose = await net.estimateSinglePose(video);
      console.log("pose :", pose);

      drawCanvas(pose, video, videoWidth, videoHeight, canvasRef);
    }
  };

  const drawCanvas = (
    pose: any,
    video: any,
    videoWidth: any,
    videoHeight: any,
    canvas: any
  ) => {
    const ctx = canvas.current.getContext("2d");
    canvas.current.width = videoWidth;
    canvas.current.height = videoHeight;

    drawKeypoints(pose["keypoints"], 0.6, ctx);
    drawSkeleton(pose["keypoints"], 0.7, ctx);
  };

  runPosenet();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex bg-purple-300">
        {/* <Webcam className="absolute mx-auto left-0 right-0 text-center z-10 w-[640px] h-[480px]" /> */}
        HGello
        <WebcamComponent ref={webcamRef} />
        <canvas
          ref={canvasRef}
          className="absolute mx-auto left-0 right-0 text-center z-10 w-[640px] h-[480px]"
        />
      </div>
    </main>
  );
}
