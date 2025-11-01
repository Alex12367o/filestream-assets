async function getDets() {
  const bloggerJsonUrl = "https://itachifilestreem.blogspot.com/feeds/posts/default/-/movie?alt=json";

  try {
    const res = await fetch(bloggerJsonUrl);
    if (!res.ok) throw new Error(`HTTP Error: ${res.status}`);

    const rawData = await res.json();

    // যদি কোনো পোস্ট না থাকে
    if (!rawData.feed?.entry || rawData.feed.entry.length === 0) {
      throw new Error("No movie entries found in Blogger feed.");
    }

    // Blogger post content নেয়া
    let content = rawData.feed.entry[0]?.content?.$t || "";

    // JSON এক্সট্রাক্ট করা (HTML বা ট্যাগ বাদ দিয়ে)
    const clean = content
      .replace(/<\/?[^>]+(>|$)/g, "") // remove HTML tags
      .replace(/&[a-z]+;/gi, "") // remove HTML entities
      .replace(/\n|\r/g, "") // remove line breaks
      .trim();

    // ভিতরে থাকা JSON detect করা
    const jsonStart = clean.indexOf("{");
    const jsonEnd = clean.lastIndexOf("}");
    if (jsonStart === -1 || jsonEnd === -1) {
      throw new Error("No valid JSON found inside Blogger content.");
    }

    const jsonStr = clean.slice(jsonStart, jsonEnd + 1);
    const data = JSON.parse(jsonStr);

    // DOM elements
    const movieCont = document.querySelector(".movieSug");
    const img = document.querySelector(".movieimg img");
    const movieDets = document.querySelector(".movieDets");
    const movieDetsMini = document.querySelector(".movieDets-mini");

    // Fallback values
    const title = data.title || "Unknown Title";
    const release = data.release_date || "N/A";
    const rating = data.rating || "Not Rated";
    const poster = data.poster || "https://via.placeholder.com/300x450?text=No+Poster";

    // Update UI
    movieDets.innerHTML = `
      <h3>Featured Movie</h3>
      <h4><span>Title:</span> ${title}</h4>
      <h4><span>Release Date:</span> ${release}</h4>
      <h4><span>Rating:</span> ${rating}</h4>
    `;

    movieDetsMini.innerHTML = `
      <h3><span>Title:</span> ${title}</h3>
      <h3><span>Release Date:</span> ${release}</h3>
      <h3><span>Rating:</span> ${rating}</h3>
    `;

    img.src = poster;
    movieCont.style.backgroundImage = `url(${poster})`;

    console.log("Movie details loaded successfully from Blogger!");
  } catch (error) {
    console.error("Error fetching Blogger JSON:", error);
    alert("Failed to load movie details. Blogger feed might be malformed or unavailable.");
  }
}

async function watchNow() {
  const bloggerJsonUrl = "https://itachifilestreem.blogspot.com/feeds/posts/default/-/movie?alt=json";

  try {
    const res = await fetch(bloggerJsonUrl);
    if (!res.ok) throw new Error(`HTTP Error: ${res.status}`);

    const rawData = await res.json();
    if (!rawData.feed?.entry || rawData.feed.entry.length === 0) {
      throw new Error("No movie entries found in Blogger feed.");
    }

    let content = rawData.feed.entry[0]?.content?.$t || "";
    const clean = content
      .replace(/<\/?[^>]+(>|$)/g, "")
      .replace(/&[a-z]+;/gi, "")
      .replace(/\n|\r/g, "")
      .trim();

    const jsonStart = clean.indexOf("{");
    const jsonEnd = clean.lastIndexOf("}");
    if (jsonStart === -1 || jsonEnd === -1) {
      throw new Error("No valid JSON found inside Blogger content.");
    }

    const jsonStr = clean.slice(jsonStart, jsonEnd + 1);
    const data = JSON.parse(jsonStr);

    if (!data.watch_link) throw new Error("Watch link missing in Blogger JSON.");

    // Redirect
    console.log("Redirecting to watch link:", data.watch_link);
    window.location.href = data.watch_link;

  } catch (error) {
    console.error("Error redirecting to watch link:", error);
    alert("Couldn't open movie link. Please check Blogger JSON content.");
  }
}

