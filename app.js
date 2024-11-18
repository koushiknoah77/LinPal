const connectButton = document.getElementById('connectButton');
const profileDiv = document.getElementById('profile');
const sendETHSection = document.getElementById('sendETHSection');
const walletAddress = document.getElementById('walletAddress');
const ethBalance = document.getElementById('ethBalance');
const saveProfileButton = document.getElementById('saveProfile');
const clearProfileButton = document.getElementById('clearProfile');
const amountInput = document.getElementById('amount');
const recipientInput = document.getElementById('recipient');
const sendETHButton = document.getElementById('sendETHButton');
const statusMessage = document.getElementById('statusMessage');
const errorMessage = document.getElementById('errorMessage');
const shortBioInput = document.getElementById('shortBio');
const tagsInput = document.getElementById('tags');

// Matchmaking Elements
const findMatchesButton = document.getElementById('findMatchesButton');
const matchResultsDiv = document.getElementById('matchResults');
const matchesList = document.getElementById('matchesList');

// Theme Toggle
const themeToggle = document.getElementById('themeToggle');
let darkMode = localStorage.getItem('darkMode') === 'true';

const toggleTheme = () => {
    darkMode = !darkMode;
    localStorage.setItem('darkMode', darkMode);
    document.body.classList.toggle('dark-mode', darkMode);
    document.body.classList.toggle('light-mode', !darkMode);
    themeToggle.textContent = darkMode ? '☀️' : '🌙';
};

themeToggle.addEventListener('click', toggleTheme);
toggleTheme(); // Set the theme on page load

// Ethereum Wallet Connection
let provider, signer, wallet;

const connectWallet = async () => {
    if (window.ethereum) {
        try {
            await window.ethereum.request({ method: 'eth_requestAccounts' });
            provider = new ethers.providers.Web3Provider(window.ethereum);
            signer = provider.getSigner();
            wallet = await signer.getAddress();
            updateWalletInfo();
        } catch (error) {
            alert('Connection error: ' + error.message);
        }
    } else {
        alert('Please install MetaMask!');
    }
};

const updateWalletInfo = async () => {
    walletAddress.textContent = wallet;
    const balance = await provider.getBalance(wallet);
    ethBalance.textContent = ethers.utils.formatEther(balance);
    profileDiv.classList.remove('hidden');
    sendETHSection.classList.remove('hidden');
};

connectButton.addEventListener('click', connectWallet);

// Profile Saving
const saveProfile = () => {
    const bio = shortBioInput.value;
    const tags = tagsInput.value;
    console.log('Profile Saved:', { bio, tags });
    // Implement logic to save profile in storage or blockchain
};

saveProfileButton.addEventListener('click', saveProfile);

// Clear Profile
clearProfileButton.addEventListener('click', () => {
    shortBioInput.value = '';
    tagsInput.value = '';
});

// Find Matches
const findMatches = () => {
    matchResultsDiv.classList.remove('hidden');
    matchesList.innerHTML = 
        <li>Match 1 - Crypto Enthusiast</li>
        <li>Match 2 - NFT Collector</li>
        <li>Match 3 - ETH Maximalist</li>
    ;
};

findMatchesButton.addEventListener('click', findMatches);

// Send ETH
const sendETH = async () => {
    try {
        const recipient = recipientInput.value;
        const amount = ethers.utils.parseEther(amountInput.value);
        const tx = await signer.sendTransaction({
            to: recipient,
            value: amount,
        });
        statusMessage.classList.remove('hidden');
        await tx.wait();
        statusMessage.classList.add('hidden');
        alert('Transaction sent successfully');
    } catch (error) {
        errorMessage.textContent = 'Error sending transaction: ' + error.message;
        errorMessage.classList.remove('hidden');
    }
};

sendETHButton.addEventListener('click', sendETH);
