let posts = [
  {
    cat: "Private Job",
    title: "Accenture Custom Software Engineer Hiring 2026 — Python (0-2 Years)",
    date: "Aug 14, 2026",
    desc: "Develop custom software solutions, design, code, and enhance components using modern frameworks in Hyderabad. Must have Python skills.",
    link: "accenture-custom-software-engineer.html",
    skills: ["Python", "OOP", "Debugging", "Agile"],
    tags: ["Developer", "Fresher", "Hyderabad", "Full Time"],
    role: "Custom Software Engineer",
    location: "Hyderabad",
    education: "15 years education"
  },
  {
    cat: "Private Job",
    title: "Software Developer Fresher Hiring 2026 — Skills & Application Process",
    date: "Aug 12, 2026",
    desc: "A career guide for graduates looking for entry-level software development roles. Apply for backend/frontend developer track.",
    link: "software-developer-fresher.html",
    skills: ["Python", "Java", "SQL", "Git"],
    tags: ["Developer", "Fresher", "Bangalore", "Graduate"],
    role: "Software Developer",
    location: "Bangalore",
    education: "B.Tech/BE"
  },
  {
    cat: "Internship",
    title: "Remote Software Engineering Internship — Students & Freshers Can Apply",
    date: "Aug 13, 2026",
    desc: "Learn about role requirements, selection process, Python skills, and application instructions for a remote engineering internship.",
    link: "software-engineering-internship.html",
    skills: ["Python", "Git", "HTML", "CSS", "Javascript"],
    tags: ["Internship", "Remote", "Student", "Fresher"],
    role: "Software Engineering Intern",
    location: "Remote",
    education: "Undergraduate"
  },
  {
    cat: "Internship",
    title: "AI & Data Analytics Internship 2026 — Eligibility, Skills & How to Apply",
    date: "Aug 14, 2026",
    desc: "Explore a practical internship opportunity for students and fresh graduates interested in AI, Python, analytics, and technology.",
    link: "ai-data-analytics-internship.html",
    skills: ["Python", "SQL", "Machine Learning", "Data Analysis"],
    tags: ["Internship", "Remote", "Data Science", "Fresher"],
    role: "AI & Data Intern",
    location: "Remote",
    education: "B.Tech/BE/BSc"
  },
  {
    cat: "Private Job",
    title: "Data Analyst Jobs 2026 — Excel, SQL & Python Skills Employers Want",
    date: "Aug 9, 2026",
    desc: "A practical overview of entry-level data analyst requirements and preparation. Requires strong database and scripting knowledge.",
    link: "data-analyst-jobs.html",
    skills: ["SQL", "Python", "Excel", "Tableau", "PowerBI"],
    tags: ["Analyst", "Fresher", "Mumbai", "Full Time"],
    role: "Data Analyst",
    location: "Mumbai",
    education: "Graduate"
  },
  {
    cat: "Free Course",
    title: "Free Python & SQL Course — Beginner to Job-Ready",
    date: "Aug 11, 2026",
    desc: "Strengthen programming and database fundamentals with a structured learning path. Earn a free completion certificate.",
    link: "free-python-sql-course.html",
    skills: ["Python", "SQL", "Database"],
    tags: ["Free Course", "Certificate", "Beginner", "Online"],
    role: "Student",
    location: "Online",
    education: "Any"
  },
  {
    cat: "Free Course",
    title: "Free Generative AI Course 2026 — Learn Prompt Engineering & AI Tools",
    date: "Aug 14, 2026",
    desc: "Build practical AI skills with a beginner-friendly online course and certificate. Learn tools like ChatGPT, Claude, and Midjourney.",
    link: "free-generative-ai-course.html",
    skills: ["Prompt Engineering", "Generative AI", "AI Tools"],
    tags: ["Free Course", "Certificate", "AI", "Online"],
    role: "Student",
    location: "Online",
    education: "Any"
  },
  {
    cat: "Scholarship",
    title: "Scholarship 2026–27 — Eligibility, Documents, Amount & Application Guide",
    date: "Aug 12, 2026",
    desc: "Find financial-support opportunities and understand the application process. Direct scholarship awards for qualified students.",
    link: "scholarship-2026-27.html",
    skills: ["Academic Excellence"],
    tags: ["Scholarship", "Financial Support", "Students", "India"],
    role: "Student",
    location: "India",
    education: "12th / Graduate"
  },
  {
    cat: "Scholarship",
    title: "National Merit Scholarship Program 2026 — Apply Online, Amount & Criteria",
    date: "Aug 10, 2026",
    desc: "A guide for government sponsored scholarships for higher secondary school and college students with outstanding academic records.",
    link: "national-merit-scholarship.html",
    skills: ["Academic Excellence"],
    tags: ["Scholarship", "Financial Support", "Students", "Government"],
    role: "Student",
    location: "India",
    education: "10th / 12th"
  },
  {
    cat: "Government Job",
    title: "Government Recruitment 2026 — Check Eligibility, Vacancies & Apply Online",
    date: "Aug 13, 2026",
    desc: "A simple guide covering eligibility, important dates, documents, and application steps for national administration vacancies.",
    link: "government-recruitment-2026.html",
    skills: ["General Aptitude", "Reasoning"],
    tags: ["Govt Job", "Delhi", "Full Time", "Officer"],
    role: "Officer",
    location: "Delhi",
    education: "Graduate"
  },
  {
    cat: "Government Job",
    title: "Apprentice Recruitment 2026 — Stipend, Eligibility & Selection Process",
    date: "Aug 10, 2026",
    desc: "Check who can apply, required qualifications, stipend rates, and the application workflow for a government apprenticeship.",
    link: "apprentice-recruitment-2026.html",
    skills: ["Technical Skills", "ITI"],
    tags: ["Govt Job", "Apprenticeship", "Stipend", "Hyderabad"],
    role: "Apprentice",
    location: "Hyderabad",
    education: "ITI / Diploma / B.Tech"
  }
];