let homeBtn = document.querySelector(".home-btn")
let abtBtn = document.querySelector(".about-btn")
let dldBtn_outer = document.querySelector(".downloadBtn")
let file_name = document.querySelector(".file-name")
let about_nav = document.querySelector(".about-nav")
let contact_btn = document.querySelector('.contact-btn')
let links = document.querySelectorAll('.links a')
let chnl_link = document.querySelectorAll('.chnl-link a')
let abt_chnl = document.querySelector('.abt-chnl')
let contact = document.querySelectorAll('.contact a')
let footer = document.querySelector('footer')

let timer = 0

if (document.getElementById("heading").classList.contains("title")) {
    document.querySelector(".title").textContent = 'FILE STREAM'
}

// adding under in home btn at first 
homeBtn.classList.add('active');

// when clicking about
abtBtn.addEventListener("click", () => {
    dldBtn_outer.style.display = "none";
    file_name.style.display = "none";
    footer.style.display = "none";
    about_nav.style.display = "block"
    about_nav.style.display = "block"
    about_nav.style.animation = "strtLoad 1s ease 0s forwards"

})
// when clicking home
homeBtn.addEventListener("click", () => {
    dldBtn_outer.style.display = "flex";
    file_name.style.display = "block";
    footer.style.display = "block";
    window.location.href = "#main";
    about_nav.style.animation = "strtLoad 1s ease 0s forwards"
    about_nav.style.display = "none"

})

abt_chnl.addEventListener("click", () => {
    timer = 1
    chnl_link.forEach((i) => {
        i.style.animation = `strtLoad 1s ease ${timer}s forwards, linksBtnAn 2s ease ${timer}s infinite `
        timer += 0.3;
    });
    timer = 0
});
function bot_btn_clicked() {
    var about_btn = document.querySelector(".about-btn")
    timer = 1;
    bot_links.forEach((i) => {
        i.style.animation = `linksBtnAn 2s ease ${timer}s infinite ,strtLoad 1s ease ${timer}s forwards`;
        timer += 0.3;
    });
    timer = 0;
    dldBtn_outer.style.display = "none";
    file_name.style.display = "none";
    footer.style.display = "none";
    about_nav.style.display = "block"
    about_nav.style.display = "block"
    about_nav.style.animation = "strtLoad 1s ease 0s forwards"
    var links = document.querySelectorAll('.nryt a');
    links.forEach(function (link) {
        link.classList.remove('active');
    });
    about_btn.classList.add('active');
    var links = document.querySelectorAll('.about-nav a');
    links.forEach(function (link) {
        link.classList.remove('active');
    });
    let wlcm = document.querySelector(".wlcm")
    wlcm.classList.add('active');
    var links = document.querySelectorAll('.about-nav a');
    links.forEach(function (link) {
        link.classList.remove('active');
    });
    bot_btn.classList.add('active');
};
footer_btn_clicked = () => {
    timer = 1;
    contact.forEach((i) => {
        i.style.animation = `linksBtnAn 2s ease ${timer}s infinite ,strtLoad 1s ease ${timer}s forwards`;
        timer += 0.3;
    });

    timer = 0;
    var about_btn = document.querySelector(".about-btn")
    timer = 1;
    bot_links.forEach((i) => {
        i.style.animation = `linksBtnAn 2s ease ${timer}s infinite ,strtLoad 1s ease ${timer}s forwards`;
        timer += 0.3;
    });
    timer = 0;
    dldBtn_outer.style.display = "none";
    file_name.style.display = "none";
    footer.style.display = "none";
    about_nav.style.display = "block"
    about_nav.style.display = "block"
    about_nav.style.animation = "strtLoad 1s ease 0s forwards"
    var links = document.querySelectorAll('.nryt a');
    links.forEach(function (link) {
        link.classList.remove('active');
    });
    about_btn.classList.add('active');
    var links = document.querySelectorAll('.about-nav a');
    links.forEach(function (link) {
        link.classList.remove('active');
    });
    let wlcm = document.querySelector(".wlcm")
    wlcm.classList.add('active');
    var links = document.querySelectorAll('.about-nav a');
    links.forEach(function (link) {
        link.classList.remove('active');
    });
    contact_btn.classList.add('active');
}

