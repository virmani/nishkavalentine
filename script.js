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
        htmlBackground: '<video id="bg-video" src="./valentine-message.mp4" playsinline loop="" style="width: 100%; height: 100%; object-fit: cover;"></video>',
        clearZoneRadius: 30,
        nPoints: 30,
        pointSize: 4,
        percentToFinish: 50,
        callback: function() {
            // Replace canvas with video when scratching is complete
            const video = document.getElementById('bg-video');
            video.play();
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