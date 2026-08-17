// CareerNJobs Portal Main Script
const allPosts = (typeof sqlJobs !== 'undefined') ? [...sqlJobs] : [];

// Helper functions
function catTagClass(cat) {
  if (!cat) return 'tag-job';
  const c = cat.toLowerCase();
  if (c.includes('job')) return 'tag-job';
  if (c.includes('course')) return 'tag-course';
  if (c.includes('intern')) return 'tag-intern';
  return 'tag-job';
}

function iconFor(cat) {
  if (!cat) return '💼';
  const c = cat.toLowerCase();
  if (c.includes('job')) return '💼';
  if (c.includes('course')) return '🎓';
  if (c.includes('intern')) return '🚀';
  return '📌';
}

function createCardHTML(p) {
  const badgeText = p.salary ? (p.salary.includes('month') || p.salary.includes('LPA') ? p.salary.split('+')[0] : p.salary) : '';
  return `
    <article class="post-card">
      <div class="post-card-thumb">
        ${p.image ? `<img src="${p.image}" alt="${p.title}" loading="lazy">` : `<div style="font-size:32px;">${iconFor(p.cat)}</div>`}
      </div>
      <div class="post-card-body">
        <div class="post-card-tags">
          <span class="tag ${catTagClass(p.cat)}">${p.cat}</span>
          ${p.company ? `<span class="tag company-tag">${p.company}</span>` : ''}
          ${badgeText ? `<span class="meta-badge">${badgeText}</span>` : ''}
        </div>
        <h3><a href="${p.link || `job-details.html?id=${p.id}`}">${p.title}</a></h3>
        <div class="post-card-meta">
          <span>📅 ${p.date || 'Recent'}</span>
          ${p.location ? `<span>· 📍 ${p.location}</span>` : ''}
          ${p.experience ? `<span>· ⏳ ${p.experience}</span>` : ''}
        </div>
        <p>${p.desc || ''}</p>
        <div>
          <a href="${p.link || `job-details.html?id=${p.id}`}" class="btn-card-action">View Details & Apply →</a>
        </div>
      </div>
    </article>
  `;
}

// Render Sidebar Trending
function renderSidebarTrending() {
  const trendingEl = document.getElementById('sidebar-trending');
  if (!trendingEl || allPosts.length === 0) return;
  trendingEl.innerHTML = allPosts.slice(0, 4).map(p => `
    <div class="trending-item">
      <h4><a href="${p.link || `job-details.html?id=${p.id}`}">${p.title}</a></h4>
      <div class="trending-meta">${p.date || 'Recent'} · <span style="color:var(--primary);">${p.cat}</span></div>
    </div>
  `).join('');
}

