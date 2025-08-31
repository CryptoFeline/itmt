// Jupiter Plugin Integration with ITMT Styling
function initializeJupiterWidget() {
    if (typeof window.Jupiter !== 'undefined') {
        console.log('Initializing Jupiter widgets with ITMT styling...');
        
        // Apply CSS variables before widget initialization
        applyJupiterStyling();
        
        // Desktop Widget - jupiter-target-container
        const desktopContainer = document.getElementById('jupiter-target-container');
        if (desktopContainer) {
            window.Jupiter.init({
                displayMode: "integrated",
                integratedTargetId: "jupiter-target-container",
                formProps: {
                    initialAmount: "1000000000",
                    initialInputMint: "So11111111111111111111111111111111111111112",
                    initialOutputMint: "AATECgWF4KjALbpgUXjabqFKHmdtjWdfdFNzCH3ipump",
                    fixedMint: "AATECgWF4KjALbpgUXjabqFKHmdtjWdfdFNzCH3ipump",
                },
                branding: {
                    logoUri: "./src/img/ITMT_Logo.svg",
                    name: "In The Meme Time",
                },
                containerStyles: {
                    width: 'auto',
                    height: 'auto',
                    borderRadius: '12px',
                    overflow: 'hidden',
                },
                containerClassName: 'jupiter-container'
                });

            
            // Apply additional styling after initialization
            setTimeout(() => applyJupiterCustomStyles(), 1000);
        }
        
        // Mobile Widget  
        const mobileContainer = document.getElementById('jupiter-target-container-mobile');
        if (mobileContainer) {
            window.Jupiter.init({
                displayMode: "integrated",
                integratedTargetId: "jupiter-target-container-mobile",
                formProps: {
                    initialAmount: "1000000000",
                    initialInputMint: "So11111111111111111111111111111111111111112",
                    initialOutputMint: "AATECgWF4KjALbpgUXjabqFKHmdtjWdfdFNzCH3ipump",
                    fixedMint: "AATECgWF4KjALbpgUXjabqFKHmdtjWdfdFNzCH3ipump",
                },
                branding: {
                    logoUri: "./src/img/ITMT_Logo.svg",
                    name: "In The Meme Time",
                },
                containerStyles: {
                    width: 'auto',
                    height: 'auto',
                    borderRadius: '12px',
                    overflow: 'hidden',
                }
            });

            // Apply additional styling after initialization
            setTimeout(() => applyJupiterCustomStyles(), 1000);
        }
    } else {
        console.warn('Jupiter plugin not loaded, retrying...');
        setTimeout(initializeJupiterWidget, 1000);
    }
}

// Apply Jupiter styling variables
function applyJupiterStyling() {
    const style = document.createElement('style');
    style.textContent = `
        :root {
            --jupiter-plugin-primary: 224, 79, 51;
            --jupiter-plugin-background: 255, 255, 255;
            --jupiter-plugin-primary-text: 2, 3, 26;
            --jupiter-plugin-warning: 255, 0, 99;
            --jupiter-plugin-interactive: 224, 79, 51;
            --jupiter-plugin-module: 252, 233, 191;
        }
    `;
    document.head.appendChild(style);
}

// Apply custom styles to Jupiter widget elements
function applyJupiterCustomStyles() {
    // Target Jupiter widget containers
    const jupiterWidgets = document.querySelectorAll('[id*="jupiter-target"]');
    
    jupiterWidgets.forEach(widget => {
        // Apply ITMT styling to widget container
        if (widget) {
            widget.style.backgroundColor = 'transparent';
            widget.style.overflow = 'hidden';

            // Apply styling to child elements
            const jupiterRoot = widget.querySelector('.jupiter-root, [class*="jupiter"]');
            if (jupiterRoot) {
                jupiterRoot.style.setProperty('--jupiter-plugin-bg', 'linear-gradient(90deg, #e04f33, #ce2d51)', 'important');
                jupiterRoot.style.setProperty('--jupiter-plugin-interactive', 'linear-gradient(90deg, #e04f33, #ce2d51)', 'important');
                jupiterRoot.style.setProperty('--jupiter-plugin-primary', 'rgba(224, 80, 51)', 'important');
                jupiterRoot.style.setProperty('--jupiter-plugin-primary-text', 'rgb(255, 255, 255)', 'important');
            }
        }
    });
}

