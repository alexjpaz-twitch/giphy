import './App.css';

import ComfyJS from 'comfy.js'
import { GiphyFetch } from '@giphy/js-fetch-api'

import { useMemo, useState, useEffect, useRef } from 'react'

const logger = console;

function App() {

  // NOTE: For the Security Champions
  // Yo, I know getting keys from URLs is bad news.
  // But hear me out - for a toy project on twitch with a beta key
  // that has a very low rate limit and can be easily regenerated?
  // I'm not willing to spend the time, effort, and money.
  // I think I can sleep at night knowing that there may be some
  // potental hAx0rs getting the key. This application is not
  // storing sensitive information that can be accessed by
  // that Giphy API key.
  const urlParams = new URLSearchParams(window.location.search);
  const giphyKey = urlParams.get('giphyKey');
  const twitchChannel = urlParams.get('twitchChannel');

 const [ hasInteracted, setHasInteracted ] = useState(false);

  useEffect(() => {
    if(!hasInteracted) {
      // TEST IF WE CAN PROCEED
      (async function() {
        const a = new Audio();
        try {
          await a.play();
          setHasInteracted(true);
        } catch(e) {
        }
      })();

      return;
    }
  });

  if(!twitchChannel || !giphyKey) {
    return (
      <ConfigForm />
    )
  }

  if(!hasInteracted) {
    return <button onClick={e => setHasInteracted(true)}>CLICK ME</button>;
  }

  return (
    <div className="App">
      <TwitchContainer giphyKey={giphyKey} twitchChannel={twitchChannel} />
    </div>
  );
}

function ConfigForm() {
  return (
    <form class='form'>
      <div>
        <label for='giphyKey'>
          Giphy Key
          (<a href='https://developers.giphy.com/dashboard/?create=true'>Create one</a>)
        </label>
        <input type='text' name='giphyKey' placeholder='Paste Giphy App Key' />
      </div>
      <div>
        <label for='twitchChannel'>Twitch Channel</label>
        <input type='text' name='twitchChannel' placeholder='Twitch Channel' />
      </div>
      <div>
        <input type='submit' value='submit' />
      </div>
    </form>
  );
}

function TwitchContainer({ giphyKey, twitchChannel }) {
  const gf = useMemo(() => new GiphyFetch(giphyKey), [ giphyKey ]);

  const [ url, setUrl ] = useState(null);

  useEffect(() => {
    ComfyJS.onCommand = async (user, command, message, flags, extra) => {
      if(command === 'g') {
        let term = message;

        logger.info(`Searching for ${term}`);

        const { data } = await gf.random({ tag: term, rating: 'pg-13' });
        logger.info("Found", data);


        const url = data.image_mp4_url;

        setUrl(url);
      }
    };

    ComfyJS.Init(twitchChannel);

    return () => {
      ComfyJS.Disconnect();
    };
  }, [ gf, twitchChannel ]);

  return (
    <MediaPlayer url={url} />
  );
}

function MediaPlayer({ url }) {
  const videoRef = useRef(null);

  useEffect(() => {
    if(!videoRef.current) return;
    if(!url) return;

    (async function() {
      videoRef.current.src = url;
      await videoRef.current.load();
      videoRef.current.play();

      let onend = () => {};

      let MINIMUM_DURATION = 5 * 1000;

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

export default App;
