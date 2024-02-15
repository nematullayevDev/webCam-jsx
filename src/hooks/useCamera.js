import { useEffect, useRef, useState } from "react";

export default () => {
  const videoRef = useRef(null);
  const [imgURL, setImgURL] = useState(null);

  useEffect(() => {
    if (!imgURL) {
      startVido();
    }
  }, [imgURL]);

  const startVido = () => {
    const video = videoRef.current;
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: false })
      .then((stream) => {
        video.srcObject = stream;
        video.play();
      })
      .catch((err) => {
        console.error("Xatolik ro'y berdi: " + err);
      });
  };

  function takepicture() {
    if (imgURL) {
      setImgURL(null);
      startVido();
      return;
    }

    const canvas = document.getElementById("canvas");
    const context = canvas.getContext("2d");
    const video = videoRef.current;

    canvas.width = 440;
    canvas.height = 330;
    context.drawImage(video, 0, 0, 440, 330);

    const data = canvas.toDataURL("image/png");
    setImgURL(data);

    const stream = video.srcObject;
    const track = stream.getTracks();

    track.forEach((track) => {
      track.stop();
    });

    video.srcObject = null;
  }

  const download = () => {
    const link = document.createElement("a");




    link.download = `maypic.png`;
    link.href = imgURL;
    link.click();
  };

  return { videoRef, imgURL, takepicture, download };
};
