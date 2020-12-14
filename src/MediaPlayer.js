import {
  useEffect,
  useRef,
  useState,
  useCallback
} from 'react'

const logger = console;
const NOOP = () => {};

const MINIMUM_DURATION = 5 * 1000;

export function MediaPlayerPlaylist({ url }) {

  const [ queue, setQueue ] = useState([]);

  const [ currentUrl, setCurrentUrl ] = useState(null);

  useEffect(() => {
    logger.info("Queuing video", url);
    setQueue((q) => [...q, url]);
  }, [ url ]);

  useEffect(() => {
    if(!currentUrl && queue.length > 0) {
      const currentUrl = queue.shift();
      setQueue([...queue]);
      setCurrentUrl(currentUrl);
    }

  }, [ queue, currentUrl ]);

  const onEnd = () => {
    if(queue.length > 0) {
      const currentUrl = queue.shift();
      logger.info("Playing next video", currentUrl);

      setQueue([...queue]);

      setCurrentUrl(currentUrl);
    } else {

      logger.info("End of the queue reached");
      setCurrentUrl(null);
    }
  };

  if(!currentUrl) {
    return null;
  }

  return (
    <MediaPlayerElement url={currentUrl} onEnd={onEnd} />
  )
}

export function MediaPlayerElement({ url, onEnd = NOOP }) {
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
          onEnd(url);
        }
      };

      videoRef.current.addEventListener("ended", onend);
    })();
  // TODO - I am obviously doing something "bad" but the "good" standard is preventing my intended behavior
  /* eslint-disable react-hooks/exhaustive-deps */
  }, [ videoRef, url ]);

  return (
    <video ref={videoRef}></video>
  );
}

export function MediaPlayer({ url }) {
  return (
    <MediaPlayerPlaylist url={url} />
  );
}