if (typeof sqlJobs !== 'undefined') {
  posts = sqlJobs.concat(posts);
}

const postsEl = document.getElementById("posts");
const popularEl = document.getElementById("popular");
const countEl = document.getElementById("resultCount");
const emptyEl = document.getElementById("empty");
const loadMore = document.getElementById("loadMore");
let filtered = [...posts];
let visible = 5;

function iconFor(cat){
  return ({Internship:"↗", "Free Course":"◆", "Government Job":"★", "Private Job":"●", Scholarship:"₹"})[cat] || "S";
}

function render(){
  if (!postsEl) return;
  const list = filtered.slice(0, visible);
  postsEl.innerHTML = list.map(p => `
    <article class="post">
      <div class="post-image">${iconFor(p.cat)}</div>
      <div>
        <span class="tag">${p.cat}</span>
        <h3><a href="${p.link || '#'}">${p.title}</a></h3>
        <div class="post-meta">${p.date}</div>
        <p>${p.desc}</p>
      </div>
    </article>`).join("");
  if (countEl) countEl.textContent = `${filtered.length} results`;
  if (emptyEl) emptyEl.hidden = filtered.length !== 0;
  if (loadMore) loadMore.hidden = visible >= filtered.length || filtered.length === 0;
}

function renderPopular(){
  if (!popularEl) return;
  popularEl.innerHTML = posts.slice(0,5).map(p => `
    <div class="popular-item">
      <a href="${p.link || '#'}">${p.title}</a>
      <small>${p.date} · ${p.cat}</small>
    </div>`).join("");
}

function renderSimilarOpportunities(currentPost) {
  // Scoring algorithm
  const recommendations = posts
    .filter(p => p.link.toLowerCase() !== currentPost.link.toLowerCase()) // exclude current post
    .map(p => {
      let score = 0;
      
      // Category match (highest priority)
      if (p.cat === currentPost.cat) {
        score += 15;
      }
      
      // Role match
      if (p.role && currentPost.role && p.role.toLowerCase() === currentPost.role.toLowerCase()) {
        score += 8;
      }
      
      // Skills match
      if (p.skills && currentPost.skills) {
        const matchingSkills = p.skills.filter(s => currentPost.skills.includes(s));
        score += matchingSkills.length * 4;
      }
      
      // Location match
      if (p.location && currentPost.location && p.location.toLowerCase() === currentPost.location.toLowerCase()) {
        score += 6;
      }
      
      // Tags match
      if (p.tags && currentPost.tags) {
        const matchingTags = p.tags.filter(t => currentPost.tags.includes(t));
        score += matchingTags.length * 3;
      }
      
      // Title keyword overlap
      const currentTitleWords = currentPost.title.toLowerCase().split(/\W+/);
      currentTitleWords.forEach(word => {
        if (word.length > 3 && p.title.toLowerCase().includes(word)) {
          score += 2;
        }
      });
      
      return { post: p, score: score };
    });
  
  // Sort descending by score
  recommendations.sort((a, b) => b.score - a.score);
  
  // Select top 6 opportunities
  const topRecommendations = recommendations.slice(0, 6).map(item => item.post);
  
  if (topRecommendations.length === 0) return;
  
  // Dynamic Heading based on category
  let headingText = "Similar Opportunities You May Like";
  if (currentPost.cat === "Private Job" || currentPost.cat === "Government Job") {
    headingText = "Similar Jobs You May Like";
  } else if (currentPost.cat === "Internship") {
    headingText = "Related Internships You May Like";
  } else if (currentPost.cat === "Free Course") {
    headingText = "Related Courses For You";
  } else if (currentPost.cat === "Scholarship") {
    headingText = "Similar Scholarships For You";
  }
  
  // Find or create container below content
  let similarContainer = document.getElementById("similar-opportunities");
  if (!similarContainer) {
    const contentEl = document.querySelector(".content");
    if (contentEl) {
      similarContainer = document.createElement("div");
      similarContainer.id = "similar-opportunities";
      contentEl.appendChild(similarContainer);
    }
  }
  
  if (!similarContainer) return;
  
  similarContainer.innerHTML = `
    <section class="similar-section">
      <hr class="similar-divider">
      <h2>${headingText}</h2>
      <div class="similar-grid">
        ${topRecommendations.map(p => `
          <article class="similar-card">
            <div class="similar-card-header">
              <span class="tag small-tag">${p.cat}</span>
              <span class="similar-date">${p.date}</span>
            </div>
            <h3><a href="${p.link}">${p.title}</a></h3>
            <p>${p.desc}</p>
            <div class="similar-tags">
              ${(p.skills || []).slice(0, 2).map(s => `<span class="skill-pill">${s}</span>`).join("")}
              ${(p.tags || []).slice(0, 2).map(t => `<span class="meta-pill">${t}</span>`).join("")}
            </div>
            <div class="similar-card-footer">
              <a href="${p.link}" class="btn-view-details">View Details</a>
            </div>
          </article>
        `).join("")}
      </div>
    </section>
  `;
}

