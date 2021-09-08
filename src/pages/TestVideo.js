import { useParams } from "react-router-dom";
import { useEffect } from "react";
export default function TestVideo(props) {
  const { testCase } = useParams();
  useEffect(() => {}, [testCase]);

  // 庭均測試 1, 2, 7, 8 iPhone可播

  if (testCase === "1") {
    // .MOV
    return (
      <video
        src={
          "https://gift.freshio.me/api/Cards/video/49A67F60-A536-4FCD-BFCB-5D1A9518869C.MOV" +
          "#t=0.1"
        }
        controls
        preload="auto"
      >
        影片正在上傳中，請稍後。
      </video>
    );
  }

  if (testCase === "2") {
    // .mp4
    return (
      <video
        src={
          "https://gift.freshio.me/api/Cards/video/9360A44D-F126-4A9D-AD88-F13985873830.mp4" +
          "#t=0.1"
        }
        controls
        preload="auto"
      >
        影片正在上傳中，請稍後。
      </video>
    );
  }

  if (testCase === "3") {
    // .MOV
    return (
      <video
        src={
          "https://gift.freshio.me/api/Cards/streaming/49A67F60-A536-4FCD-BFCB-5D1A9518869C" +
          "#t=0.1"
        }
        controls
        preload="auto"
      >
        影片正在上傳中，請稍後。
      </video>
    );
  }

  if (testCase === "4") {
    // .mp4
    return (
      <video
        src={
          "https://gift.freshio.me/api/Cards/streaming/9360A44D-F126-4A9D-AD88-F13985873830" +
          "#t=0.1"
        }
        controls
        preload="auto"
      >
        影片正在上傳中，請稍後。
      </video>
    );
  }

  if (testCase === "5") {
    // .MOV
    return (
      <video
        src={
          "https://gift.freshio.me/api/Cards/video/49A67F60-A536-4FCD-BFCB-5D1A9518869C" +
          "#t=0.1"
        }
        controls
        preload="auto"
      >
        影片正在上傳中，請稍後。
      </video>
    );
  }

  if (testCase === "6") {
    // .mp4
    return (
      <video
        src={
          "https://gift.freshio.me/api/Cards/video/9360A44D-F126-4A9D-AD88-F13985873830" +
          "#t=0.1"
        }
        controls
        preload="auto"
      >
        影片正在上傳中，請稍後。
      </video>
    );
  }

  if (testCase === "7") {
    // .MOV
    return (
      <video
        src={
          "https://gift.freshio.me/api/Cards/video/49A67F60-A536-4FCD-BFCB-5D1A9518869C.mp4" +
          "#t=0.1"
        }
        controls
        preload="auto"
      >
        影片正在上傳中，請稍後。
      </video>
    );
  }

  if (testCase === "8") {
    // .mp4
    return (
      <video
        src={
          "https://gift.freshio.me/api/Cards/video/9360A44D-F126-4A9D-AD88-F13985873830.MOV" +
          "#t=0.1"
        }
        controls
        preload="auto"
      >
        影片正在上傳中，請稍後。
      </video>
    );
  }

  if (testCase === "9") {
    // .MOV
    return (
      <video
        src={
          "https://gift.freshio.me/api/Cards/streaming/49A67F60-A536-4FCD-BFCB-5D1A9518869C.mp4" +
          "#t=0.1"
        }
        controls
        preload="auto"
      >
        影片正在上傳中，請稍後。
      </video>
    );
  }

  if (testCase === "10") {
    // .mp4
    return (
      <video
        src={
          "https://gift.freshio.me/api/Cards/streaming/9360A44D-F126-4A9D-AD88-F13985873830.mp4" +
          "#t=0.1"
        }
        controls
        preload="auto"
      >
        影片正在上傳中，請稍後。
      </video>
    );
  }

  return null;
}