contact_btn.addEventListener("click", () => {
    timer = 1;
    contact.forEach((i) => {
        i.style.animation = `linksBtnAn 2s ease ${timer}s infinite ,strtLoad 1s ease ${timer}s forwards`;
        timer += 0.3;
    });

    timer = 0;
})

// btn animations 
let dldBtn = document.querySelectorAll('.downloadBtn button')
dldBtn.forEach((i) => {
    i.style.animation = `strtLoad 1s ease ${timer}s forwards, linksBtnAn 2s ease ${timer}s infinite`
    timer += 0.3;
    i.style.setProperty("--beforestyl", `button_shine ${2 + Math.random() * 7}s ease  ${Math.random() * 10}s infinite`);

})

timer = 0
links.forEach((i) => {
    i.style.animation = `linksBtnAn 2s ease ${timer}s infinite`
    timer += 0.3
    i.style.setProperty("--beforestyl", `button_shine ${2 + Math.random() * 7}s ease ${Math.random() * 10}s infinite`);

})
timer = 0
timer = 0

function toggleWidth(element) {
    var links = document.querySelectorAll('.about-nav a');
    links.forEach(function (link) {
        link.classList.remove('active');
    });

    element.classList.add('active');
}
function toggleWidthnav(element) {
    var links = document.querySelectorAll('.nryt a');
    links.forEach(function (link) {
        link.classList.remove('active');
    });

    element.classList.add('active');
    var links = document.querySelectorAll('.about-nav a');
    links.forEach(function (link) {
        link.classList.remove('active');
    });
    let wlcm = document.querySelector(".wlcm")
    wlcm.classList.add('active');
}

if (!(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent))) {
    Shery.mouseFollower();
    Shery.makeMagnet(".magnet");
}


// file name showing 
var div = document.getElementById('myDiv');
var text = div.textContent;
if (text.length > 300) {
    div.textContent = text.slice(0, 300) + "....";
}

// video player 
const controls = [
    'play-large',
    'rewind', 'play',
    'fast-forward',
    'progress',
    'current-time',
    'duration',
    //'mute',
    //'volume',
    'captions',
    'settings',
    'pip',
    'airplay',
    // 'download',
    'fullscreen'
];
document.addEventListener('DOMContentLoaded', () => {
    const player = Plyr.setup('.player', { controls });
});

// disabling right click
document.addEventListener("contextmenu", function (e) {
    e.preventDefault();
});
document.addEventListener('keydown', function (e) {
    if (
        e.key === 'F12' ||
        (e.ctrlKey && e.shiftKey && e.key === 'I') ||
        (e.ctrlKey && e.key === 'u') ||
        e.ctrlKey ||
        e.shiftKey ||
        e.altKey
    ) {
        e.preventDefault();
    }
});


const videolink = window.location.href;
const streamlink = videolink.replace("/watch/", "/dl/");

function vlc_player() {
    const openstreamlink = streamlink;
    const openVlc = `vlc://${openstreamlink}`;
    window.location.href = openVlc;
}

function mx_player() {
    const openstreamlink = streamlink;
    const openMx = `intent:${openstreamlink}#Intent;package=com.mxtech.videoplayer.ad;end`;
    window.location.href = openMx;
}

function n_player() {
    const openstreamlink = streamlink;
    const openNplayer = `nplayer-${openstreamlink}`;
    window.location.href = openNplayer;
}

function streamDownload() {
  const openstreamlink = streamlink;
  window.location.href = openstreamlink;
}

function copyStreamLink() {
  // সবসময় স্ট্রিম লিঙ্ক কপি করতে হবে
  let currentLink = window.location.href;
  let streamLinkToCopy = currentLink.replace("/dl/", "/watch/");

  if (!navigator.clipboard) {
    navigator.clipboard = {
      writeText: function(text) {
        return new Promise((resolve, reject) => {
          try {
            const textArea = document.createElement("textarea");
            textArea.value = text;
            document.body.appendChild(textArea);
            textArea.focus();
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
            resolve();
          } catch (err) {
            reject(err);
          }
        });
      }
    };
  }

  navigator.clipboard.writeText(streamLinkToCopy)
    .then(() => {
      console.log('Stream link copied to clipboard!');
      alert('Stream link copied successfully!');
    })
    .catch(err => {
      console.error('Failed to copy link: ', err);
      alert('Failed to copy link. Please try manually.');
    });
        }
