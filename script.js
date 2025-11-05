/* ================= MUSIC PLAYER CONTROL ================= */
(function(){
  const PLAYER_URL = 'player.html';
  const PLAYER_NAME = 'MyStoryPlayer';

  // open or focus persistent player window
  window.openMusicPlayer = function() {
    try {
      const win = window.open(PLAYER_URL, PLAYER_NAME, 'width=420,height=160,resizable=no');
      if (win) win.focus();
      else alert('Popup blocked — allow popups or use the inline player on page.');
    } catch(e){ console.error(e); }
  };

  // attempt to resume inline audio if session says music was playing and player not opened
  window.attemptResumeInline = function() {
    try {
      const musicFlag = sessionStorage.getItem('musicPlaying');
      const playerOpened = sessionStorage.getItem('musicPlayerOpened');
      if (musicFlag === 'true' && playerOpened !== 'true') {
        let audio = document.getElementById('__inline_resume');
        if (!audio) {
          audio = document.createElement('audio');
          audio.id = '__inline_resume';
          audio.src = 'https://www.bensound.com/bensound-music/bensound-sunny.mp3';
          audio.loop = true;
          audio.style.display = 'none';
          document.body.appendChild(audio);
        }
        audio.play().then(()=> sessionStorage.setItem('musicPlaying','true')).catch(()=>{ /* autoplay blocked */ });
      }
    } catch(e){ console.error(e); }
  };

  window.addEventListener('DOMContentLoaded', attemptResumeInline);
})();

/* ================= CONTACT FORM VALIDATION ================= */
function validateContactForm(e){
  e.preventDefault();
  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const msg = document.getElementById('message').value.trim();
  const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
  if(!name || !email || !msg) return alert('⚠️ Please fill all fields.');
  if(!emailPattern.test(email)) return alert('📧 Enter a valid email.');
  alert('✅ Message sent — thank you!');
  document.getElementById('contactForm').reset();
}

/* ================= ADMIN LOGIN VALIDATION ================= */
function validateAdminLogin(e){
  e.preventDefault();
  const u = document.getElementById('adminUser').value.trim();
  const p = document.getElementById('adminPass').value.trim();
  if(!u || !p) return alert('⚠️ Enter username & password.');
  if(u === 'admin' && p === '12345') {
    alert('✅ Welcome Admin');
    window.location.href='dashboard.html';
  } else alert('❌ Invalid credentials.');
}

/* ================= SCROLL ANIMATIONS (fade-in) ================= */
(function(){
  function onScrollAnimate(){
    document.querySelectorAll('.scroll-animate').forEach(el => {
      const r = el.getBoundingClientRect();
      if(r.top < window.innerHeight - 80) el.classList.add('scroll-visible');
    });
  }
  window.addEventListener('scroll', onScrollAnimate);
  window.addEventListener('DOMContentLoaded', onScrollAnimate);
})();

/* ================= BACK TO TOP BUTTON ================= */
(function(){
  const btn = document.createElement('button');
  btn.id = 'backTop';
  btn.innerHTML = '↑';
  btn.title = 'Back to top';
  document.body.appendChild(btn);
  btn.addEventListener('click', ()=> window.scrollTo({top:0,behavior:'smooth'}));
  window.addEventListener('scroll', ()=> {
    if(window.scrollY > 300) btn.classList.add('show');
    else btn.classList.remove('show');
  });
})();

/* ================= TYPING ANIMATION (HOME TITLE) ================= */
(function(){
  function typeText(el, texts, speed=60, pause=1200){
    let idxText = 0, char=0, forward=true;
    function tick(){
      const t = texts[idxText];
      if(forward){
        char++;
        el.textContent = t.slice(0,char);
        if(char === t.length) { forward=false; setTimeout(tick,pause); return; }
      } else {
        char--;
        el.textContent = t.slice(0,char);
        if(char === 0){ forward=true; idxText=(idxText+1)%texts.length; }
      }
      setTimeout(tick, speed);
    }
    tick();
  }

  window.addEventListener('DOMContentLoaded', ()=>{
    const el = document.querySelector('.title-typing');
    if(el) typeText(el, ['Welcome to My Story Website', 'Read. Imagine. Escape.'], 50, 1400);
  });
})();

/* ================= ADMIN PANEL: ADD, EDIT, DELETE, LOGOUT ================= */
document.addEventListener('DOMContentLoaded', () => {
  const addForm = document.getElementById('addStoryForm');
  if (addForm) {
    addForm.addEventListener('submit', (e) => {
      e.preventDefault();
      alert("✅ Story added successfully!");
      addForm.reset();
    });
  }
});

function editStory(btn) {
  const title = btn.closest('tr').children[0].textContent;
  alert(`✏️ Editing story: ${title}`);
}

function deleteStory(btn) {
  const row = btn.closest('tr');
  if (confirm("Are you sure you want to delete this story?")) {
    row.remove();
    alert("🗑️ Story deleted successfully!");
  }
}

function logoutAdmin() {
  alert("🚪 You have been logged out.");
  window.location.href = 'admin-login.html';
}
