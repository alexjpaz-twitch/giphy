import './App.css';

import ComfyJS from 'comfy.js'
import { GiphyFetch } from '@giphy/js-fetch-api'

import { useMemo, useState, useEffect } from 'react'

import { MediaPlayer } from './MediaPlayer';
import { MediaPlayCheck } from './MediaPlayCheck';

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

  if(!twitchChannel || !giphyKey) {
    return (
      <ConfigForm />
    )
  }

  return (
    <div className="App">
      <MediaPlayCheck>
        <TwitchContainer giphyKey={giphyKey} twitchChannel={twitchChannel} />
      </MediaPlayCheck>
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

export default App;
