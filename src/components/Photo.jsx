import useCamera from "../hooks/useCamera";

function Photo() {
  const { videoRef, takepicture, imgURL,download } = useCamera();
  return (
    <div>
      <div className="media">
        {imgURL ? <img src={imgURL} /> : <video ref={videoRef}></video>}
        <div className="action-btn">
          <button onClick={takepicture} className="take">
            {imgURL ? "Retake" : "Take"}
          </button>
          {imgURL && <button onClick={download} className="take">Download</button>}
        </div>
      </div>
      <canvas id="canvas"></canvas>
    </div>
  );
}

export default Photo;
