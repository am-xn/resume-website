document.addEventListener('DOMContentLoaded', function() {
    // Preloader
    const preloader = document.querySelector('.preloader');
    window.addEventListener('load', () => {
        preloader.classList.add('fade-out');
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 500);
    });

    // Theme Toggle
    const themeToggle = document.querySelector('.theme-toggle');
    const html = document.documentElement;
    
    // Check for saved theme preference or use preferred color scheme
    const savedTheme = localStorage.getItem('theme') || 
                       (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    html.setAttribute('data-theme', savedTheme);
    
    themeToggle.addEventListener('click', () => {
        const currentTheme = html.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        html.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    });

    // Mobile Navigation
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav ul');
    
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });

    // Sticky Header on Scroll
    const header = document.querySelector('.header');
    window.addEventListener('scroll', () => {
        header.classList.toggle('scrolled', window.scrollY > 50);
    });

    // Active Link Highlighting
    const sections = document.querySelectorAll('section');
    const navItems = document.querySelectorAll('.nav-link');
    
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (pageYOffset >= sectionTop - 300) {
                current = section.getAttribute('id');
            }
        });
        
        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href') === `#${current}`) {
                item.classList.add('active');
            }
        });
    });

    // Back to Top Button
    const backToTopBtn = document.querySelector('.back-to-top');
    window.addEventListener('scroll', () => {
        backToTopBtn.classList.toggle('active', window.scrollY > 500);
    });

    // Smooth Scrolling for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        });
    });

    // Current Year in Footer
    document.getElementById('year').textContent = new Date().getFullYear();

    // Download Resume as PDF
    const downloadBtn = document.getElementById('download-resume');
    downloadBtn.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Create a temporary element for the resume content
        const element = document.createElement('div');
        element.innerHTML = `
            <style>
                body { font-family: Arial, sans-serif; line-height: 1.6; }
                h1 { color: #3498db; }
                h2 { color: #2c3e50; border-bottom: 2px solid #3498db; padding-bottom: 5px; }
                .section { margin-bottom: 30px; }
                .personal-info { margin: 20px 0; }
                .skills-list { margin: 15px 0; }
                .timeline-item { margin-bottom: 20px; }
            </style>
            <h1>Aman Mishra</h1>
            <p>Aspiring AI/ML Engineer | Python Developer</p>
            
            <div class="section">
                <h2>Contact Information</h2>
                <div class="personal-info">
                    <p><strong>Email:</strong> mishraaman8213@gmail.com</p>
                    <p><strong>Location:</strong> Mumbai, India</p>
                    <p><strong>LinkedIn:</strong> linkedin.com/in/aman-mishra-a10a86284/</p>
                </div>
            </div>
            
            <div class="section">
                <h2>About Me</h2>
                <p>Currently pursuing my Master's in Computer Applications (MCA) after completing my BSc in Information Technology from Mumbai University. I'm passionate about artificial intelligence and machine learning, with a strong foundation in Python programming.</p>
            </div>
            
            <div class="section">
                <h2>Skills</h2>
                <div class="skills-list">
                    <p><strong>Technical Skills:</strong> Python, Machine Learning, Deep Learning, SQL, Data Analysis</p>
                    <p><strong>Soft Skills:</strong> Communication, Problem Solving, Teamwork, Time Management</p>
                </div>
            </div>
            
            <div class="section">
                <h2>Education</h2>
                <div class="timeline-item">
                    <p><strong>2024 - Present</strong></p>
                    <p><strong>Master of Computer Applications (MCA)</strong></p>
                    <p>Mumbai University</p>
                </div>
                <div class="timeline-item">
                    <p><strong>2021 - 2024</strong></p>
                    <p><strong>Bachelor of Science in Information Technology (BSc IT)</strong></p>
                    <p>Mumbai University</p>
                </div>
            </div>
            
            <div class="section">
                <h2>Certifications</h2>
                <p>Python for Data Science - Coursera</p>
            </div>
        `;
        
        // Generate PDF
        const opt = {
            margin: 10,
            filename: 'Aman_Mishra_Resume.pdf',
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2 },
            jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
        };
        
        html2pdf().set(opt).from(element).save();
    });

    // Contact Form Submission
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = this.name.value;
            const email = this.email.value;
            const subject = this.subject.value;
            const message = this.message.value;
            
            // Here you would typically send the form data to a server
            // For demonstration, we'll just show an alert
            alert(`Thank you, ${name}! Your message has been sent. I'll get back to you soon at ${email}.`);
            
            // Reset form
            this.reset();
        });
    }

    // Animation on Scroll
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.animate-on-scroll');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (elementPosition < screenPosition) {
                element.classList.add('animated');
            }
        });
    };
    
    // Add animation class to elements when they come into view
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Run once on page load
});