import {
  useState,
  useEffect
} from 'react'

export function DOMInteractionCheck({ children }) {

  const [ canPlayMedia, setCanPlayMedia ] = useState(true);

  useEffect(() => {
    // TEST IF WE CAN PROCEED
    (async function() {
      const media = document.createElement('video');
      media.muted = false;

      try {
        await media.play();
      } catch(e) {
        setCanPlayMedia(true);
      }
    })();
  });


  if(!canPlayMedia) {
    return <button onClick={e => setCanPlayMedia(true)}>CLICK ME}</button>;
  }

  return (children);
}
