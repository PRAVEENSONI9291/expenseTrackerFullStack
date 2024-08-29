console.log('home page');



document.querySelectorAll('.nav-link').forEach((link, index) => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        document.querySelector('.nav-link.active').classList.remove('active');
        link.classList.add('active');
        moveSlider(index);
    });
});

function moveSlider(index) {
    const slider = document.getElementById('slider');
    const percentage = index * 25;
    slider.style.left = percentage + '%';
}