// -------------------------------------------------------------
// HOMEPAGE MULTI-SECTION LOGIC
// -------------------------------------------------------------
function initHomepage() {
  const homeJobsGrid = document.getElementById('home-jobs-grid');
  const homeCoursesGrid = document.getElementById('home-courses-grid');
  const homeInternshipsGrid = document.getElementById('home-internships-grid');
  
  if (homeJobsGrid) {
    const jobs = allPosts.filter(p => p.cat && p.cat.toLowerCase().includes('job'));
    homeJobsGrid.innerHTML = jobs.map(createCardHTML).join('');
  }
  
  if (homeCoursesGrid) {
    const courses = allPosts.filter(p => p.cat && p.cat.toLowerCase().includes('course'));
    homeCoursesGrid.innerHTML = courses.map(createCardHTML).join('');
  }
  
  if (homeInternshipsGrid) {
    const internships = allPosts.filter(p => p.cat && p.cat.toLowerCase().includes('intern'));
    homeInternshipsGrid.innerHTML = internships.map(createCardHTML).join('');
  }

  // Filter Chips on Homepage
  const chips = document.querySelectorAll('.filter-chip');
  const filteredSection = document.getElementById('filtered-feed-section');
  const filteredTitle = document.getElementById('filtered-feed-title');
  const filteredGrid = document.getElementById('filtered-posts');
  const filteredCount = document.getElementById('filtered-count');
  const filteredEmpty = document.getElementById('filtered-empty');
  
  const secJobs = document.getElementById('section-latest-jobs');
  const secCourses = document.getElementById('section-free-courses');
  const secInternships = document.getElementById('section-internships');
  const featuredHero = document.getElementById('featured-hero');

  function applyHomeFilter(filterType) {
    if (filterType === 'all') {
      if (filteredSection) filteredSection.style.display = 'none';
      if (secJobs) secJobs.style.display = 'flex';
      if (secCourses) secCourses.style.display = 'flex';
      if (secInternships) secInternships.style.display = 'flex';
      if (featuredHero) featuredHero.style.display = 'grid';
      return;
    }

    if (secJobs) secJobs.style.display = 'none';
    if (secCourses) secCourses.style.display = 'none';
    if (secInternships) secInternships.style.display = 'none';
    if (featuredHero) featuredHero.style.display = 'none';
    if (filteredSection) filteredSection.style.display = 'flex';

    let results = [];
    if (filterType === 'jobs') {
      results = allPosts.filter(p => p.cat && p.cat.toLowerCase().includes('job'));
      if (filteredTitle) filteredTitle.textContent = '💼 Latest Verified Jobs';
    } else if (filterType === 'courses') {
      results = allPosts.filter(p => p.cat && p.cat.toLowerCase().includes('course'));
      if (filteredTitle) filteredTitle.textContent = '🎓 Free Certification Courses';
    } else if (filterType === 'internships') {
      results = allPosts.filter(p => p.cat && p.cat.toLowerCase().includes('intern'));
      if (filteredTitle) filteredTitle.textContent = '🚀 Paid & Remote Internships';
    } else if (filterType === 'ai') {
      results = allPosts.filter(p => `${p.title} ${p.desc} ${(p.skills || []).join(' ')}`.toLowerCase().includes('ai') || `${p.title} ${p.desc}`.toLowerCase().includes('tech'));
      if (filteredTitle) filteredTitle.textContent = '🤖 AI & Technology Opportunities';
    } else if (filterType === 'finance') {
      results = allPosts.filter(p => `${p.title} ${p.desc} ${(p.skills || []).join(' ')}`.toLowerCase().includes('finance') || `${p.title} ${p.desc}`.toLowerCase().includes('pay') || `${p.title} ${p.desc}`.toLowerCase().includes('operations'));
      if (filteredTitle) filteredTitle.textContent = '💳 Finance & Operations Openings';
    }

    if (filteredGrid) filteredGrid.innerHTML = results.map(createCardHTML).join('');
    if (filteredCount) filteredCount.textContent = `${results.length} listings`;
    if (filteredEmpty) filteredEmpty.hidden = results.length > 0;
  }

  chips.forEach(chip => {
    chip.addEventListener('click', () => {
      chips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      applyHomeFilter(chip.dataset.filter);
    });
  });

  // Homepage Search Form
  const searchForm = document.getElementById('searchForm');
  if (searchForm) {
    searchForm.addEventListener('submit', e => {
      e.preventDefault();
      const q = (document.getElementById('searchInput').value || '').trim().toLowerCase();
      if (!q) {
        applyHomeFilter('all');
        return;
      }
      if (secJobs) secJobs.style.display = 'none';
      if (secCourses) secCourses.style.display = 'none';
      if (secInternships) secInternships.style.display = 'none';
      if (featuredHero) featuredHero.style.display = 'none';
      if (filteredSection) filteredSection.style.display = 'flex';

      const results = allPosts.filter(p => 
        `${p.title} ${p.desc} ${p.cat} ${p.company || ''} ${(p.skills || []).join(' ')} ${p.location || ''}`.toLowerCase().includes(q)
      );

      if (filteredTitle) filteredTitle.textContent = `Search Results for "${q}"`;
      if (filteredGrid) filteredGrid.innerHTML = results.map(createCardHTML).join('');
      if (filteredCount) filteredCount.textContent = `${results.length} results`;
      if (filteredEmpty) filteredEmpty.hidden = results.length > 0;
    });
  }
}

