import { ConnectWallet, useAddress } from "@thirdweb-dev/react";
import { NextPage } from "next";
import { useEffect, useRef, useState } from "react";

const backgrounds = [
  '/bg1.png',
  '/bg2.png',
  '/bg3.png',
  '/bg4.png',
  '/bg5.png',
  '/bg6.png',
  '/bg7.png',
  '/bg8.png',
  '/bg9.png',
  '/bg10.png',
  '/bg11.png',
  '/bg12.png',
  '/bg13.png',
  '/bg14.png',
  '/bg15.png',
  '/bg16.png',
  '/bg17.png',
  '/bg18.png',
];

const bodyImages = [
  '/body1.png',
  '/body2.png',
  '/body3.png',
  '/body4.png',
  '/body5.png',
  '/body6.png',
  '/body7.png',
  '/body8.png',
  '/body9.png',
  '/body10.png',
  '/body11.png',
  '/body12.png',
  '/body13.png',
  '/body14.png',
  '/body15.png',
  '/body16.png',
  '/body17.png',
  '/body18.png',
];

const headImages = [
  '/head1.png',
  '/head2.png',
  '/head3.png',
  '/head4.png',
  '/head5.png',
  '/head6.png',
  '/head7.png',
  '/head8.png',
  '/head9.png',
  '/head10.png',
  '/head11.png',
  '/head12.png',
  '/head13.png',
  '/head14.png',
  '/head15.png',
  '/head16.png',
  '/head17.png',
  '/head18.png',
  '/head19.png',
  '/head20.png',
  '/head21.png',
  '/head22.png',
  '/head23.png',
  '/head24.png',
  '/head25.png',
  '/head26.png',
  '/head27.png',
  '/head28.png',
  '/head29.png',
  '/head30.png',
  '/head31.png',
  '/head32.png',
  '/head33.png',
  '/head34.png',
  '/head35.png',
  '/head36.png',
  '/head37.png',
  '/head38.png',
  '/head39.png',
  '/head40.png',
  '/head41.png',
  '/head42.png',
  '/head43.png',
  '/head44.png',
  '/head45.png',
  '/head46.png',
  '/head47.png',
  '/head48.png',
  '/head49.png',
  '/head50.png',
  '/head51.png',
];

const Home: NextPage = () => {
  const address = useAddress();

  const [selectedBackground, setSelectedBackground] = useState<string>('');
  const [selectedBody, setSelectedBody] = useState<string>('');
  const [selectedHead, setSelectedHead] = useState<string>('');
  const [nftName, setNftName] = useState<string>('');
  const [isNFTMinting, setIsNFTMinting] = useState<boolean>(false);

  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    if (selectedBackground && selectedBody && selectedHead) {
      const bgImg = new Image();
      bgImg.onload = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(bgImg, 0, 0, canvas.width, canvas.height);

        const bodyImg = new Image();
        bodyImg.onload = () => {
          ctx.drawImage(bodyImg, 0, 0, canvas.width, canvas.height);

          const headImg = new Image();
          headImg.onload = () => {
            ctx.drawImage(headImg, 0, 0, canvas.width, canvas.height);
          };
          headImg.src = selectedHead;
        };
        bodyImg.src = selectedBody;
      };
      bgImg.src = selectedBackground;
    }
  }, [selectedBackground, selectedBody, selectedHead]);

  const convertCanvasToBlob = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      canvas.toBlob((blob) => {
        if (blob) {
          sendNFTMintRequest(blob);
        }
      }, 'image/png');
    }
  };

  const sendNFTMintRequest = async (blob: Blob) => {
    const formData = new FormData();
    formData.append('image', blob, 'nft.png');
    formData.append('name', nftName);
    formData.append('address', address || '');

    setIsNFTMinting(true);
    try {
      const response = await fetch('/api/mintNFT', {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message);
      alert('NFT minted successfully!');
    } catch (error) {
      console.error(error);
    } finally {
      setIsNFTMinting(false);
      setSelectedBackground('');
      setSelectedBody('');
      setSelectedHead('');
      setNftName('');
    }
  };

  if (!address) {
    return (
      <div style={{
        display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh'
      }}>
        <ConnectWallet />
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', marginTop: '40px', justifyContent: 'center' }}>
      <div style={{
        display: 'flex', flexDirection: 'column', padding: '2rem',
        backgroundColor: '#333', borderRadius: '10px', marginRight: '2rem',
      }}>
        <ConnectWallet style={{ width: '100%' }} />

        <h3>Select a background:</h3>
        {backgrounds.map((bg) => (
          <img
            key={bg}
            src={bg}
            onClick={() => setSelectedBackground(bg)}
            style={{
              width: '100px',
              cursor: 'pointer',
              border: selectedBackground === bg ? '2px solid royalblue' : '',
              marginRight: '1rem',
            }}
          />
        ))}

        <h3>Select a body:</h3>
        {bodyImages.map((b) => (
          <img
            key={b}
            src={b}
            onClick={() => setSelectedBody(b)}
            style={{
              width: '100px',
              cursor: 'pointer',
              border: selectedBody === b ? '2px solid royalblue' : '',
              marginRight: '1rem',
            }}
          />
        ))}

        <h3>Select a head:</h3>
        {headImages.map((h) => (
          <img
            key={h}
            src={h}
            onClick={() => setSelectedHead(h)}
            style={{
              width: '100px',
              cursor: 'pointer',
              border: selectedHead === h ? '2px solid royalblue' : '',
              marginRight: '1rem',
            }}
          />
        ))}

        <h3>Create a name:</h3>
        <input
          type="text"
          placeholder="NFT name"
          value={nftName}
          onChange={(e) => setNftName(e.target.value)}
          style={{
            padding: '1rem', marginTop: '1rem',
            border: '1px solid #ccc', borderRadius: '5px', width: '100%',
          }}
        />

        {selectedBackground && selectedBody && selectedHead && nftName && (
          <button
            style={{
              padding: '1rem', marginTop: '3rem', cursor: 'pointer',
              backgroundColor: 'royalblue', color: 'white',
              border: 'none', borderRadius: '5px', width: '100%',
            }}
            disabled={isNFTMinting}
            onClick={convertCanvasToBlob}
          >
            {isNFTMinting ? 'Minting...' : 'Mint NFT'}
          </button>
        )}
      </div>

      <div>
        <canvas ref={canvasRef} width="500" height="500"
          style={{ border: '1px solid black', marginTop: '20px' }} />
      </div>
    </div>
  );
};

export default Home;