const searchForm = document.getElementById("searchForm");
if (searchForm) {
  searchForm.addEventListener("submit", e=>{
    e.preventDefault();
    const q = document.getElementById("searchInput").value.trim().toLowerCase();
    filtered = posts.filter(p => !q || `${p.cat} ${p.title} ${p.desc}`.toLowerCase().includes(q));
    visible = 5; render();
  });
}
if (loadMore) {
  loadMore.addEventListener("click",()=>{visible += 5; render();});
}
const newsletterForm = document.getElementById("newsletterForm");
if (newsletterForm) {
  newsletterForm.addEventListener("submit", e=>{
    e.preventDefault();
    const msgEl = document.getElementById("newsletterMsg");
    if (msgEl) msgEl.textContent = "Thanks! You're on the list.";
    e.target.reset();
  });
}
const menuToggle = document.querySelector(".menu-toggle");
if (menuToggle) {
  menuToggle.addEventListener("click", e=>{
    const nav = document.querySelector(".nav");
    if (nav) {
      nav.classList.toggle("open");
      e.currentTarget.setAttribute("aria-expanded", nav.classList.contains("open"));
    }
  });
}
const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();

// Auto-run similar opportunities engine on details pages
const currentPath = window.location.pathname;
const currentFilename = currentPath.substring(currentPath.lastIndexOf('/') + 1) || 'index.html';

let currentPost = null;

if (currentFilename.toLowerCase() === 'job-details.html') {
  const urlParams = new URLSearchParams(window.location.search);
  const jobId = urlParams.get('id');
  if (jobId) {
    currentPost = posts.find(p => p.id === jobId);
    if (currentPost) {
      // Populate DOM
      document.title = `${currentPost.title} — CareerNJob`;
      const setText = (id, text) => { const el = document.getElementById(id); if (el) el.textContent = text; };
      const setHTML = (id, html) => { const el = document.getElementById(id); if (el) el.innerHTML = html; };
      
      setText('page-title', `${currentPost.title} — CareerNJob`);
      setText('job-title', currentPost.title);
      setText('job-cat', currentPost.cat);
      setText('job-date', `Posted: ${currentPost.date}`);
      setText('job-location', `Location: ${currentPost.location}`);
      setText('job-skills', currentPost.skills && currentPost.skills.length > 0 ? currentPost.skills.join(', ') : 'N/A');
      setText('job-experience', currentPost.experience || 'N/A');
      setText('job-education', currentPost.education || 'N/A');
      setText('job-location-meta', currentPost.location || 'N/A');
      setText('job-desc', currentPost.job_description || currentPost.desc);
      
      if (currentPost.responsibilities) {
        setText('job-responsibilities', currentPost.responsibilities);
      } else {
        const el = document.getElementById('section-roles');
        if (el) el.style.display = 'none';
      }
      
      if (currentPost.eligibility) {
        setText('job-eligibility', currentPost.eligibility);
      } else {
        const el = document.getElementById('section-eligibility');
        if (el) el.style.display = 'none';
      }
      
      const topApply = document.getElementById('apply-btn-top');
      const bottomApply = document.getElementById('apply-btn-bottom');
      const applyUrl = currentPost.apply_url || '#';
      if (topApply) topApply.href = applyUrl;
      if (bottomApply) bottomApply.href = applyUrl;
    }
  }
} else {
  currentPost = posts.find(p => p.link && p.link.toLowerCase() === currentFilename.toLowerCase());
}

if (currentPost) {
  renderSimilarOpportunities(currentPost);
}

renderPopular();
render();