function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        // Show a brief success message
        const event = new CustomEvent('showNotification', {
            detail: { message: 'Token address copied to clipboard!', type: 'success' }
        });
        document.dispatchEvent(event);
    }).catch(err => {
        console.error('Failed to copy: ', err);
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = text;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        
        const event = new CustomEvent('showNotification', {
            detail: { message: 'Token address copied!', type: 'success' }
        });
        document.dispatchEvent(event);
    });
}

// Enhanced DApp Mockup JavaScript - Token Claiming Dashboard
class EnhancedDAppMockup {
    constructor() {
        this.isConnected = false;
        this.mockUserData = {
            wallet: "7xKY...9mNp",
            fullWallet: "7xKYHx3qKQk1cQk4JJzQK9mNpR1xVzKm3vQ",
            totalEarned: 1234.56,
            claimableBalance: 789.23,
            rank: 127,
            lastClaim: "2025-08-15",
            gameLevel: 15,
            totalTaps: 156743,
            hoursPlayed: 47.2,
            achievements: [
                { name: "First Tap", icon: "🎯", description: "Completed your first tap" },
                { name: "Clock Spammer", icon: "⚡", description: "Reached 1000 taps in a session" },
                { name: "Daily Player", icon: "📅", description: "Played for 7 consecutive days" },
                { name: "Time Master", icon: "⏰", description: "Reached level 10" },
                { name: "Token Collector", icon: "💎", description: "Earned 1000+ ITMT tokens" }
            ]
        };
        
        this.initializeEventListeners();
        this.setupAnimations();
    }
    
    initializeEventListeners() {
        const connectBtn = document.getElementById('connect-wallet-btn');
        const disconnectBtn = document.getElementById('disconnect-btn');
        const claimBtn = document.getElementById('claim-tokens-btn');
        
        if (connectBtn) {
            connectBtn.addEventListener('click', () => this.connectWallet());
        }
        
        if (disconnectBtn) {
            disconnectBtn.addEventListener('click', () => this.disconnectWallet());
        }
        
        if (claimBtn) {
            claimBtn.addEventListener('click', () => this.claimTokens());
        }
    }
    
    setupAnimations() {
        // Add subtle animations to stats when connected
        this.statsUpdateInterval = null;
    }
    
    async connectWallet() {
        const connectBtn = document.getElementById('connect-wallet-btn');
        
        // Show loading state with enhanced animation
        connectBtn.innerHTML = '<span class="wallet-spinner">⏳</span><div class="text-block-20">Connecting...</div>';
        connectBtn.disabled = true;
        connectBtn.style.opacity = '0.7';
        
        // Simulate realistic wallet connection delay
        await new Promise(resolve => setTimeout(resolve, 2500));
        
        // Show connection success animation
        connectBtn.innerHTML = '<span>✅</span><div class="text-block-20">Connected!</div>';
        await new Promise(resolve => setTimeout(resolve, 800));
        
        // Switch to connected state
        this.isConnected = true;
        this.showConnectedState();
        
        // Show success notification
        this.showNotification('Phantom wallet connected successfully!', 'success');
        
        // Start live stats updates
        this.startLiveUpdates();
    }
    
    disconnectWallet() {
        this.isConnected = false;
        this.showDisconnectedState();
        this.showNotification('Wallet disconnected', 'info');
        this.stopLiveUpdates();
    }
    
