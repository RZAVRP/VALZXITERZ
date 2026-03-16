 (function() {
            // DATA PRODUK 
            const categories = [
                {
                    name: "#DRIPCLIENT NOROOT",
                    items: ["1 DAY 35K", "7 DAY 85K", "15 DAY 150K", "30 DAY 200K"]
                },
                {
                    name: "#DRIPCLIENT ROOT",
                    items: ["1 DAY 35K", "7 DAY 85K", "15 DAY 150K", "30 DAY 200K"]
                },
                {
                    name: "#DRIPCLIENT PC",
                    items: ["1 DAY 40K", "5 DAY 90K", "7 DAY 120K", "15 DAY 180K", "30 DAY 250K"]
                },
                {
                    name: "HG CHEATS ROOT & NONROOT",
                    items: ["1 DAY 30K", "7 DAY 70K", "15 DAY 110K", "30 DAY 170K"]
                },
                {
                    name: "FILE ALL ANDRO",
                    items: ["AIM HEAD 90% 35K", "AIM HEAD 80% 25K", "AIM HEAD 70% 15K", "AIM STABIL 10K", "HOLOGRAM 15K", "AIM HEAD V2"]
                },
                {
                    name: "FILE NO ROOT CC ALL ANDRO",
                    items: ["BADAN HS 70K", "DADA HS 60K", "LEHER HS 50K", "MAGIC BULLET 50K"]
                },
                {
                    name: "FILE MIUI / HYPER OS",
                    items: ["BADAN HS 50K", "LEHER HS 40K"]
                }
            ];

            // render grid
            const grid = document.getElementById('priceGrid');
            function renderCards() {
                grid.innerHTML = '';
                categories.forEach(cat => {
                    const card = document.createElement('div');
                    card.className = 'card';

                    const heading = document.createElement('h2');
                    heading.textContent = cat.name;
                    card.appendChild(heading);

                    const list = document.createElement('ul');
                    list.className = 'price-list';

                    cat.items.forEach(item => {
                        // pisahkan angka terakhir sebagai harga
                        const parts = item.split(' ');
                        const harga = parts.pop(); 
                        const namaItem = parts.join(' ');
                        const li = document.createElement('li');
                        li.setAttribute('data-fullitem', item);
                        const leftSpan = document.createElement('span');
                        leftSpan.textContent = namaItem;
                        const rightSpan = document.createElement('span');
                        rightSpan.textContent = harga;

                        li.appendChild(leftSpan);
                        li.appendChild(rightSpan);
                        list.appendChild(li);
                    });

                    card.appendChild(list);
                    grid.appendChild(card);
                });
            }
            renderCards();

            const modalOverlay = document.getElementById('modalOverlay');
            const closeModalBtn = document.getElementById('closeModalBtn');
            const sendProofBtn = document.getElementById('sendProofBtn');
            const selectedProductDisplay = document.getElementById('selectedProductDisplay');
            const waNumber = '6285196168759';  // tanpa 0

            let currentSelectedItem = '';

            // Function open modal
            function openModal(productFullName) {
                // Tampilkan nama produk di modal
                selectedProductDisplay.textContent = productFullName;
                currentSelectedItem = productFullName; 
                modalOverlay.classList.add('active');
            }

            function closeModal() {
                modalOverlay.classList.remove('active');
            }
            closeModalBtn.addEventListener('click', closeModal);

            modalOverlay.addEventListener('click', function(e) {
                if (e.target === modalOverlay) {
                    closeModal();
                }
            });

            window.addEventListener('keydown', (e) => {
                if (e.key === 'Escape' && modalOverlay.classList.contains('active')) {
                    closeModal();
                }
            });
-
            document.addEventListener('click', function(e) {
                const li = e.target.closest('.price-list li');
                if (li) {
                    e.preventDefault();
                    const fullItem = li.getAttribute('data-fullitem') || 'Produk';
                    openModal(fullItem);
                }
            });

            sendProofBtn.addEventListener('click', function() {
                if (!currentSelectedItem) {
                    currentSelectedItem = 'produk dipilih';
                } 
        
                const message = encodeURIComponent(`Halo, saya sudah transfer untuk produk ${currentSelectedItem}. Berikut bukti pembayaran saya.`);
                window.open(`https://wa.me/${waNumber}?text=${message}`, '_blank');
            });

            const canvas = document.getElementById('particle-canvas');
            const ctx = canvas.getContext('2d');
            let width, height;
            let particles = [];

            function initParticles() {
                const particleCount = 70;
                particles = [];
                for (let i = 0; i < particleCount; i++) {
                    particles.push({
                        x: Math.random() * width,
                        y: Math.random() * height,
                        radius: Math.random() * 2.2 + 0.8,
                        speedX: (Math.random() - 0.5) * 0.15,
                        speedY: (Math.random() - 0.5) * 0.12,
                        glow: Math.random() * 0.7 + 0.3,
                        color: `rgba(${180 + Math.floor(60 * Math.random())}, ${100 + Math.floor(80 * Math.random())}, 220, ${Math.random() * 0.4 + 0.2})`
                    });
                }
            }

            function resizeCanvas() {
                width = window.innerWidth;
                height = window.innerHeight;
                canvas.width = width;
                canvas.height = height;
                initParticles();
            }

            function drawParticles() {
                if (!ctx) return;
                ctx.clearRect(0, 0, width, height);
                
                let gradient = ctx.createLinearGradient(0, 0, width*0.5, height);
                gradient.addColorStop(0, '#020007');
                gradient.addColorStop(0.6, '#160b20');
                gradient.addColorStop(1, '#1f102b');
                ctx.fillStyle = gradient;
                ctx.fillRect(0, 0, width, height);

                particles.forEach(p => {
                    p.x += p.speedX;
                    p.y += p.speedY;

                    if (p.x < 0) p.x = width;
                    if (p.x > width) p.x = 0;
                    if (p.y < 0) p.y = height;
                    if (p.y > height) p.y = 0;

                    ctx.shadowColor = `rgba(200, 130, 255, ${p.glow*0.8})`;
                    ctx.shadowBlur = 14;
                    ctx.beginPath();
                    ctx.arc(p.x, p.y, p.radius * 1.8, 0, 2 * Math.PI);
                    ctx.fillStyle = p.color;
                    ctx.fill();

                    ctx.shadowBlur = 18;
                    ctx.beginPath();
                    ctx.arc(p.x, p.y, p.radius * 0.8, 0, 2 * Math.PI);
                    ctx.fillStyle = `rgba(255, 210, 255, 0.9)`;
                    ctx.fill();
                });
                ctx.shadowBlur = 0;
                ctx.shadowColor = 'transparent';
                requestAnimationFrame(drawParticles);
            }

            window.addEventListener('resize', () => {
                resizeCanvas();
            });

            resizeCanvas();
            drawParticles();
        })();
