document.addEventListener('DOMContentLoaded', () => {
    const structureInfo = {
        'cortex-structure': {
            title: 'Cerebral Cortex',
            text: 'Provides widespread, highly processed information about the external world (what is happening) and top-down cognitive goals.'
        },
        'insula-structure': {
            title: 'Insular Cortex',
            text: 'Provides context about the internal state of the body (interoception) and the salience or emotional relevance of events.'
        },
        'claustrum-structure': {
            title: 'Claustrum',
            text: 'The central hub. It integrates cortical and insular information, filtering for relevance to create a unified, subjective \'internal screen.\''
        },
        'putamen-structure': {
            title: 'Putamen (Basal Ganglia)',
            text: 'Receives the integrated \'internal screen\' from the claustrum. Uses this high-level context to select and guide purposeful, goal-directed actions.'
        },
        'behavior-structure': {
            title: 'Purposeful Behavior',
            text: 'The final output. Actions are flexible and meaningful, guided by the integrated context from the claustrum, rather than being simple reflexes.'
        }
    };

    const allStructures = document.querySelectorAll('.brain-structure');
    const infoBox = document.getElementById('info-box');
    const infoTitle = document.getElementById('info-title');
    const infoText = document.getElementById('info-text');
    const arrows = {
        'cortex-structure': ['path-cortex-claustrum'],
        'insula-structure': ['path-insula-claustrum'],
        'claustrum-structure': ['path-cortex-claustrum', 'path-insula-claustrum', 'path-claustrum-putamen'],
        'putamen-structure': ['path-claustrum-putamen', 'path-putamen-behavior'],
        'behavior-structure': ['path-putamen-behavior']
    };

    allStructures.forEach(structure => {
        structure.addEventListener('mouseenter', () => {
            const info = structureInfo[structure.id];
            infoTitle.textContent = info.title;
            infoText.textContent = info.text;
            infoBox.style.opacity = '1';
            
            document.querySelectorAll('.pathway-arrow').forEach(arrow => arrow.style.opacity = '0.1');
            if (arrows[structure.id]) {
                arrows[structure.id].forEach(arrowId => {
                    const arrowEl = document.getElementById(arrowId);
                    if (arrowEl) arrowEl.style.opacity = '1';
                });
            }
        });

        structure.addEventListener('mouseleave', () => {
            infoBox.style.opacity = '0';
            document.querySelectorAll('.pathway-arrow').forEach(arrow => arrow.style.opacity = '0.20');
        });
        structure.addEventListener('click', () => {
            const info = structureInfo[structure.id];
            infoTitle.textContent = info.title;
            infoText.textContent = info.text;
            infoBox.style.opacity = '1';
            
            document.querySelectorAll('.pathway-arrow').forEach(arrow => arrow.style.opacity = '0.1');
            if (arrows[structure.id]) {
                arrows[structure.id].forEach(arrowId => {
                    const arrowEl = document.getElementById(arrowId);
                    if (arrowEl) arrowEl.style.opacity = '1';
                });
            }
        });
    });

    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section');

    function changeActiveLink() {
        let index = sections.length;
        while(--index && window.scrollY + 50 < sections[index].offsetTop) {}
        
        navLinks.forEach((link) => link.classList.remove('active'));
        const activeLink = document.querySelector(`.nav-link[href="#${sections[index].id}"]`);
        if (activeLink) {
            activeLink.classList.add('active');
        }
    }
    changeActiveLink();
    window.addEventListener('scroll', changeActiveLink);
    
    navLinks.forEach(link => {
        link.addEventListener('click', e => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            document.querySelector(targetId).scrollIntoView({ behavior: 'smooth' });
        });
    });
    
    const ctx = document.getElementById('connectivityChart').getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Claustrum', 'Prefrontal Cortex', 'Hippocampus', 'Thalamus', 'Amygdala'],
            datasets: [{
                label: 'Relative Connectivity Density',
                data: [95, 75, 60, 55, 45],
                backgroundColor: [
                    'rgba(199, 130, 106, 0.6)',
                    'rgba(96, 122, 141, 0.6)',
                    'rgba(96, 122, 141, 0.6)',
                    'rgba(96, 122, 141, 0.6)',
                    'rgba(96, 122, 141, 0.6)'
                ],
                borderColor: [
                    'rgba(199, 130, 106, 1)',
                    'rgba(96, 122, 141, 1)',
                    'rgba(96, 122, 141, 1)',
                    'rgba(96, 122, 141, 1)',
                    'rgba(96, 122, 141, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            indexAxis: 'y',
            scales: {
                x: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Conceptual Score'
                    }
                }
            },
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            let label = context.dataset.label || '';
                            if (label) {
                                label += ': ';
                            }
                            if (context.parsed.x !== null) {
                                label += context.parsed.x;
                            }
                            return label;
                        }
                    }
                }
            }
        }
    });
});