// -------------------------------------------------------------
// DEDICATED LISTING PAGES LOGIC (jobs.html, courses.html, internships.html)
// -------------------------------------------------------------
function initDedicatedPage(pageCategory) {
  const pageGrid = document.getElementById('page-items-grid');
  const countEl = document.getElementById('page-result-count');
  const emptyEl = document.getElementById('page-empty');
  const searchForm = document.getElementById('searchForm');
  const chips = document.querySelectorAll('.filter-chip');

  if (!pageGrid) return;

  let baseList = allPosts.filter(p => p.cat && p.cat.toLowerCase().includes(pageCategory));
  let currentFiltered = [...baseList];

  function renderList() {
    pageGrid.innerHTML = currentFiltered.map(createCardHTML).join('');
    if (countEl) countEl.textContent = `${currentFiltered.length} listings`;
    if (emptyEl) emptyEl.hidden = currentFiltered.length > 0;
  }

  renderList();

  if (searchForm) {
    searchForm.addEventListener('submit', e => {
      e.preventDefault();
      const q = (document.getElementById('searchInput').value || '').trim().toLowerCase();
      if (!q) {
        currentFiltered = [...baseList];
      } else {
        currentFiltered = baseList.filter(p => 
          `${p.title} ${p.desc} ${p.company || ''} ${(p.skills || []).join(' ')} ${p.location || ''}`.toLowerCase().includes(q)
        );
      }
      renderList();
    });
  }

  chips.forEach(chip => {
    chip.addEventListener('click', () => {
      chips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      const f = chip.dataset.filter;
      if (f === 'all') {
        currentFiltered = [...baseList];
      } else {
        currentFiltered = baseList.filter(p => 
          `${p.title} ${p.desc} ${(p.tags || []).join(' ')} ${(p.skills || []).join(' ')}`.toLowerCase().includes(f)
        );
      }
      renderList();
    });
  });
}

// -------------------------------------------------------------
// INDIVIDUAL DETAILS PAGE & RELATED CONTENT ENGINE (job-details.html)
// -------------------------------------------------------------
function initJobDetailsPage() {
  const jobTitleEl = document.getElementById('job-title');
  if (!jobTitleEl) return;

  const urlParams = new URLSearchParams(window.location.search);
  const jobId = urlParams.get('id');
  let post = null;

  if (jobId) {
    post = allPosts.find(p => p.id === jobId);
  }
  if (!post && allPosts.length > 0) {
    post = allPosts[0]; // fallback
  }
  if (!post) return;

  // Set Page Title & Meta
  document.title = `${post.title} — CareerNJobs`;
  const setEl = (id, val) => { const el = document.getElementById(id); if (el) el.textContent = val; };

  setEl('breadcrumb-title', post.role || post.title);
  setEl('breadcrumb-cat', post.cat || 'Opportunities');
  
  const catLink = document.getElementById('breadcrumb-cat-link');
  if (catLink && post.cat) {
    const c = post.cat.toLowerCase();
    if (c.includes('job')) catLink.href = 'jobs.html';
    else if (c.includes('course')) catLink.href = 'courses.html';
    else if (c.includes('intern')) catLink.href = 'internships.html';
  }

  setEl('job-title', post.title);
  setEl('job-cat', post.cat);
  
  const jobCatBadge = document.getElementById('job-cat');
  if (jobCatBadge) jobCatBadge.className = `tag ${catTagClass(post.cat)}`;

  const companyTag = document.getElementById('job-company-tag');
  if (companyTag) {
    if (post.company) { companyTag.textContent = post.company; companyTag.style.display = 'inline-block'; }
    else { companyTag.style.display = 'none'; }
  }

  const salaryTag = document.getElementById('job-salary-tag');
  if (salaryTag) {
    if (post.salary) { salaryTag.textContent = post.salary; salaryTag.style.display = 'inline-block'; }
    else { salaryTag.style.display = 'none'; }
  }

  setEl('job-date', `📅 Posted: ${post.date || 'Recent'}`);
  setEl('job-location', `📍 Location: ${post.location || 'India'}`);
  setEl('job-type-badge', `💼 Type: ${post.job_type || 'Full Time'}`);

  setEl('job-company', post.company || 'Direct Recruitment');
  setEl('job-role', post.role || 'Associate / Specialist');
  setEl('job-education', post.education || 'Graduate / Diploma / Any Degree');
  setEl('job-experience', post.experience || 'Freshers / 0-2 Years');
  setEl('job-location-meta', post.location || 'Online / Remote / On-site');
  setEl('job-salary', post.salary || 'Best in Industry');

  setEl('job-desc', post.job_description || post.desc || '');

  // Skills Pills
  const skillsWrap = document.getElementById('job-skills-pills');
  if (skillsWrap) {
    if (post.skills && post.skills.length > 0) {
      skillsWrap.innerHTML = post.skills.map(s => `<span class="skill-pill">${s}</span>`).join('');
    } else {
      skillsWrap.innerHTML = `<span class="skill-pill">Communication</span><span class="skill-pill">Problem Solving</span>`;
    }
  }

  // Responsibilities
  const rolesEl = document.getElementById('section-roles');
  if (rolesEl) {
    if (post.responsibilities) {
      setEl('job-responsibilities', post.responsibilities);
      rolesEl.style.display = 'block';
    } else {
      rolesEl.style.display = 'none';
    }
  }

  // Eligibility
  const eligEl = document.getElementById('section-eligibility');
  if (eligEl) {
    if (post.eligibility) {
      setEl('job-eligibility', post.eligibility);
      eligEl.style.display = 'block';
    } else {
      eligEl.style.display = 'none';
    }
  }

  // Banner Image
  const bannerWrap = document.getElementById('job-banner-wrap');
  const jobImg = document.getElementById('job-image');
  if (post.image && jobImg && bannerWrap) {
    jobImg.src = post.image;
    jobImg.alt = post.title;
    bannerWrap.style.display = 'block';
  } else if (bannerWrap) {
    bannerWrap.style.display = 'none';
  }

  // Apply Now Buttons
  const applyUrl = post.apply_url || '#';
  const topApply = document.getElementById('apply-btn-top');
  const bottomApply = document.getElementById('apply-btn-bottom');
  if (topApply) topApply.href = applyUrl;
  if (bottomApply) bottomApply.href = applyUrl;

  // Render Related Content
  renderRelatedOpportunities(post);
}

