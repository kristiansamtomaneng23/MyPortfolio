import { useEffect, useState } from "react";

type GitHubRepository = {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  language: string | null;
  stargazers_count: number;
  updated_at: string;
};

const githubUsername = "kristiansamtomaneng23";
const featuredRepositoryName = "myportfolio";
const githubProfileUrl = `https://github.com/${githubUsername}`;

function isGitHubRepository(value: unknown): value is GitHubRepository {
  if (typeof value !== "object" || value === null) {
    return false;
  }

  const repository = value as Record<string, unknown>;
  return (
    typeof repository.id === "number" &&
    typeof repository.name === "string" &&
    (typeof repository.description === "string" || repository.description === null) &&
    typeof repository.html_url === "string" &&
    (typeof repository.language === "string" || repository.language === null) &&
    typeof repository.stargazers_count === "number" &&
    typeof repository.updated_at === "string"
  );
}

export function GitHubProjects() {
  const [repositories, setRepositories] = useState<GitHubRepository[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    async function loadRepositories() {
      try {
        const response = await fetch(
          `https://api.github.com/users/${githubUsername}/repos?sort=updated&per_page=100`,
          {
            headers: { Accept: "application/vnd.github+json" },
            signal: controller.signal,
          },
        );

        if (!response.ok) {
          throw new Error(`GitHub returned HTTP ${response.status}.`);
        }

        const data: unknown = await response.json();
        if (!Array.isArray(data) || !data.every(isGitHubRepository)) {
          throw new Error("GitHub returned an unexpected repository list.");
        }

        setRepositories(data);
      } catch (loadError) {
        if (loadError instanceof DOMException && loadError.name === "AbortError") {
          return;
        }

        setError(loadError instanceof Error ? loadError.message : "Unable to load repositories.");
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    void loadRepositories();
    return () => controller.abort();
  }, []);

  const sortedRepositories = [...repositories].sort((first, second) => {
    const firstIsFeatured = first.name.toLowerCase() === featuredRepositoryName;
    const secondIsFeatured = second.name.toLowerCase() === featuredRepositoryName;
    if (firstIsFeatured !== secondIsFeatured) return firstIsFeatured ? -1 : 1;
    return Date.parse(second.updated_at) - Date.parse(first.updated_at);
  });

  return (
    <section className="section github-section" id="github">
      <div className="container">
        <div className="section-heading text-center">
          <h2>My <span>GitHub</span></h2>
          <p className="section-subtitle">A selection of my public repositories and recent work.</p>
        </div>

        {loading && <p className="github-status" role="status">Loading GitHub repositories...</p>}

        {!loading && error && (
          <div className="github-status" role="alert">
            <p>Couldn&apos;t load repositories: {error}</p>
            <a href={githubProfileUrl} target="_blank" rel="noopener noreferrer">
              Visit my GitHub profile
            </a>
          </div>
        )}

        {!loading && !error && sortedRepositories.length === 0 && (
          <p className="github-status">No public repositories found. Visit my GitHub profile to see more.</p>
        )}

        {!loading && !error && sortedRepositories.length > 0 && (
          <div className="github-grid">
            {sortedRepositories.slice(0, 6).map((repository) => (
              <article className="github-card" key={repository.id}>
                <div>
                  <h3>{repository.name}</h3>
                  <p>{repository.description || "No description provided."}</p>
                </div>
                <div className="github-card-meta">
                  {repository.language && <span>{repository.language}</span>}
                  <span>{repository.stargazers_count} stars</span>
                  <span>Updated {new Date(repository.updated_at).toLocaleDateString()}</span>
                </div>
                <a href={repository.html_url} target="_blank" rel="noopener noreferrer">
                  View repository <span aria-hidden="true">↗</span>
                </a>
              </article>
            ))}
          </div>
        )}

        <div className="text-center mt-4">
          <a className="btn btn-outline-custom" href={githubProfileUrl} target="_blank" rel="noopener noreferrer">
            More on GitHub
          </a>
        </div>
      </div>
    </section>
  );
}
