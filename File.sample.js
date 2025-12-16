// ===================================================== // COMPLETE SKILL-BASED JOB SEARCH WEBSITE (FINAL VERSION) // Features: // - Fetch jobs from multiple FREE & LEGAL APIs // - Provide direct APPLY LINK for each job // - If apply link fails or is missing, redirect user //   to the respective platform search page (LinkedIn/Naukri/etc.) // =====================================================

// =============================== // BACKEND: Node.js + Express // ===============================

const express = require('express'); const axios = require('axios'); const cors = require('cors');

const app = express(); app.use(cors()); app.use(express.json());

// ---- API Keys (Free tiers) ---- const ADZUNA_APP_ID = 'YOUR_ADZUNA_APP_ID'; const ADZUNA_API_KEY = 'YOUR_ADZUNA_API_KEY'; const FINDWORK_API_KEY = 'YOUR_FINDWORK_API_KEY';

// ---- JOB API ENDPOINT ---- app.get('/api/jobs', async (req, res) => { const skill = req.query.skill; if (!skill) return res.status(400).json({ error: 'Skill is required' });

try { // 1️⃣ Remotive const remotiveRes = await axios.get(https://remotive.com/api/remote-jobs?search=${skill}); const remotiveJobs = remotiveRes.data.jobs.map(job => ({ source: 'Remotive', title: job.title, company: job.company_name, location: job.candidate_required_location, applyLink: job.url, fallback: https://remotive.com/remote-jobs?search=${encodeURIComponent(skill)} }));
// 2️⃣ Adzuna const adzunaRes = await axios.get('https://api.adzuna.com/v1/api/jobs/in/search/1', {   params: {     app_id: ADZUNA_APP_ID,     app_key: ADZUNA_API_KEY,     what: skill,     results_per_page: 10   } });  const adzunaJobs = adzunaRes.data.results.map(job => ({   source: 'Adzuna',   title: job.title,   company: job.company.display_name,   location: job.location.display_name,   applyLink: job.redirect_url,   fallback: https://www.adzuna.in/search?q=${encodeURIComponent(skill)} }));  // 3️⃣ Arbeitnow const arbeitRes = await axios.get('https://www.arbeitnow.com/api/job-board-api'); const arbeitJobs = arbeitRes.data.data   .filter(job => job.tags.join(' ').toLowerCase().includes(skill.toLowerCase()))   .slice(0, 10)   .map(job => ({     source: 'Arbeitnow',     title: job.title,     company: job.company_name,     location: job.location,     applyLink: job.url,     fallback: 'https://www.arbeitnow.com/jobs'   }));  // 4️⃣ Findwork const findworkRes = await axios.get(https://findwork.dev/api/jobs/?search=${skill}, {   headers: { Authorization: Token ${FINDWORK_API_KEY}} });  const findworkJobs = findworkRes.data.results.map(job => ({   source: 'Findwork',   title: job.role,   company: job.company_name,   location: job.location || 'Remote',   applyLink: job.url,   fallback:https://findwork.dev/?search=${encodeURIComponent(skill)}}));  const allJobs = [...remotiveJobs, ...adzunaJobs, ...arbeitJobs, ...findworkJobs]; res.json(allJobs);
} catch (error) { res.status(500).json({ error: 'Error fetching jobs' }); } });

app.listen(5000, () => console.log('Backend running on http://localhost:5000'));

// =============================== // FRONTEND: index.html // ===============================
Skill-Based Job Finder

Skill-Based Job Finder

Search Jobs
