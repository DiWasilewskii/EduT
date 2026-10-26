document.addEventListener('DOMContentLoaded', () => {
    // Елементи секцій
    const heroSection = document.getElementById('hero-section');
    const videoSection = document.getElementById('video-section');
    const videoTitle = document.getElementById('video-title');
    const videoIframe = document.getElementById('video-iframe');
    
    // Кнопки навігації
    const homeBtn = document.getElementById('home-btn');
    const backBtn = document.getElementById('back-btn');

    // Елементи акордеона
    const courseBtns = document.querySelectorAll('.course-title-btn');
    const topicItems = document.querySelectorAll('.topic-item');

    // 1. Логіка розгортання/згортання розділів (Accordion)
    courseBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const topicList = btn.nextElementSibling;
            
            // Перемикаємо клас active для кнопки (повертає стрілочку)
            btn.classList.toggle('active');
            
            // Перемикаємо видимість списку тем
            topicList.classList.toggle('hidden');
        });
    });

    // 2. Відкриття сторінки з відео
    function openTopic(title, videoUrl) {
        videoTitle.textContent = title;
        videoIframe.src = videoUrl;

        heroSection.classList.add('hidden');
        videoSection.classList.remove('hidden');
        
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    // 3. Повернення на головну
    function showHome() {
        videoIframe.src = ''; // Зупиняємо відтворення відео

        videoSection.classList.add('hidden');
        heroSection.classList.remove('hidden');
    }

    // Події для тем
    topicItems.forEach(item => {
        item.addEventListener('click', () => {
            const title = item.getAttribute('data-title');
            const videoUrl = item.getAttribute('data-video-url');
            openTopic(title, videoUrl);
        });
    });

    // Події для кнопок повернення
    homeBtn.addEventListener('click', showHome);
    backBtn.addEventListener('click', showHome);

// Пошук по сайту
    // Пошук по сайту з повідомленням "Нічого не знайдено"
const searchInput = document.getElementById('search-input');
const courseGroups = document.querySelectorAll('.course-group');
const noResultsMsg = document.getElementById('no-results');

if (searchInput) {
    searchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase().trim();
        let totalMatches = 0; // Лічильник знайдених співпадінь

        courseGroups.forEach(group => {
            const courseTitleBtn = group.querySelector('.course-title-btn');
            const courseTitle = courseTitleBtn.querySelector('span').textContent.toLowerCase();
            const topicList = group.querySelector('.topic-list');
            const topics = group.querySelectorAll('.topic-item');

            let hasMatchingTopic = false;

            // Перевіряємо кожну тему у розділі
            topics.forEach(topic => {
                const topicTitle = topic.textContent.toLowerCase();
                const isTopicMatch = topicTitle.includes(query);

                if (isTopicMatch) {
                    topic.style.display = '';
                    hasMatchingTopic = true;
                } else {
                    topic.style.display = 'none';
                }
            });

            // Якщо пошук порожній — повертаємо все у початковий стан
            if (query === '') {
                group.style.display = '';
                topicList.classList.add('hidden');
                courseTitleBtn.classList.remove('active');
                topics.forEach(t => t.style.display = '');
                return;
            }

            const isCourseMatch = courseTitle.includes(query);

            if (isCourseMatch || hasMatchingTopic) {
                group.style.display = '';
                totalMatches++; // Збільшуємо лічильник, якщо розділ або тема підходить

                if (hasMatchingTopic) {
                    topicList.classList.remove('hidden');
                    courseTitleBtn.classList.add('active');
                }

                if (isCourseMatch) {
                    topics.forEach(t => t.style.display = '');
                }
            } else {
                group.style.display = 'none';
            }
        });

        // Керуємо видимістю повідомлення
        if (query !== '' && totalMatches === 0) {
            noResultsMsg.classList.remove('hidden');
        } else {
            noResultsMsg.classList.add('hidden');
        }
    });
}



});


courseBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const currentTopicList = btn.nextElementSibling;

        // Закриваємо всі інші відкриті списки
        courseBtns.forEach(otherBtn => {
            if (otherBtn !== btn) {
                otherBtn.classList.remove('active');
                otherBtn.nextElementSibling.classList.add('hidden');
            }
        });

        // Перемикаємо поточний
        btn.classList.toggle('active');
        currentTopicList.classList.toggle('hidden');
    });
});




