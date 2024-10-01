var t = gsap.timeline();

t.from('.navbar', {
    opacity : 0,
    duration : 1
})

t.from('.title', {
    y: -500,
    opacity : 0,
    duration:1
})

t.from(".body", {
    zoom : 0,
    opacity: 0,
    duration : 1
})

t.from('.see', {
    opacity : 0,
    duration: 0.5
})

gsap.to('.bitfly', {
    x:-300,
    y:-300,
    opacity:0,
    scrollTrigger:{
        trigger:".bitfly",
        scroller:"body",
        scrub :3,
        start:"top 10%",
        end : "top 100%"
    }
})

gsap.to('.ethfly', {
    x:300,
    y:-300,
    opacity:0,
    scrollTrigger:{
        trigger:".ethfly",
        scroller:"body",
        scrub :3,
        start:"top 50%",
        end : "top 100%"
    }
})





var tl = gsap.timeline({
    scrollTrigger: {
      trigger: "#main",
      // markers: true, // Use this for debugging scroll positions
      start: "50% 50%", // Starts when #main hits the center of the viewport
      end: "150% 50%", // Ends when the element reaches 150% scroll
      scrub: 1, // Smoothens the scroll-linked animation
      pin: true, // Pin the element for the duration of the animation
      anticipatePin: 1 // Reduces any jumpiness with pinning
    }
  });
  
  tl
    .to("#center", {
      height: "100vh",
      ease: "power1.out" // Smooth ease for better visual fluidity
    }, 'a') // Sync all animations at the same time (label: 'a')
    .to("#top", {
      top: "-50%",
      ease: "power1.out"
    }, 'a')
    .to("#bottom", {
      bottom: "-50%",
      ease: "power1.out"
    }, 'a')
    .to("#top-h1", {
      bottom: "-70%",
      ease: "power1.out"
    }, 'a')
    .to("#bottom-h1", {
      top: "70%",
      ease: "power1.out"
    }, 'a')
    .to("#center-h1", {
      top: "30%",
      ease: "power1.out"
    }, 'a')
    .to(".content", {
      delay: -0.2, // Delay to overlap the animation a bit
      marginTop: "0%",
      ease: "power1.out" // Consistent easing for smoother transitions
    });


