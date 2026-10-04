import React, { useEffect, useState } from 'react';

export default function Contributors() {
  const [authors, setAuthors] = useState([]);
  const [loading, setLoading] = useState(true);

  const REPO_OWNER = 'ICanGamezMC';
  const REPO_NAME = 'datapacker-s-guide-to-minecraft';

  useEffect(() => {
    const controller = new AbortController();

    async function fetchContributors() {
      try {
        const allContributors = [];
        const perPage = 100;

        // GitHub paginates contributor results.
        for (let page = 1; ; page++) {
          const params = new URLSearchParams({
            per_page: String(perPage),
            page: String(page),
          });

          const url =
            `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contributors?${params}`;

          const response = await fetch(url, {
            signal: controller.signal,
            headers: {
              Accept: 'application/vnd.github+json',
            },
          });

          let data;

          try {
            data = await response.json();
          } catch {
            throw new Error(
              `GitHub returned an invalid response (HTTP ${response.status}).`
            );
          }

          if (!response.ok) {
            if (response.status === 403 || response.status === 429) {
              console.error(
                'Contributors: GitHub API rate limit reached.',
                data
              );
              return;
            }

            if (response.status === 404) {
              console.error(
                'Contributors: Repository not found.',
                data
              );
              return;
            }

            throw new Error(
              `GitHub API error ${response.status}: ${
                data?.message || 'Unknown error'
              }`
            );
          }

          if (!Array.isArray(data)) {
            console.error(
              'Contributors: Unexpected GitHub response:',
              data
            );
            return;
          }

          allContributors.push(...data);

          // Last page reached.
          if (data.length < perPage) {
            break;
          }
        }

        // GitHub already returns contributors uniquely,
        // but deduplicate just in case.
        const uniqueContributors = [];
        const seen = new Set();

        for (const contributor of allContributors) {
          if (!contributor?.login) {
            continue;
          }

          if (seen.has(contributor.login)) {
            continue;
          }

          seen.add(contributor.login);
          uniqueContributors.push(contributor);
        }

        console.log(
          'Contributors: Repository contributors:',
          uniqueContributors
        );

        setAuthors(uniqueContributors);
      } catch (error) {
        if (error.name === 'AbortError') {
          return;
        }

        console.error(
          'Contributors: Failed to fetch GitHub contributors:',
          error
        );
      } finally {
        setLoading(false);
      }
    }

    fetchContributors();

    return () => controller.abort();
  }, []);

  if (loading || !authors.length) {
    return null;
  }

  return (
    <div
      style={{
        marginTop: '2rem',
        borderTop: '1px solid var(--ifm-hr-border-color)',
        paddingTop: '1rem',
      }}
    >
      <h4 style={{ marginBottom: '1rem' }}>
        Wiki Contributors
      </h4>

      <div
        style={{
          display: 'flex',
          gap: '10px',
          flexWrap: 'wrap',
        }}
      >
        {authors.map((author) => (
          <a
            key={author.id ?? author.login}
            href={author.html_url}
            target="_blank"
            rel="noopener noreferrer"
            title={`${author.login} — ${author.contributions} contributions`}
          >
            <img
              src={author.avatar_url}
              width="40"
              height="40"
              loading="lazy"
              style={{
                borderRadius: '50%',
                border: '2px solid var(--ifm-color-emphasis-300)',
                backgroundColor: 'var(--ifm-background-color)',
                display: 'block',
              }}
              alt={author.login}
            />
          </a>
        ))}
      </div>
    </div>
  );
}