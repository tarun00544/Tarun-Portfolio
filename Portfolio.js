 
    
        // Initialize AOS
        AOS.init({
            duration: 800,
            once: true,
            offset: 50
        });

        // Dark Mode Toggle
        const toggleSwitch = document.querySelector('#checkbox');
        const currentTheme = localStorage.getItem('theme');

        if (currentTheme) {
            document.body.classList.add(currentTheme);
            if (currentTheme === 'dark-mode') {
                toggleSwitch.checked = true;
            }
        }

        function switchTheme(e) {
            if (e.target.checked) {
                document.body.classList.add('dark-mode');
                localStorage.setItem('theme', 'dark-mode');
            } else {
                document.body.classList.remove('dark-mode');
                localStorage.setItem('theme', 'light-mode');
            }
        }

        toggleSwitch.addEventListener('change', switchTheme, false);

        // Smooth scrolling
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                    const navbarCollapse = document.querySelector('.navbar-collapse');
                    if (navbarCollapse && navbarCollapse.classList.contains('show')) {
                        const bsCollapse = new bootstrap.Collapse(navbarCollapse);
                        bsCollapse.hide();
                    }
                }
            });
        });

        // Contact Form Handling
        document.getElementById('contactForm').addEventListener('submit', function (event) {
            event.preventDefault();
            const form = event.target;

            fetch(form.action, {
                method: form.method,
                body: new FormData(form)
            })
            .then(response => response.json())
            .then(result => {
                if (result.success) {
                    document.getElementById('successMessage').classList.add('show');
                    form.reset();
                    setTimeout(() => {
                        document.getElementById('successMessage').classList.remove('show');
                    }, 5000);
                } else {
                    alert("❌ Error sending message. Please try again.");
                }
            })
            .catch(() => {
                alert("❌ Something went wrong!");
            });
        });

        console.log('🚀 Portfolio loaded successfully!');
        console.log('👨‍💻 Developed by Tarun Kumar');
    