    async claimTokens() {
        const claimBtn = document.getElementById('claim-tokens-btn');
        
        if (this.mockUserData.claimableBalance <= 0) {
            this.showNotification('No tokens available to claim', 'warning');
            return;
        }
        
        // Show processing state with better animation
        claimBtn.innerHTML = '<span class="processing-spinner">🔄</span><div class="text-block-20">Processing...</div>';
        claimBtn.disabled = true;
        claimBtn.style.opacity = '0.7';
        
        // Simulate transaction processing
        await new Promise(resolve => setTimeout(resolve, 3500));
        
        // Update user data
        const claimedAmount = this.mockUserData.claimableBalance;
        this.mockUserData.totalEarned += claimedAmount;
        this.mockUserData.claimableBalance = 0;
        this.mockUserData.lastClaim = new Date().toISOString().split('T')[0];
        
        // Update UI with animation
        this.updateUserStats(true);
        claimBtn.innerHTML = '<span>✅</span><div class="text-block-20">Claimed!</div>';
        
        // Show success notification
        this.showNotification(`Successfully claimed ${claimedAmount.toFixed(2)} $ITMT tokens!`, 'success');
        
        // Reset claimable balance after demo period
        setTimeout(() => {
            this.mockUserData.claimableBalance = Math.floor(Math.random() * 300) + 150;
            this.updateUserStats();
            claimBtn.innerHTML = `<div class="text-block-20">Claim ${this.mockUserData.claimableBalance.toFixed(2)} $ITMT</div>`;
            claimBtn.disabled = false;
            claimBtn.style.opacity = '1';
        }, 8000);
    }
    
    showConnectedState() {
        const preConnection = document.getElementById('pre-connection');
        const postConnection = document.getElementById('post-connection');
        
        if (preConnection) preConnection.style.display = 'none';
        if (postConnection) postConnection.style.display = 'block';
        
        this.updateUserStats();
        this.animateStatsCards();
    }
    
    showDisconnectedState() {
        const preConnection = document.getElementById('pre-connection');
        const postConnection = document.getElementById('post-connection');
        
        if (postConnection) postConnection.style.display = 'none';
        if (preConnection) preConnection.style.display = 'block';
        
        // Reset connect button
        const connectBtn = document.getElementById('connect-wallet-btn');
        if (connectBtn) {
            connectBtn.innerHTML = '<span>👛</span><div class="text-block-20">Connect Wallet to Claim</div>';
            connectBtn.disabled = false;
            connectBtn.style.opacity = '1';
        }
    }
    
    updateUserStats(animate = false) {
        // Update wallet display
        const walletDisplay = document.getElementById('wallet-display');
        if (walletDisplay) {
            walletDisplay.textContent = this.mockUserData.wallet;
        }
        
        // Update stats with selectors that match the HTML structure
        const statCards = document.querySelectorAll('#post-connection .dapp-stat-card, #post-connection > div > div:nth-child(2) > div');
        if (statCards.length >= 3) {
            const totalEarnedCard = statCards[0].querySelector('.white:last-child') || statCards[0].querySelector('div:last-child');
            const claimableCard = statCards[1].querySelector('.white:last-child') || statCards[1].querySelector('div:last-child');
            const rankCard = statCards[2].querySelector('.white:last-child') || statCards[2].querySelector('div:last-child');
            
            if (totalEarnedCard) {
                if (animate) this.animateNumberChange(totalEarnedCard, this.mockUserData.totalEarned);
                else totalEarnedCard.textContent = `${this.mockUserData.totalEarned.toFixed(2)} $ITMT`;
            }
            
            if (claimableCard) {
                if (animate) this.animateNumberChange(claimableCard, this.mockUserData.claimableBalance);
                else claimableCard.textContent = `${this.mockUserData.claimableBalance.toFixed(2)} $ITMT`;
            }
            
            if (rankCard) {
                rankCard.textContent = `#${this.mockUserData.rank}`;
            }
        }
        
        // Update claim button
        const claimBtn = document.getElementById('claim-tokens-btn');
        if (claimBtn && this.mockUserData.claimableBalance > 0) {
            claimBtn.innerHTML = `<div class="text-block-20">Claim ${this.mockUserData.claimableBalance.toFixed(2)} $ITMT</div>`;
            claimBtn.disabled = false;
            claimBtn.style.opacity = '1';
        }
    }
    
    animateNumberChange(element, newValue) {
        const currentValue = parseFloat(element.textContent.replace(/[^\d.]/g, '')) || 0;
        const increment = (newValue - currentValue) / 20;
        let step = 0;
        
        const animation = setInterval(() => {
            step++;
            const value = currentValue + (increment * step);
            element.textContent = `${value.toFixed(2)} $ITMT`;
            
            if (step >= 20) {
                clearInterval(animation);
                element.textContent = `${newValue.toFixed(2)} $ITMT`;
            }
        }, 50);
    }
    
