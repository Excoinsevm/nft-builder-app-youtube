import { ConnectWallet, useAddress } from "@thirdweb-dev/react";
import { NextPage } from "next";
import { useEffect, useRef, useState } from "react";

const backgrounds = [
  '/bg1.png',
  '/bg2.png',
  '/bg3.png',
  '/bg4.PNG',
  '/bg5.PNG',
  '/bg6.PNG',
  '/bg7.PNG',
  '/bg8.PNG',
  '/bg9.PNG',
  '/bg10.PNG',
  '/bg11.PNG',
  '/bg12.PNG',
  '/bg13.PNG',
  '/bg14.PNG',
  '/bg15.PNG',
  '/bg16.PNG',
  '/bg17.PNG',
  '/bg18.PNG',
];

const bodyImages = [
  '/body1.PNG',
  '/body2.PNG',
  '/body3.PNG',
  '/body4.PNG',
  '/body5.PNG',
  '/body6.PNG',
  '/body7.PNG',
  '/body8.PNG',
  '/body9.PNG',
  '/body10.PNG',
  '/body11.PNG',
  '/body12.PNG',
  '/body13.PNG',
  '/body14.PNG',
  '/body15.PNG',
  '/body16.PNG',
  '/body17.PNG',
  '/body18.PNG',
];

const headImages = [
  '/head1.PNG',
  '/head2.PNG',
  '/head3.PNG',
  '/head4.PNG',
  '/head5.PNG',
  '/head6.PNG',
  '/head7.PNG',
  '/head8.PNG',
  '/head9.PNG',
  '/head10.PNG',
  '/head11.PNG',
  '/head12.PNG',
  '/head13.PNG',
  '/head14.PNG',
  '/head15.PNG',
  '/head16.PNG',
  '/head17.PNG',
  '/head18.PNG',
  '/head19.PNG',
  '/head20.PNG',
  '/head21.PNG',
  '/head22.PNG',
  '/head23.PNG',
  '/head24.PNG',
  '/head25.PNG',
  '/head26.PNG',
  '/head27.PNG',
  '/head28.PNG',
  '/head29.PNG',
  '/head30.PNG',
  '/head31.PNG',
  '/head32.PNG',
  '/head33.PNG',
  '/head34.PNG',
  '/head35.PNG',
  '/head36.PNG',
  '/head37.PNG',
  '/head38.PNG',
  '/head39.PNG',
  '/head40.PNG',
  '/head41.PNG',
  '/head42.PNG',
  '/head43.PNG',
  '/head44.PNG',
  '/head45.PNG',
  '/head46.PNG',
  '/head47.PNG',
  '/head48.PNG',
  '/head49.PNG',
  '/head50.PNG',
  '/head51.PNG',
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
