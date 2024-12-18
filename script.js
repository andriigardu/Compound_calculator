function calculate() {
    const principal = parseFloat(document.getElementById('principal').value);
    const annualAddition = parseFloat(document.getElementById('annualAddition').value);
    const years = parseFloat(document.getElementById('years').value);
    const rate = parseFloat(document.getElementById('rate').value) / 100;
    const compound = parseFloat(document.getElementById('compound').value);

    let amount = principal;
    for (let i = 0; i < years; i++) {
        amount = amount * (1 + rate/compound)**compound + annualAddition;
    }
    const interest = amount - principal - (annualAddition * years);
    const roi = calculateROI(principal, annualAddition, years, amount);

    document.getElementById('futureValue').innerHTML = `<span class="${amount >= 0 ? 'positive' : 'negative'}">$${formatNumber(amount.toFixed(2))}</span>`;
    document.getElementById('totalInterest').innerHTML = `<span class="${interest >= 0 ? 'positive' : 'negative'}">$${formatNumber(interest.toFixed(2))}</span>`;
    document.getElementById('roi').innerHTML = `<span class="${roi >= 0 ? 'positive' : 'negative'}">${roi.toFixed(2)}%</span>`;
}

function formatNumber(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function calculateROI(principal, annualAddition, years, finalAmount) {
    const totalInvestment = principal + (annualAddition * years);
    const gain = finalAmount - totalInvestment;
    const roi = (gain / totalInvestment) * 100;
    return roi;
}
function createParticle(x, y) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    
    // Make particles three times smaller overall
    const baseSize = 2.33; // 4px / 3 = 1.33px
    const randomScale = Math.random() * 0.5 + 0.5; // Random scale between 0.5 and 1
    const size = baseSize * randomScale;
    
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    particle.style.left = `${x}px`;
    particle.style.top = `${y}px`;

    const angle = Math.random() * Math.PI * 2;
    const speed = Math.random() * 75 + 25; // Random speed between 25 and 100
    const vx = Math.cos(angle) * speed;
    const vy = Math.sin(angle) * speed;

    document.getElementById('particleContainer').appendChild(particle);

    let opacity = 1;
    const animate = () => {
        if (opacity <= 0) {
            particle.remove();
            return;
        }

        opacity -= 0.02;
        particle.style.opacity = opacity;
        particle.style.left = (parseFloat(particle.style.left) + vx * 0.016) + 'px';
        particle.style.top = (parseFloat(particle.style.top) + vy * 0.016) + 'px';

        requestAnimationFrame(animate);
    };

    animate();
}
let particleInterval;

function emitParticles(button) {
    const rect = button.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    for (let i = 0; i < 3; i++) {
        const angle = Math.random() * Math.PI * 2;
        const distance = Math.random() * 20;
        const x = centerX + Math.cos(angle) * distance;
        const y = centerY + Math.sin(angle) * distance;

        createParticle(x, y);
    }
}

document.querySelector('button').addEventListener('mouseenter', function(e) {
    const button = e.currentTarget;
    particleInterval = setInterval(() => emitParticles(button), 50); // Emit particles every 50ms
});

document.querySelector('button').addEventListener('mouseleave', function() {
   clearInterval(particleInterval);
});

document.querySelector('button').addEventListener('mousemove', function(e) {
    const button = e.currentTarget;
    const rect = button.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = (y - centerY) / 10;
    const rotateY = (centerX - x) / 10;

    const shadowX = (x - centerX) / 15;
    const shadowY = (y - centerY) / 15;

    button.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
    button.style.boxShadow = `${shadowX}px ${shadowY}px 20px rgba(153, 102, 255, 0.5)`;
});

document.querySelector('button').addEventListener('mouseleave', function(e) {
    const button = e.currentTarget;
    button.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
    button.style.boxShadow = '0 5px 15px rgba(153, 102, 255, 0.3)';
});

document.querySelector('button').addEventListener('click', function(e) {
    const button = e.currentTarget;
    button.style.animation = 'none';
    button.offsetHeight; // Trigger reflow
    button.style.animation = null;
});

document.querySelector('button').addEventListener('mousemove', function(e) {
  const button = e.currentTarget;
  const rect = button.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  const centerX = rect.width / 2;
  const centerY = rect.height / 2;

  const rotateX = (y - centerY) / 10;
  const rotateY = (centerX - x) / 10;

  const shadowX = (x - centerX) / 15;
  const shadowY = (y - centerY) / 15;

  const highlightX = (x / rect.width) * 100;
  const highlightY = (y / rect.height) * 100;

  button.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-2px)`;
  button.style.boxShadow = `${shadowX}px ${shadowY}px 20px rgba(153, 102, 255, 0.5)`;
  button.style.background = `radial-gradient(circle at ${highlightX}% ${highlightY}%, #b088ff, #9966ff)`;

  emitParticles(e);
});

document.querySelector('button').addEventListener('mouseleave', function(e) {
  const button = e.currentTarget;
  button.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
  button.style.boxShadow = '0 5px 15px rgba(153, 102, 255, 0.3)';
});
document.querySelector('button').addEventListener('click', function(e) {
    const button = e.currentTarget;
    button.style.animation = 'none';
    button.offsetHeight; // Trigger reflow
    button.style.animation = null;
});
