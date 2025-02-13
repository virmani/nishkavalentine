document.addEventListener('DOMContentLoaded', () => {
    const scContainer = document.getElementById('js--sc--container');
    
    // Set container dimensions based on viewport
    const containerHeight = window.innerHeight;
    // Restrict width on wide screens
    const containerWidth = Math.min(window.innerWidth, containerHeight);
    
    scContainer.style.height = `${containerHeight}px`;
    scContainer.style.width = `${containerWidth}px`;
    
    const sc = new ScratchCard('#js--sc--container', {
        scratchType: SCRATCH_TYPE.LINE,
        containerWidth: containerWidth,
        containerHeight: containerHeight,
        imageForwardSrc: './heart.png',
        imageBackgroundSrc: './video-thumbs.jpg',
        htmlBackground: '<div id="video-wrapper"><video id="bg-video" poster="video-thumbs.jpg" src="./valentine-message.mp4" playsinline webkit-playsinline loop"></video></div>',
        clearZoneRadius: 30,
        nPoints: 30,
        pointSize: 4,
        percentToFinish: 50,
        callback: function() {
            const video = document.getElementById('bg-video');
            video.muted = false;  // Unmute before playing
            video.loop = true;
            video.play().catch(error => {
                // If autoplay fails, try with mute
                video.muted = true;
                video.play().then(() => {
                    // Once playing, unmute on first user interaction
                    document.addEventListener('click', () => {
                        video.muted = !video.muted;
                    }, { once: false });
                });
            });
        }
    });

    // Initialize the scratch card
    sc.init().then(() => {
        sc.canvas.addEventListener('scratch.move', () => {
            let percent = sc.getPercent().toFixed(2);
        });
    }).catch((error) => {
        console.error(error.message);
    });
}); 