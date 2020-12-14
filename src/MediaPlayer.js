import {
  useEffect,
  useRef
} from 'react'

const logger = console;

const MINIMUM_DURATION = 5 * 1000;

export function MediaPlayer({ url }) {
  const videoRef = useRef(null);

  useEffect(() => {
    if(!videoRef.current) return;
    if(!url) return;

    (async function() {
      videoRef.current.src = url;
      await videoRef.current.load();
      videoRef.current.play();

      let onend = () => {};

      let startTime = new Date().getTime();

      onend = (e) => {
        let endTime = new Date().getTime();

        let duration = endTime - startTime;

        if(duration <= MINIMUM_DURATION) {
          logger.info("Duration not reached looping");
          videoRef.current.play();
        } else {
          logger.info("Duration reached ending");
          videoRef.current.src = null;
          videoRef.current.removeEventListener("ended", onend);
        }
      };

      videoRef.current.addEventListener("ended", onend);
    })();
  }, [ videoRef, url ]);

  return (
    <video ref={videoRef}></video>
  );
}

