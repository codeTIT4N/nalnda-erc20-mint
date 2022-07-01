import './App.css';
import { useEffect, useState } from 'react'
import { ethers } from "ethers";

const abi = [
  {
    "inputs": [],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "owner",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "spender",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "value",
        "type": "uint256"
      }
    ],
    "name": "Approval",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "previousOwner",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "newOwner",
        "type": "address"
      }
    ],
    "name": "OwnershipTransferred",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "from",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "value",
        "type": "uint256"
      }
    ],
    "name": "Transfer",
    "type": "event"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "owner",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "spender",
        "type": "address"
      }
    ],
    "name": "allowance",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "spender",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "approve",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "account",
        "type": "address"
      }
    ],
    "name": "balanceOf",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "decimals",
    "outputs": [
      {
        "internalType": "uint8",
        "name": "",
        "type": "uint8"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "spender",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "subtractedValue",
        "type": "uint256"
      }
    ],
    "name": "decreaseAllowance",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "spender",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "addedValue",
        "type": "uint256"
      }
    ],
    "name": "increaseAllowance",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "mint",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "name",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "owner",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "renounceOwnership",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "symbol",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "totalSupply",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "transfer",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "from",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "transferFrom",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "newOwner",
        "type": "address"
      }
    ],
    "name": "transferOwnership",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
];
// const addressRinkeby = "0x16B05d9d5AB2e1369faFDEAd000770C1F2621841";
// const addressRopsten = "0x4e965B1F0A61C06f17312E5989CAB18d8E33755b";
const addressMumbai = "0xfEc014B41506430F055ceff9A007e690D409b304";
function App() {

  const [loader, setLoader] = useState(false);
  const [currentAddress, setAddress] = useState(null);
  const [showConnect, setShowConnect] = useState(false);
  const [chainId, setChainId] = useState(null);
  const [input, setInput] = useState(null)

  useEffect(() => {
    loadWeb3();
  }, [])

  useEffect(() => {
    window.ethereum.on('chainChanged', async function (accounts) {
      window.location.reload()
    })
  }, [])
  useEffect(() => {
    window.ethereum.on('accountsChanged', async function (accounts) {
      window.location.reload()
    })
  }, [])


  const loadWeb3 = async () => {
    setLoader(true);
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const network = await provider.getNetwork();
      setChainId(network.chainId)
      const signer = provider.getSigner()
      setAddress(await signer.getAddress())
      setShowConnect(false)
    } catch (err) {
      console.log(err);
      setShowConnect(true)
    }
    setLoader(false);
  }
  const connect = async (e) => {
    e.preventDefault()
    setLoader(true);
    let x = await window.ethereum.enable()
    if (x)
      setShowConnect(false)
    setLoader(false);
  }

  const handleSubmit = async (e) => {
    setLoader(true);
    e.preventDefault()
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner()
    let _address = null;
    if (chainId != null) {
      _address = addressMumbai;
    } else {
      alert("wrong network!!! Please switch to mumbai")
    }
    try {
      let _contract = new ethers.Contract(_address, abi, signer);
      await _contract.mint(ethers.utils.parseEther(input));
    } catch (err) {
      console.log(err);
      alert("Make sure metamask is connected (using connect button on top right corner)!!!")
    }
    setLoader(false);
  }


  if (loader) {
    return <h1 style={{ textAlign: 'center' }}>loading...</h1>
  }
  if (chainId != '80001') {
    return <h1 style={{ textAlign: 'center' }}>Please switch network to mumbai matic</h1>
  }
  return (
    <div className="App">
      <nav className="navbar navbar-light bg-light">
        <div className="container-fluid">
          <a className="navbar-brand"></a>
          <form className="d-flex">
            {showConnect ?
              <button type="button" className="btn btn-primary" onClick={connect}>Connect</button>
              :
              <h4>{currentAddress}</h4>
            }
          </form>
        </div>
      </nav>
      <h1 style={{ textAlign: 'center' }}>Mint NALNDA USDC Test Tokens</h1>
      <br />
      <form style={{ textAlign: 'center' }} onSubmit={handleSubmit}>
        <input style={{ textAlign: 'center' }} className='form-control' type="number" step="any" placeholder="Enter amount" min='0' required onChange={(e) => {
          setInput(e.target.value)
        }} />
        <br />
        <input type="submit" value="Mint Tokens" className='btn btn-success' />
      </form>

      <hr />
      <h4>Contract addresses for Nalnda USDC Test Tokens</h4>
      <h5>On Mumbai Matic: {addressMumbai}</h5>
      <hr />
    </div>
  );
}

export default App;