const services = [
            { id: 1, name: 'Home Cleaning', icon: 'https://th.bing.com/th/id/OIP.FNU_IctIPpvwbKAxBmNcHAHaD4?w=323&h=180&c=7&r=0&o=7&cb=ucfimg2&dpr=1.4&pid=1.7&rm=3&ucfimg=1', 
                price: 299, duration: '2-3 hours', description: 'Deep cleaning of entire home', keywords: ['clean', 'cleaning', 'sweep', 'mop', 'dust'] 

            },
            { id: 2, name: 'Cook/Chef Service', icon: '👨‍🍳', 
                price: 199, duration: 'Per meal', description: 'Professional home cooking service', keywords: ['cook', 'chef', 'cooking', 'food', 'meal', 'kitchen'] },
            { id: 3, name: 'Child Care', icon: 'https://th.bing.com/th/id/OIP.77X9DlLdPkCS0VMpyd1eOgHaE8?w=247&h=180&c=7&r=0&o=7&cb=ucfimg2&dpr=1.4&pid=1.7&rm=3&ucfimg=1',
                 price: 349, duration: 'Per day', description: 'Professional nanny service', keywords: ['child', 'baby', 'nanny', 'babysitter', 'kid', 'care']

             },
            { id: 4, name: 'Pet Care', icon: 'https://th.bing.com/th?q=Pet+Services+Logo&w=120&h=120&c=1&rs=1&qlt=70&o=7&cb=1&dpr=1.4&pid=InlineBlock&rm=3&ucfimg=1&mkt=en-IN&cc=IN&setlang=en&adlt=moderate&t=1&mw=247',
                 price: 249, duration: 'Per day', description: 'Pet sitting and walking', keywords: ['pet', 'dog', 'cat', 'animal', 'walk'] },
            { id: 5, name: 'Plumber', icon: 'https://sp.yimg.com/ib/th/id/OIP.CD7y8EAooDmwmsbkB2MTPwAAAA?pid=Api&w=148&h=148&c=7&dpr=2&rs=1',
                 price: 199, duration: '2-3 hours', description: 'All plumbing repairs', keywords: ['plumber', 'pipe', 'leak', 'water', 'tap', 'sink', 'bathroom'] 

            },
            { id: 6, name: 'Electrician', icon: '💡',
                 price: 199, duration: '2-3 hours', description: 'Electrical repairs and installation', keywords: ['electrician', 'electric', 'light', 'wiring', 'switch', 'fan', 'power'] },
            { id: 7, name: 'Furniture', icon: '🪑', price: 299, duration: '2-3 hours', description: 'Furniture assembly and repair', keywords: ['furniture', 'carpenter', 'chair', 'table', 'bed', 'assembly'] },
            { 
                id: 8, 
                name: 'AC Repair', 
                icon: 'https://up.yimg.com/ib/th/id/OIP.DwqhJ8wCqghTMVGVHmE3FgHaE8?pid=Api&rs=1&c=1&qlt=95&w=161&h=107', 
                price: 299, 
                duration: '2-3 hours', 
                description: 'AC service and repair', 
                keywords: ['ac', 'air conditioner', 'cooling', 'repair', 'service', 'maintenance'] 
            },
            { 
                id: 9, 
                name: 'Painter', 
                icon: 'https://up.yimg.com/ib/th/id/OIP.hZ9oZ7WH-uE9BKQfWJ62QQAAAA?pid=Api&rs=1&c=1&qlt=95&w=211&h=117', 
                price: 399, 
                duration: 'Per room', 
                description: 'Professional painting service', 
                keywords: ['paint', 'painter', 'wall', 'colour', 'color', 'painting'] 
            },
            { id: 10, name: 'Laundry Service', icon: '👕',
                 price: 149, duration: 'Per load', description: 'Wash, dry and iron', keywords: ['laundry', 'wash', 'iron', 'clothes', 'dry'] 

            },
            { id: 11, name: 'Gardening', icon: '🌱', price: 199, duration: '2-3 hours', description: 'Garden maintenance', keywords: ['garden', 'plant', 'lawn', 'grass', 'tree', 'flowers'] },
            { id: 12, name: 'Pest Control', icon: '🦟', price: 499, duration: 'Full house', description: 'Complete pest control treatment', keywords: ['pest', 'insect', 'cockroach', 'mosquito', 'rat', 'bug', 'termite'] }
        ];

        let cart = [];
        let currentService = null;
        
        // Hide specific services from front page (but keep them searchable)
        const hiddenServiceIds = [7, 11, 12]; // Furniture Assembly, Gardening, Pest Control
        
        // Initialize with only visible services
        let filteredServices = services.filter(s => !hiddenServiceIds.includes(s.id));

        function searchServices() {
            const searchTerm = document.getElementById('searchBox').value.toLowerCase().trim();
            const searchInfo = document.getElementById('searchInfo');
            
            if (searchTerm === '') {
                // Show only non-hidden services on front page
                filteredServices = services.filter(s => !hiddenServiceIds.includes(s.id));
                searchInfo.textContent = '';
            } else {
                // When searching, show all services including hidden ones
                filteredServices = services.filter(service => {
                    return service.name.toLowerCase().includes(searchTerm) ||
                           service.description.toLowerCase().includes(searchTerm) ||
                           service.keywords.some(keyword => keyword.includes(searchTerm));
                });
                
                if (filteredServices.length === 0) {
                    searchInfo.textContent = `No services found for "${searchTerm}". Try searching for: cleaning, plumber, cook, electrician, etc.`;
                } else {
                    searchInfo.textContent = `Found ${filteredServices.length} service${filteredServices.length > 1 ? 's' : ''} matching "${searchTerm}"`;
                }
            }
            
            renderServices();
        }

        function renderServices() {
            const grid = document.getElementById('servicesGrid');
            
            if (filteredServices.length === 0) {
                grid.innerHTML = '<div style="grid-column: 1/-1; text-align: center; padding: 40px; color: #666;">No services found. Please try a different search term.</div>';
                return;
            }
            
            grid.innerHTML = filteredServices.map(service => {
                const iconDisplay = service.icon.startsWith('http') 
                    ? `<img src="${service.icon}" alt="${service.name}">` 
                    : service.icon;
                
                return `
                    <div class="service-card">
                        <div class="service-icon">${iconDisplay}</div>
                        <div class="service-name">${service.name}</div>
                        <div class="service-price">₹${service.price}</div>
                        <div class="service-duration">${service.duration}</div>
                        <button class="book-btn" onclick="openBookingModal(${service.id})">Book Now</button>
                    </div>
                `;
            }).join('');
        }

        function openBookingModal(serviceId) {
            currentService = services.find(s => s.id === serviceId);
            document.getElementById('modalServiceName').value = currentService.name;
            
            const today = new Date().toISOString().split('T')[0];
            document.getElementById('serviceDate').min = today;
            
            // Show service-specific time slot recommendations
            updateTimeSlots();
            
            document.getElementById('bookingModal').style.display = 'flex';
        }

        function closeBookingModal() {
            document.getElementById('bookingModal').style.display = 'none';
            document.getElementById('bookingForm').reset();
            document.getElementById('bookingStep1').style.display = 'block';
            document.getElementById('bookingStep2').style.display = 'none';
        }

        function proceedToPayment() {
            const date = document.getElementById('serviceDate').value;
            const slot = document.getElementById('timeSlot').value;
            
            if (!date || !slot) {
                alert('Please select both date and time slot');
                return;
            }
            
            document.getElementById('bookingStep1').style.display = 'none';
            document.getElementById('bookingStep2').style.display = 'block';
        }

        function backToSlotSelection() {
            document.getElementById('bookingStep1').style.display = 'block';
            document.getElementById('bookingStep2').style.display = 'none';
        }

        function confirmPayment() {
            const paymentMethod = document.querySelector('input[name="paymentMethod"]:checked').value;
            
            const booking = {
                id: Date.now(),
                service: currentService,
                date: document.getElementById('serviceDate').value,
                timeSlot: document.getElementById('timeSlot').value,
                instructions: document.getElementById('instructions').value,
                paymentMethod: paymentMethod
            };
            
            cart.push(booking);
            updateCart();
            showConfirmationPopup(booking);
            closeBookingModal();
        }

        function showConfirmationPopup(booking) {
            const confirmationDetails = document.getElementById('confirmationDetails');
            confirmationDetails.innerHTML = `
                <div style="margin-bottom: 12px; color: #1a1a1a;"><strong style="color: #FF6B35;">Service:</strong> ${booking.service.name}</div>
                <div style="margin-bottom: 12px; color: #1a1a1a;"><strong style="color: #FF6B35;">Date:</strong> ${booking.date}</div>
                <div style="margin-bottom: 12px; color: #1a1a1a;"><strong style="color: #FF6B35;">Time:</strong> ${booking.timeSlot}</div>
                <div style="margin-bottom: 12px; color: #1a1a1a;"><strong style="color: #FF6B35;">Price:</strong> ₹${booking.service.price}</div>
                <div style="color: #1a1a1a;"><strong style="color: #FF6B35;">Payment:</strong> ${booking.paymentMethod.toUpperCase()}</div>
            `;
            document.getElementById('confirmationModal').style.display = 'flex';
        }

        function closeConfirmationModal() {
            document.getElementById('confirmationModal').style.display = 'none';
        }

        function handlePaymentChange() {
            const selectedPayment = document.querySelector('input[name="paymentMethod"]:checked').value;
            const qrContainer = document.getElementById('qrCodeContainer');
            const cardMessage = document.getElementById('cardMessage');
            
            if (selectedPayment === 'upi') {
                generateUPIQRCode();
                qrContainer.style.display = 'block';
                if (cardMessage) cardMessage.style.display = 'none';
            } else if (selectedPayment === 'card') {
                qrContainer.style.display = 'none';
                if (cardMessage) cardMessage.style.display = 'block';
            } else {
                qrContainer.style.display = 'none';
                if (cardMessage) cardMessage.style.display = 'none';
            }
        }

        function generateUPIQRCode() {
            const amount = currentService.price;
            const upiId = '####64796@oksbi';
            const merchantName = 'HomeServe India';
            const transactionRef = 'TXN' + Date.now();
            
            // UPI URL with amount auto-filled
            const upiUrl = `upi://pay?pa=${upiId}&pn=${encodeURIComponent(merchantName)}&am=${amount}&tr=${transactionRef}&tn=Service%20Payment`;
            
            // Clear previous QR code
            const qrCodeDiv = document.getElementById('qrCode');
            qrCodeDiv.innerHTML = '';
            
            // Generate QR code dynamically
            new QRCode(qrCodeDiv, {
                text: upiUrl,
                width: 200,
                height: 200,
                colorDark: '#000000',
                colorLight: '#ffffff',
                correctLevel: QRCode.CorrectLevel.H
            });
            
            // Update amount display
            document.getElementById('qrAmount').textContent = amount;
        }

        function openCheckoutModal() {
            if (cart.length === 0) return;
            document.getElementById('checkoutTotal').textContent = '₹' + calculateTotal();
            document.getElementById('checkoutModal').style.display = 'flex';
        }

        function closeCheckoutModal() {
            document.getElementById('checkoutModal').style.display = 'none';
            document.getElementById('checkoutForm').reset();
            document.getElementById('successMessage').style.display = 'none';
        }

        document.getElementById('bookingForm').addEventListener('submit', function(e) {
            e.preventDefault();
        });

        document.getElementById('checkoutForm').addEventListener('submit', function(e) {
            e.preventDefault();
            
            const order = {
                orderId: 'ORD' + Date.now(),
                customer: {
                    name: document.getElementById('customerName').value,
                    phone: document.getElementById('customerPhone').value,
                    email: document.getElementById('customerEmail').value,
                    address: document.getElementById('customerAddress').value
                },
                paymentMethod: document.getElementById('paymentMethod').value,
                services: cart,
                total: calculateTotal(),
                orderDate: new Date().toLocaleString('en-IN')
            };
            
            console.log('Order Placed:', order);
            
            const successMsg = document.getElementById('successMessage');
            successMsg.innerHTML = `
                <strong>🎉 Booking Confirmed!</strong><br>
                Order ID: ${order.orderId}<br>
                Total: ₹${order.total}<br>
                Our service provider will contact you soon at ${order.customer.phone}
            `;
            successMsg.style.display = 'block';
            
            cart = [];
            updateCart();
            
            document.getElementById('checkoutForm').reset();
            
            setTimeout(() => {
                closeCheckoutModal();
            }, 5000);
        });

        function removeFromCart(bookingId) {
            cart = cart.filter(item => item.id !== bookingId);
            updateCart();
        }

        function calculateTotal() {
            return cart.reduce((sum, item) => sum + item.service.price, 0);
        }

        function updateCart() {
            const cartItemsDiv = document.getElementById('cartItems');
            const cartEmpty = document.getElementById('cartEmpty');
            const cartTotal = document.getElementById('cartTotal');
            const cartCount = document.getElementById('cartCount');
            
            cartCount.textContent = cart.length + ' items';
            
            if (cart.length === 0) {
                cartItemsDiv.innerHTML = '';
                cartEmpty.style.display = 'block';
                cartTotal.style.display = 'none';
            } else {
                cartEmpty.style.display = 'none';
                cartTotal.style.display = 'block';
                
                cartItemsDiv.innerHTML = cart.map(item => `
                    <div class="cart-item">
                        <div class="cart-item-info">
                            <div class="cart-item-name">${item.service.icon} ${item.service.name}</div>
                            <div class="cart-item-details">
                                ${new Date(item.date).toLocaleDateString('en-IN')} • ${item.timeSlot}
                            </div>
                        </div>
                        <div class="cart-item-price">₹${item.service.price}</div>
                        <button class="remove-btn" onclick="removeFromCart(${item.id})">Remove</button>
                    </div>
                `).join('');
                
                document.getElementById('totalAmount').textContent = '₹' + calculateTotal();
            }
        }

        renderServices();
        updateCart();

        // Go to home function
        function goToHome() {
            // Close all modals
            closeBookingModal();
            closeCheckoutModal();
            closeProfileModal();
            closeContactModal();
            closeFeedbackModal();
            closeAboutModal();
            
            // Clear search
            document.getElementById('searchBox').value = '';
            document.getElementById('searchInfo').textContent = '';
            filteredServices = services.filter(s => !hiddenServiceIds.includes(s.id));
            renderServices();
            
            // Scroll to top smoothly
            window.scrollTo({ top: 0, behavior: 'smooth' });
            
            // Close mobile menu if open
            document.getElementById('navMenu').classList.remove('active');
        }

        // Menu functions
        function toggleMenu() {
            const menu = document.getElementById('navMenu');
            menu.classList.toggle('active');
        }

        function openProfileModal() {
            document.getElementById('profileModal').style.display = 'flex';
            document.getElementById('navMenu').classList.remove('active');
        }

        function closeProfileModal() {
            document.getElementById('profileModal').style.display = 'none';
        }

        function openContactModal() {
            document.getElementById('contactModal').style.display = 'flex';
            document.getElementById('navMenu').classList.remove('active');
        }

        function closeContactModal() {
            document.getElementById('contactModal').style.display = 'none';
        }

        function openFeedbackModal() {
            document.getElementById('feedbackModal').style.display = 'flex';
            document.getElementById('navMenu').classList.remove('active');
        }

        function closeFeedbackModal() {
            document.getElementById('feedbackModal').style.display = 'none';
        }

        function openAboutModal() {
            document.getElementById('aboutModal').style.display = 'flex';
            document.getElementById('navMenu').classList.remove('active');
        }

        function closeAboutModal() {
            document.getElementById('aboutModal').style.display = 'none';
        }

        // Profile form submission
        document.getElementById('profileForm').addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Profile saved successfully! ✅');
            closeProfileModal();
        });

        // Feedback form submission
        document.getElementById('feedbackForm').addEventListener('submit', function(e) {
            e.preventDefault();
            const rating = document.getElementById('feedbackRating').value;
            alert(`Thank you for your ${rating}-star feedback! 🙏 We appreciate your input.`);
            document.getElementById('feedbackForm').reset();
            closeFeedbackModal();
        });

        window.onclick = function(event) {
            const bookingModal = document.getElementById('bookingModal');
            const checkoutModal = document.getElementById('checkoutModal');
            const profileModal = document.getElementById('profileModal');
            const contactModal = document.getElementById('contactModal');
            const feedbackModal = document.getElementById('feedbackModal');
            const aboutModal = document.getElementById('aboutModal');
            
            if (event.target === bookingModal) {
                closeBookingModal();
            }
            if (event.target === checkoutModal) {
                closeCheckoutModal();
            }
            if (event.target === profileModal) {
                closeProfileModal();
            }
            if (event.target === contactModal) {
                closeContactModal();
            }
            if (event.target === feedbackModal) {
                closeFeedbackModal();
            }
            if (event.target === aboutModal) {
                closeAboutModal();
            }
        }

        // Time slot recommendations based on service type
        const serviceTimeSlots = {
            'Child Care': {
                message: '👶 Child Care: Recommended slots for pickup/drop - Morning (6-9 AM) or Evening (3-6 PM). Full day care available 6 AM - 6 PM.',
                availableSlots: ['6:00 AM - 9:00 AM', '9:00 AM - 12:00 PM', '12:00 PM - 3:00 PM', '3:00 PM - 6:00 PM']
            },
            'Home Cleaning': {
                message: '🧹 Home Cleaning: Best during daytime hours (6 AM - 9 PM). Evening slots recommended for minimum disruption.',
                availableSlots: ['6:00 AM - 9:00 AM', '9:00 AM - 12:00 PM', '12:00 PM - 3:00 PM', '3:00 PM - 6:00 PM', '6:00 PM - 9:00 PM']
            },
            'Cook/Chef Service': {
                message: '👨‍🍳 Cooking Service: Available for breakfast (6-9 AM), lunch (11 AM - 2 PM), and dinner (5-8 PM) preparations.',
                availableSlots: ['6:00 AM - 9:00 AM', '9:00 AM - 12:00 PM', '12:00 PM - 3:00 PM', '3:00 PM - 6:00 PM', '6:00 PM - 9:00 PM']
            },
            'Pet Care': {
                message: '🐕 Pet Care: Flexible hours. Morning (6-9 AM) for walks, afternoon for sitting, evening for feeding.',
                availableSlots: ['6:00 AM - 9:00 AM', '9:00 AM - 12:00 PM', '12:00 PM - 3:00 PM', '3:00 PM - 6:00 PM', '6:00 PM - 9:00 PM']
            },
            'Laundry Service': {
                message: '👕 Laundry: Pickup anytime, delivery within 24-48 hours. Morning slot recommended for faster service.',
                availableSlots: ['6:00 AM - 9:00 AM', '9:00 AM - 12:00 PM', '12:00 PM - 3:00 PM', '3:00 PM - 6:00 PM']
            }
        };

        function updateTimeSlots() {
            const serviceNameInput = document.getElementById('modalServiceName');
            const serviceName = serviceNameInput.value;
            const serviceSlotInfo = document.getElementById('serviceSlotInfo');
            const serviceSlotMessage = document.getElementById('serviceSlotMessage');
            
            if (serviceTimeSlots[serviceName]) {
                serviceSlotInfo.style.display = 'block';
                serviceSlotMessage.textContent = serviceTimeSlots[serviceName].message;
            } else {
                serviceSlotInfo.style.display = 'none';
            }
        }
