document.addEventListener('DOMContentLoaded', () => {
    // Track page load
    gtag('event', 'page_view', {
        'event_category': 'engagement',
        'event_label': 'valentine_card_loaded'
    });

    const scContainer = document.getElementById('js--sc--container');
    
    // Set container dimensions based on viewport
    const containerHeight = window.innerHeight;
    const containerWidth = Math.min(window.innerWidth, containerHeight);
    
    scContainer.style.height = `${containerHeight}px`;
    scContainer.style.width = `${containerWidth}px`;
    
    const sc = new ScratchCard('#js--sc--container', {
        scratchType: SCRATCH_TYPE.LINE,
        containerWidth: containerWidth,
        containerHeight: containerHeight,
        imageForwardSrc: './dalle-valentine.webp',
        imageBackgroundSrc: './video-thumbs.jpg',
        htmlBackground: '<div id="video-wrapper"><video id="bg-video" poster="video-thumbs.jpg" src="./valentine-message.mp4" playsinline webkit-playsinline loop"></video></div>',
        clearZoneRadius: 30,
        nPoints: 30,
        pointSize: 4,
        percentToFinish: 50,
        callback: function() {
            const video = document.getElementById('bg-video');
            video.muted = false;
            video.loop = true;
            video.play().then(() => {
                // Track video start
                gtag('event', 'video_start', {
                    'event_category': 'engagement',
                    'event_label': 'valentine_video_started'
                });
                clickToUnmute(video);
            }).catch(error => {
                video.muted = true;
                video.play().then(() => {
                    // Track muted video start
                    gtag('event', 'video_start_muted', {
                        'event_category': 'engagement',
                        'event_label': 'valentine_video_started_muted'
                    });
                    clickToUnmute(video);
                });
            });
        }
    });

    // Initialize the scratch card
    sc.init().then(() => {
        let hasStartedScratching = false;
        let has50PercentScratched = false;

        sc.canvas.addEventListener('scratch.move', () => {
            let percent = sc.getPercent().toFixed(2);
            
            // Track first scratch
            if (!hasStartedScratching) {
                hasStartedScratching = true;
                gtag('event', 'scratch_start', {
                    'event_category': 'engagement',
                    'event_label': 'started_scratching'
                });
            }

            // Track 50% scratched
            if (!has50PercentScratched && percent > 50) {
                has50PercentScratched = true;
                gtag('event', 'scratch_50_percent', {
                    'event_category': 'engagement',
                    'event_label': 'scratched_50_percent'
                });
            }
        });
    }).catch((error) => {
        console.error(error.message);
    });
}); 

function clickToUnmute(video) {
    document.addEventListener('click', () => {
        video.muted = !video.muted;
        // Track mute/unmute events
        gtag('event', video.muted ? 'video_muted' : 'video_unmuted', {
            'event_category': 'engagement',
            'event_label': video.muted ? 'valentine_video_muted' : 'valentine_video_unmuted'
        });
    }, { once: false });
}