// Related / Similar Opportunities Engine
function renderRelatedOpportunities(currentPost) {
  const container = document.getElementById('similar-opportunities');
  if (!container) return;

  const related = allPosts
    .filter(p => p.id !== currentPost.id)
    .map(p => {
      let score = 0;
      if (p.cat === currentPost.cat) score += 15;
      if (p.company && currentPost.company && p.company === currentPost.company) score += 10;
      if (p.skills && currentPost.skills) {
        const matches = p.skills.filter(s => currentPost.skills.includes(s));
        score += matches.length * 4;
      }
      return { post: p, score: score };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, 4)
    .map(item => item.post);

  if (related.length === 0) return;

  let headingText = 'Similar Opportunities You May Like';
  if (currentPost.cat && currentPost.cat.toLowerCase().includes('job')) headingText = 'Similar Job Openings';
  else if (currentPost.cat && currentPost.cat.toLowerCase().includes('course')) headingText = 'Related Free Courses';
  else if (currentPost.cat && currentPost.cat.toLowerCase().includes('intern')) headingText = 'Related Internships';

  container.innerHTML = `
    <section class="similar-section">
      <hr class="similar-divider">
      <h2>${headingText}</h2>
      <div class="similar-grid">
        ${related.map(p => `
          <article class="similar-card">
            <div class="similar-card-header">
              <span class="tag ${catTagClass(p.cat)}">${p.cat}</span>
              <span class="similar-date">${p.date || 'Recent'}</span>
            </div>
            <h3><a href="${p.link || `job-details.html?id=${p.id}`}">${p.title}</a></h3>
            <p>${p.desc || ''}</p>
            <div class="similar-tags">
              ${(p.skills || []).slice(0, 2).map(s => `<span class="skill-pill">${s}</span>`).join('')}
              ${p.location ? `<span class="meta-pill">${p.location}</span>` : ''}
            </div>
            <div style="margin-top:auto;">
              <a href="${p.link || `job-details.html?id=${p.id}`}" class="btn-view-details">View Details →</a>
            </div>
          </article>
        `).join('')}
      </div>
    </section>
  `;
}

// -------------------------------------------------------------
// GLOBAL INITIALIZATION
// -------------------------------------------------------------
document.addEventListener('DOMContentLoaded', () => {
  // Mobile Menu Toggle
  const menuToggle = document.querySelector('.menu-toggle');
  if (menuToggle) {
    menuToggle.addEventListener('click', e => {
      const nav = document.querySelector('.nav');
      if (nav) {
        nav.classList.toggle('open');
        e.currentTarget.setAttribute('aria-expanded', nav.classList.contains('open'));
      }
    });
  }

  // Footer Year
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Newsletter Submission
  const newsletterForm = document.getElementById('newsletterForm');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', e => {
      e.preventDefault();
      const msg = document.getElementById('newsletterMsg');
      if (msg) msg.textContent = "✓ Thanks! You've joined CareerNJobs alert list.";
      e.target.reset();
    });
  }

  // Render Sidebar Trending
  renderSidebarTrending();

  // Determine Page Mode
  const pathname = (window.location.pathname || '').toLowerCase();
  if (pathname.includes('job-details') || document.getElementById('job-title')) {
    initJobDetailsPage();
  } else if (pathname.includes('jobs.html')) {
    initDedicatedPage('job');
  } else if (pathname.includes('courses.html')) {
    initDedicatedPage('course');
  } else if (pathname.includes('internships.html')) {
    initDedicatedPage('intern');
  } else {
    initHomepage();
  }
});
