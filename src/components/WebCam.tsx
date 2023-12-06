import Webcam from "react-webcam";
import { FC } from "react";

const videoConstraints = {
  width: 640,
  height: 480,
  facingMode: "user",
};

interface WebcamComponentProps {
  ref: any
}

const WebcamComponent: FC<WebcamComponentProps> = () => (
  <Webcam
    audio={false}
    height={480}
    width={640}
    screenshotFormat="image/jpeg"
    videoConstraints={videoConstraints}
    className="absolute mx-auto left-0 right-0 text-center z-10 w-[640px] h-[480px]"
  />
);

export default WebcamComponent;
