(function () {
  const username = "kibin0-0";
  const archiveUrl = new URL("java03/", window.location.href).toString();
  const featuredOrder = [
    "jlpt-kanji-dialogue-lab-20260305",
    "sumdoku-fusion-web-20260305",
    "kibin0-0.github.io"
  ];

  const repoNotes = {
    "jlpt-kanji-dialogue-lab-20260305": {
      label: "Featured learning app",
      displayName: "JLPT Kanji Dialogue Lab",
      summary: "JLPT N1/N2 한자 어휘를 대화, 후리가나, 번역, 퀴즈 흐름으로 학습하는 정적 웹앱입니다.",
      extraTags: ["Supabase", "Static"],
      liveUrl: "https://jlpt-kanji-dialogue-lab.vercel.app",
      articleUrl: "#essay-jlpt"
    },
    "sumdoku-fusion-web-20260305": {
      label: "Featured puzzle app",
      displayName: "SumDoku Fusion Web",
      summary: "6x6 Sudoku와 케이지 합 규칙을 결합한 퍼즐을 브라우저에서 플레이할 수 있도록 만든 정적 웹앱입니다.",
      extraTags: ["Puzzle", "Vercel"],
      liveUrl: "https://webtset.vercel.app",
      articleUrl: "#essay-sumdoku"
    },
    "kibin0-0.github.io": {
      label: "Portfolio and archive",
      displayName: "kibin0-0.github.io",
      summary: "현재 포트폴리오 메인 페이지와 Java03 학습 자료 아카이브를 함께 관리하는 GitHub Pages 저장소입니다.",
      extraTags: ["Pages", "Archive"],
      liveUrl: "https://kibin0-0.github.io",
      articleUrl: "#essay-pages",
      extraLinks: [
        { label: "Java03 아카이브", url: archiveUrl }
      ]
    }
  };

  const fallbackRepos = [
    {
      name: "jlpt-kanji-dialogue-lab-20260305",
      description: "JLPT N1/N2 kanji dialogue learning web app",
      html_url: "https://github.com/kibin0-0/jlpt-kanji-dialogue-lab-20260305",
      homepage: "https://jlpt-kanji-dialogue-lab.vercel.app",
      language: "PLpgSQL",
      stargazers_count: 0,
      updated_at: "2026-03-12T04:56:08Z"
    },
    {
      name: "sumdoku-fusion-web-20260305",
      description: "SumDoku Fusion web app for Vercel deployment",
      html_url: "https://github.com/kibin0-0/sumdoku-fusion-web-20260305",
      homepage: "https://webtset.vercel.app",
      language: "JavaScript",
      stargazers_count: 0,
      updated_at: "2026-03-05T06:48:03Z"
    },
    {
      name: "kibin0-0.github.io",
      description: "",
      html_url: "https://github.com/kibin0-0/kibin0-0.github.io",
      homepage: "https://kibin0-0.github.io",
      language: "HTML",
      stargazers_count: 0,
      updated_at: "2026-03-05T05:13:50Z"
    }
  ];

  const repoGrid = document.getElementById("repoGrid");
  const repoCount = document.getElementById("repoCount");
  const demoCount = document.getElementById("demoCount");
  const starCount = document.getElementById("starCount");
  const syncNote = document.getElementById("syncNote");

  function escapeHtml(value) {
    return String(value || "")
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll("\"", "&quot;")
      .replaceAll("'", "&#39;");
  }

  function formatDate(input) {
    return new Intl.DateTimeFormat("ko-KR", {
      year: "numeric",
      month: "long",
      day: "numeric"
    }).format(new Date(input));
  }

  function sortRepos(repos) {
    return [...repos].sort((a, b) => {
      const aIndex = featuredOrder.indexOf(a.name);
      const bIndex = featuredOrder.indexOf(b.name);
      if (aIndex !== -1 || bIndex !== -1) {
        if (aIndex === -1) {
          return 1;
        }
        if (bIndex === -1) {
          return -1;
        }
        return aIndex - bIndex;
      }
      return new Date(b.updated_at) - new Date(a.updated_at);
    });
  }

  function buildRepoCard(repo) {
    const note = repoNotes[repo.name] || {};
    const displayName = note.displayName || repo.name;
    const summary = note.summary || repo.description || "저장소 설명이 아직 작성되지 않았습니다.";
    const label = note.label || "Public repository";
    const tags = [repo.language, ...(note.extraTags || [])].filter(Boolean).slice(0, 4);
    const homepage = note.liveUrl || repo.homepage;
    const extraLinks = note.extraLinks || [];
    const articleUrl = note.articleUrl;

    const tagMarkup = tags.length
      ? `<div class="repo-tags">${tags.map((tag) => `<span class="repo-tag">${escapeHtml(tag)}</span>`).join("")}</div>`
      : "";

    const articleLink = articleUrl ? `<a href="${escapeHtml(articleUrl)}">정리 글</a>` : "";
    const liveLink = homepage ? `<a href="${escapeHtml(homepage)}" target="_blank" rel="noreferrer">라이브</a>` : "";
    const extraLinkMarkup = extraLinks
      .map((link) => `<a href="${escapeHtml(link.url)}" target="_blank" rel="noreferrer">${escapeHtml(link.label)}</a>`)
      .join("");

    return `
      <article class="repo-card">
        <div class="repo-top">
          <div>
            <p class="repo-meta">${escapeHtml(label)}</p>
            <h3 class="repo-title">${escapeHtml(displayName)}</h3>
          </div>
          <span class="repo-updated">${escapeHtml(formatDate(repo.updated_at))}</span>
        </div>
        <p class="repo-summary">${escapeHtml(summary)}</p>
        ${tagMarkup}
        <div class="repo-links">
          ${liveLink}
          <a href="${escapeHtml(repo.html_url)}" target="_blank" rel="noreferrer">저장소</a>
          ${articleLink}
          ${extraLinkMarkup}
        </div>
      </article>
    `;
  }

  function renderStats(repos, message) {
    const demos = repos.filter((repo) => Boolean((repoNotes[repo.name] && repoNotes[repo.name].liveUrl) || repo.homepage)).length;
    const stars = repos.reduce((sum, repo) => sum + (repo.stargazers_count || 0), 0);

    repoCount.textContent = String(repos.length);
    demoCount.textContent = String(demos);
    starCount.textContent = String(stars);
    syncNote.textContent = message;
  }

  function renderRepos(repos, message) {
    const sorted = sortRepos(repos);
    repoGrid.innerHTML = sorted.map(buildRepoCard).join("");
    renderStats(sorted, message);
  }

  async function loadRepos() {
    try {
      const response = await fetch(`https://api.github.com/users/${username}/repos?per_page=100&sort=updated`, {
        headers: {
          Accept: "application/vnd.github+json"
        }
      });

      if (!response.ok) {
        throw new Error(`GitHub API request failed: ${response.status}`);
      }

      const repos = await response.json();
      const publicRepos = repos.filter((repo) => !repo.fork);
      renderRepos(publicRepos, "GitHub 공개 저장소를 실시간으로 반영했습니다.");
    } catch (error) {
      renderRepos(fallbackRepos, "실시간 동기화에 실패해 마지막으로 확인한 공개 저장소 목록을 표시합니다.");
      console.error(error);
    }
  }

  loadRepos();
})();
