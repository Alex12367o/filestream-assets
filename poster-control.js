// 🎬 Remote Control Script
// Change poster and watch URL from here

const posterUrl = "https://cdn.jsdelivr.net/gh/Alex12367o/filestream-assets@main/poster.jpg";
const watchUrl = "https://example.com/watch-anime";

// Elements
const posterImg = document.getElementById("poster");
const watchBtn = document.getElementById("watch-btn");

// Apply values
posterImg.src = posterUrl;
watchBtn.href = watchUrl;
