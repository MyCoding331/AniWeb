import { HiOutlineSwitchHorizontal } from "react-icons/hi";
import { IconContext } from "react-icons";
import "./Video.scss";
import Loading from "../../pages/Loading/Loading";
import ReactPlayer from "react-player/lazy";
function VideoPlayer({ sources, internalPlayer, setInternalPlayer, title }) {
  let src = sources.sources[0].file;
  if (src.includes("mp4")) {
    src = sources.sources_bk[0].file;
  }
  const handleReady = (player) => {
    this.player = player; // Store a player that is ready for methods
    this.player.getInternalPlayer(); // Internal player now ready
  };
  return (
    <div
      style={{
        marginBottom: "1rem",
        fontFamily: '"Gilroy-Medium", sans-serif',
        "--plyr-color-main": "#7676FF",
      }}
    >
      <div className="video-wrapper">
        <div className="Conttainer">
          <IconContext.Provider
            value={{
              size: "1.5rem",
              color: "white",
              style: {
                verticalAlign: "middle",
              },
            }}
          >
            {internalPlayer && (
              <div>
                <p>Internal Player</p>
                <p className="alert">
                  double tap to <span>Forward</span> or <span>Rewind</span> 10s
                </p>
              </div>
            )}
            <div className="tooltip-wrapper">
              <div className="tooltip">
                <button onClick={() => setInternalPlayer(!internalPlayer)}>
                  <HiOutlineSwitchHorizontal />
                </button>
                <span className="tooltiptext">Change Server</span>
              </div>
            </div>
          </IconContext.Provider>
        </div>
        <ReactPlayer
          url={src}
          playing={true}
          controls={true}
          className="player-react"
          width="100%"
          height="100%"
          
          onReady={handleReady}
        />
      </div>
      {/* <video id="player" playsInline crossorigin="anonymous"></video> */}

      {/* <JoLPlayer
        option={{
          videoSrc:{src},
          width: 750,
          height: 420,
        }}
      /> */}
    </div>
  );
}

export default VideoPlayer;
