import { useState } from 'react';
import { GlowButton, RippleButton, JiggleButton } from '../UI/AnimatedButtons';

function DonationPanel({ currentUser }) {
  const [amount, setAmount] = useState(5);
  const [message, setMessage] = useState('');
  const [donationSuccess, setDonationSuccess] = useState(false);
  const [customAmount, setCustomAmount] = useState('');
  const [isCustomAmount, setIsCustomAmount] = useState(false);
  const [showGiftOptions, setShowGiftOptions] = useState(false);
  const [selectedGift, setSelectedGift] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  
  const handleDonate = () => {
    if (!currentUser) return;
    
    // Simulate donation processing
    setIsProcessing(true);
    
    setTimeout(() => {
      setIsProcessing(false);
      setDonationSuccess(true);
      setTimeout(() => setDonationSuccess(false), 3000);
      setMessage('');
      setSelectedGift(null);
      setShowGiftOptions(false);
    }, 1500);
  };
  
  const gifts = [
    { id: 1, name: "Trophy", icon: "🏆", price: 15 },
    { id: 2, name: "Star", icon: "⭐", price: 10 },
    { id: 3, name: "Heart", icon: "❤️", price: 5 },
    { id: 4, name: "Rocket", icon: "🚀", price: 20 },
    { id: 5, name: "Diamond", icon: "💎", price: 50 },
    { id: 6, name: "Crown", icon: "👑", price: 100 },
  ];
  
  return (
    <div className="p-4">
      <h3 className="text-white font-bold mb-4 flex items-center">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-purple-500" viewBox="0 0 20 20" fill="currentColor">
          <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" />
          <path fillRule="evenodd" d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" clipRule="evenodd" />
        </svg>
        Support the Streamer
      </h3>
      
      {donationSuccess && (
        <div className="mb-4 bg-green-500/20 border border-green-500 text-green-400 p-3 rounded-md text-sm animate-pulse">
          Thank you for your donation! The streamer will appreciate your support.
        </div>
      )}
      
      <div className="flex mb-4 space-x-4">
        <button 
          onClick={() => { setIsCustomAmount(false); setShowGiftOptions(false); }}
          className={`flex-1 py-2 px-4 rounded-md ${!isCustomAmount && !showGiftOptions ? 'bg-purple-600 text-white' : 'bg-gray-700 text-gray-300'}`}
        >
          Money
        </button>
        <button 
          onClick={() => { setIsCustomAmount(false); setShowGiftOptions(true); }}
          className={`flex-1 py-2 px-4 rounded-md ${showGiftOptions ? 'bg-purple-600 text-white' : 'bg-gray-700 text-gray-300'}`}
        >
          Gifts
        </button>
      </div>
      
      {!showGiftOptions ? (
        <>
          {isCustomAmount ? (
            <div className="mb-4">
              <label className="text-sm text-gray-300 mb-1 block">Enter amount:</label>
              <div className="flex">
                <span className="inline-flex items-center px-3 border border-r-0 border-gray-600 rounded-l-md bg-gray-700 text-gray-300">$</span>
                <input
                  type="number"
                  min="1"
                  max="1000"
                  className="flex-1 py-2 px-3 bg-gray-700 border border-gray-600 text-white rounded-r-md focus:outline-none focus:ring-1 focus:ring-purple-500"
                  value={customAmount}
                  onChange={(e) => setCustomAmount(e.target.value)}
                />
              </div>
              <RippleButton 
                className="mt-2 w-full py-2 text-sm"
                onClick={() => {
                  if (customAmount && !isNaN(Number(customAmount))) {
                    setAmount(Number(customAmount));
                    setIsCustomAmount(false);
                  }
                }}
              >
                Confirm Amount
              </RippleButton>
            </div>
          ) : (
            <div className="grid grid-cols-5 gap-2 mb-4">
              {[5, 10, 25, 50, 100].map(value => (
                <button
                  key={value}
                  onClick={() => setAmount(value)}
                  className={`py-2 rounded-md font-medium transition-all duration-300 ${
                    amount === value 
                      ? 'bg-purple-600 text-white' 
                      : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  }`}
                >
                  ${value}
                </button>
              ))}
            </div>
          )}
          
          <div className="flex items-center justify-between mb-4">
            <span className="text-gray-300 text-sm">Donation amount:</span>
            <span className="text-white font-bold">${isCustomAmount ? customAmount : amount}</span>
          </div>
          
          <JiggleButton 
            onClick={() => setIsCustomAmount(true)}
            className="w-full py-2 bg-gray-700 text-gray-300 hover:bg-gray-600 mb-4 text-sm"
          >
            Custom Amount
          </JiggleButton>
        </>
      ) : (
        <div className="mb-4">
          <div className="grid grid-cols-3 gap-3">
            {gifts.map(gift => (
              <button
                key={gift.id}
                onClick={() => {
                  setSelectedGift(gift);
                  setAmount(gift.price);
                }}
                className={`flex flex-col items-center p-3 rounded-md transition-all duration-300 ${
                  selectedGift?.id === gift.id 
                    ? 'bg-purple-600/50 border border-purple-500 animate-pulse' 
                    : 'bg-gray-700 hover:bg-gray-600'
                }`}
              >
                <span className="text-2xl mb-1">{gift.icon}</span>
                <span className="text-white text-sm">{gift.name}</span>
                <span className="text-gray-300 text-xs">${gift.price}</span>
              </button>
            ))}
          </div>
        </div>
      )}
      
      <div className="mb-4">
        <textarea
          placeholder="Add a message (optional)"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full h-20 px-3 py-2 rounded-md bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-purple-500 resize-none"
        ></textarea>
      </div>
      
      <GlowButton
        onClick={handleDonate}
        className="w-full py-3 disabled:opacity-50 disabled:cursor-not-allowed font-medium"
        disabled={!currentUser || isProcessing}
      >
        {isProcessing ? (
          <span className="flex items-center justify-center">
            <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Processing...
          </span>
        ) : currentUser ? `Donate $${amount}` : 'Sign in to donate'}
      </GlowButton>
    </div>
  );
}

export default DonationPanel;