    animateStatsCards() {
        const statCards = document.querySelectorAll('#post-connection .dapp-stat-card, #post-connection > div > div:nth-child(2) > div');
        statCards.forEach((card, index) => {
            setTimeout(() => {
                card.style.transform = 'translateY(-5px)';
                card.style.boxShadow = '0 12px 30px rgba(224, 79, 51, 0.15)';
                setTimeout(() => {
                    card.style.transform = 'translateY(0)';
                    card.style.boxShadow = 'none';
                }, 200);
            }, index * 100);
        });
    }
    
    startLiveUpdates() {
        // Simulate live claimable balance updates
        this.statsUpdateInterval = setInterval(() => {
            if (this.isConnected && this.mockUserData.claimableBalance < 1000) {
                const increment = Math.random() * 2 + 0.5; // 0.5-2.5 tokens per update
                this.mockUserData.claimableBalance += increment;
                this.updateUserStats();
            }
        }, 15000); // Update every 15 seconds
    }
    
    stopLiveUpdates() {
        if (this.statsUpdateInterval) {
            clearInterval(this.statsUpdateInterval);
            this.statsUpdateInterval = null;
        }
    }
}

// Initialize DApp mockup when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const dappSection = document.getElementById('dapp-claim');
    if (dappSection) {
        new EnhancedDAppMockup();
    }
});

// Handle swap iframe error
function handleSwapError() {
    const loader = document.getElementById('swap-loader');
    const fallback = document.getElementById('swap-fallback');
    
    if (loader) loader.style.display = 'none';
    if (fallback) fallback.style.display = 'block';
}

// Jupiter DEX and main initialization  
document.addEventListener('DOMContentLoaded', () => {
    console.log('Initializing ITMT enhanced sections...');
    
    // Initialize Jupiter widgets when plugin is ready
    initializeJupiterWidget();
    
    // Listen for custom notification events
    document.addEventListener('showNotification', (event) => {
        const { message, type } = event.detail;
        showNotification(message, type);
    });
    
    // Add CSS animations for loading states
    if (!document.querySelector('#enhanced-animations')) {
        const styles = document.createElement('style');
        styles.id = 'enhanced-animations';
        styles.textContent = `
            .wallet-spinner {
                animation: spin 1s linear infinite;
                display: inline-block;
            }
            .processing-spinner {
                animation: spin 2s linear infinite;
                display: inline-block;
            }
            @keyframes slideInRight {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
            @keyframes slideOutRight {
                from { transform: translateX(0); opacity: 1; }
                to { transform: translateX(100%); opacity: 0; }
            }
        `;
        document.head.appendChild(styles);
    }
});

// Initialize all components when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    console.log('Initializing ITMT website sections...');
    
    // Initialize Jupiter swap widget
    initializeJupiterWidget();
    
    // Initialize DApp mockup if section exists
    const dappSection = document.getElementById('dapp-claim');
    if (dappSection) {
        new EnhancedDAppMockup();
    }
    
    // Setup smooth scrolling for navigation
    setupSmoothScrolling();
    
    console.log('All sections initialized successfully!');
});

// Smooth scrolling for anchor links
function setupSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Standalone notification function for general use
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-icon">${getNotificationIcon(type)}</span>
            <span class="notification-message">${message}</span>
        </div>
    `;
    
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${getNotificationColor(type)};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 12px;
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
        z-index: 10000;
        animation: slideInRight 0.4s cubic-bezier(0.4, 0, 0.2, 1), slideOutRight 0.4s cubic-bezier(0.4, 0, 0.2, 1) 3.5s forwards;
        backdrop-filter: blur(10px);
        border: 1px solid rgba(255, 255, 255, 0.2);
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        if (notification.parentNode) {
            notification.parentNode.removeChild(notification);
        }
    }, 4000);
}

function getNotificationIcon(type) {
    const icons = {
        success: '✅',
        error: '❌',
        warning: '⚠️',
        info: 'ℹ️'
    };
    return icons[type] || icons.info;
}

function getNotificationColor(type) {
    const colors = {
        success: 'linear-gradient(135deg, #10B981, #059669)',
        error: 'linear-gradient(135deg, #EF4444, #DC2626)',
        warning: 'linear-gradient(135deg, #F59E0B, #D97706)',
        info: 'linear-gradient(135deg, #3B82F6, #2563EB)'
    };
    return colors[type] || colors.info;
}
