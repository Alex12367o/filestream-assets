// ===================== Movie Suggestion Function =====================
async function getDets() {
  let randPage = Math.floor(1 + Math.random() * 100)
  const apiKey = '6abcb6bb99fb77f33c37016a28866ed2';
  let apiArr = [
    `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=hin-US&page=${randPage}`,
    `https://api.themoviedb.org/3/trending/movie/day?api_key=${apiKey}&language=hin-US&page=${randPage}`,
    `https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}&language=hin-US&page=${randPage}`
  ];
  let ArrRanIndex = Math.floor(Math.random() * apiArr.length)
  let apiUrl = apiArr[ArrRanIndex]
  let movieCont = document.querySelector('.movieSug')
  let img = document.querySelector('.movieimg img')
  let movieDets = document.querySelector('.movieDets')
  let movieDetsMini = document.querySelector('.movieDets-mini')
  let data = await fetch(apiUrl)
  let resData = await data.json()
  let ranIndex = Math.floor(Math.random() * resData.results.length)
  let movie = resData.results[ranIndex]
  movieDets.innerHTML = `
    <h3>Must-see blockbuster film!</h3>
    <h4><span>Title:</span> ${movie.title}</h4>
    <h4><span>movie overview:</span> ${movie.overview}</h4>
    <h4><span>Release Date:</span> ${movie.release_date}</h4>
    <h4><span>Rating:</span> ${movie.vote_average.toFixed(1)} / 10</h4>
  `
  movieDetsMini.innerHTML = `
    <h3><span>Title:</span> ${movie.title}</h3>
    <h3><span>Release Date:</span> ${movie.release_date}</h3>
    <h3><span>Rating:</span> ${movie.vote_average.toFixed(1)} / 10</h3>
  `
  img.src = `https://image.tmdb.org/t/p/w1280/${movie.poster_path}`
  movieCont.style.backgroundImage = `url(https://image.tmdb.org/t/p/w1280/${movie.backdrop_path})`;
}
window.addEventListener("load", getDets())

// ===================== Navigation Handling =====================
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

homeBtn.classList.add('active');

abtBtn.addEventListener("click", () => {
  dldBtn_outer.style.display = "none";
  file_name.style.display = "none";
  footer.style.display = "none";
  about_nav.style.display = "block"
  about_nav.style.animation = "strtLoad 1s ease 0s forwards"
})

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

contact_btn.addEventListener("click", () => {
  timer = 1;
  contact.forEach((i) => {
    i.style.animation = `linksBtnAn 2s ease ${timer}s infinite ,strtLoad 1s ease ${timer}s forwards`;
    timer += 0.3;
  });
  timer = 0;
})

// ===================== Animations =====================
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

// ===================== Video Player =====================
var div = document.getElementById('myDiv');
var text = div.textContent;
if (text.length > 300) {
  div.textContent = text.slice(0, 300) + "....";
}

const controls = [
  'play-large',
  'rewind', 'play',
  'fast-forward',
  'progress',
  'current-time',
  'duration',
  'captions',
  'settings',
  'pip',
  'airplay',
  'fullscreen'
];
document.addEventListener('DOMContentLoaded', () => {
  const player = Plyr.setup('.player', { controls });
});

// ===================== Right Click Protection =====================
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

// ===================== Stream Links =====================
const videolink = window.location.href;
const streamlink = videolink.replace("/watch/", "/dl/");

// ---- Download ----
function streamDownload() {
  const openstreamlink = streamlink;
  window.location.href = openstreamlink;
}

// ---- Copy Link ----
function copyStreamLink() {
  let currentLink = window.location.href;
  let streamLinkToCopy = currentLink.replace("/dl/", "/watch/");

  if (!navigator.clipboard) {
    navigator.clipboard = {
      writeText: function (text) {
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
      alert('Stream link copied successfully!');
    })
    .catch(err => {
      alert('Failed to copy link. Please try manually.');
    });
}

// ===================== Player Open Buttons =====================

// ---- VLC Player ----
function vlc_player() {
  const openstreamlink = streamlink;
  const vlcIntent = `intent:${openstreamlink}#Intent;package=org.videolan.vlc;type=video/mp4;S.title=${encodeURIComponent(document.title)};end`;
  window.location.href = vlcIntent;
}

// ---- MX Player ----
function mx_player() {
  const openstreamlink = streamlink;
  const mxIntentAd = `intent:${openstreamlink}#Intent;package=com.mxtech.videoplayer.ad;end`;
  const mxIntentPro = `intent:${openstreamlink}#Intent;package=com.mxtech.videoplayer.pro;end`;

  // প্রথমে AD ভার্সন, তারপর fallback করে PRO ভার্সনে ট্রাই করবে
  window.location.href = mxIntentAd;
  setTimeout(() => {
    window.location.href = mxIntentPro;
  }, 1000);
}

// ---- nPlayer ----
function n_player() {
  const openstreamlink = streamlink;
  const nplayerIntent = `nplayer-${openstreamlink}`;
  window.location.href = nplayerIntent;
                         }
