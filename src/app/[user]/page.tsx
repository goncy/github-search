import {Suspense} from "react";

import {RepositoryLanguages} from "../_components/repository-languages";

export interface Repository {
  name: string;
  description: string;
  url: string;
  id: string;
  stargazers_count: number;
  forks_count: number;
  owner: Owner;
}

export interface Owner {
  name: string;
  login: string;
  avatar_url: string;
  followers: number;
  following: number;
  bio: string;
}

export interface User {
  name: string;
  login: string;
  avatar_url: string;
  followers: number;
  following: number;
  bio: string;
}

const REPO_COUNT = 3;

function RepositoriesLoading() {
  return (
    <div className="space-y-4">
      <div className="animate-pulse space-y-4 rounded-lg border border-gray-200 p-4 dark:border-gray-700">
        <div className="h-4 w-3/4 rounded bg-gray-200 dark:bg-gray-800" />
        <div className="h-4 w-1/2 rounded bg-gray-200 dark:bg-gray-800" />
        <div className="h-4 w-2/3 rounded bg-gray-200 dark:bg-gray-800" />
      </div>
      <div className="animate-pulse space-y-4 rounded-lg border border-gray-200 p-4 dark:border-gray-700">
        <div className="h-4 w-3/4 rounded bg-gray-200 dark:bg-gray-800" />
        <div className="h-4 w-1/2 rounded bg-gray-200 dark:bg-gray-800" />
        <div className="h-4 w-2/3 rounded bg-gray-200 dark:bg-gray-800" />
      </div>
      <div className="animate-pulse space-y-4 rounded-lg border border-gray-200 p-4 dark:border-gray-700">
        <div className="h-4 w-3/4 rounded bg-gray-200 dark:bg-gray-800" />
        <div className="h-4 w-1/2 rounded bg-gray-200 dark:bg-gray-800" />
        <div className="h-4 w-2/3 rounded bg-gray-200 dark:bg-gray-800" />
      </div>
    </div>
  );
}

async function StarredRepositories({user}: {user: string}) {
  const stars = await fetch(`https://api.github.com/users/${user}/starred?per_page=${REPO_COUNT}`, {
    next: {revalidate: 60 * 60},
  }).then((res) => res.json() as Promise<Repository[]>);

  return (
    <div className="space-y-4">
      {stars.map((repository) => (
        <a key={repository.id} className="block" href={repository.url}>
          <div className="rounded-lg border border-gray-200 p-4 transition-colors hover:bg-gray-100 dark:border-gray-700 dark:hover:bg-gray-800">
            <h3 className="text-lg font-bold">{repository.name}</h3>
            <p className="text-gray-500 dark:text-gray-400">{repository.description}</p>
            <div className="mt-4 flex items-center space-x-6">
              <div className="focus:ring-ring bg-primary text-primary-foreground hover:bg-primary/80 inline-flex items-center rounded-full border border-transparent px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2">
                <Suspense fallback={<div className="h-4 w-3/4 rounded bg-gray-200 " />}>
                  <RepositoryLanguages repository={repository.name} user={repository.owner.login} />
                </Suspense>
              </div>
              <div className="flex items-center space-x-2">
                <svg
                  className="h-5 w-5"
                  fill="none"
                  height="24"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  width="24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                </svg>
                <span>{repository.stargazers_count} stars</span>
              </div>
              <div className="flex items-center space-x-2">
                <svg
                  className="h-5 w-5"
                  fill="none"
                  height="24"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  width="24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle cx="12" cy="18" r="3" />
                  <circle cx="6" cy="6" r="3" />
                  <circle cx="18" cy="6" r="3" />
                  <path d="M18 9v1a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V9" />
                  <path d="M12 12v3" />
                </svg>
                <span>{repository.forks_count} forks</span>
              </div>
            </div>
          </div>
        </a>
      ))}
    </div>
  );
}

async function TopRepositories({user}: {user: string}) {
  const repositories = await fetch(
    `https://api.github.com/search/repositories?q=org:${user}&sort=stars&order=desc&per_page=${REPO_COUNT}`,
    {next: {revalidate: 60 * 60 * 24}},
  )
    .then((res) => res.json() as Promise<{items: Repository[]}>)
    .then((data) => data.items);

  return (
    <div className="space-y-4">
      {repositories.map((repository) => (
        <a key={repository.id} className="block" href={repository.url}>
          <div className="rounded-lg border border-gray-200 p-4 transition-colors hover:bg-gray-100 dark:border-gray-700 dark:hover:bg-gray-800">
            <h3 className="text-lg font-bold">{repository.name}</h3>
            <p className="text-gray-500 dark:text-gray-400">{repository.description}</p>
            <div className="mt-4 flex items-center space-x-6">
              <div className="focus:ring-ring bg-primary text-primary-foreground hover:bg-primary/80 inline-flex items-center rounded-full border border-transparent px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2">
                <Suspense fallback={<div className="h-4 w-3/4 rounded bg-gray-200 " />}>
                  <RepositoryLanguages repository={repository.name} user={user} />
                </Suspense>
              </div>
              <div className="flex items-center space-x-2">
                <svg
                  className="h-5 w-5"
                  fill="none"
                  height="24"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  width="24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                </svg>
                <span>{repository.stargazers_count} stars</span>
              </div>
              <div className="flex items-center space-x-2">
                <svg
                  className="h-5 w-5"
                  fill="none"
                  height="24"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  width="24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle cx="12" cy="18" r="3" />
                  <circle cx="6" cy="6" r="3" />
                  <circle cx="18" cy="6" r="3" />
                  <path d="M18 9v1a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V9" />
                  <path d="M12 12v3" />
                </svg>
                <span>{repository.forks_count} forks</span>
              </div>
            </div>
          </div>
        </a>
      ))}
    </div>
  );
}

export default async function UserPage({params: {user}}: {params: {user: string}}) {
  const owner = await fetch(`https://api.github.com/users/${user}`).then(
    (res) => res.json() as Promise<User>,
  );

  return (
    <div className="bg-card text-card-foreground mx-auto shadow-sm" data-v0-t="card">
      <div className="space-y-6 border-b border-gray-700 py-6">
        <div className="flex items-center space-x-6">
          <span className="relative flex h-24 w-24 shrink-0 overflow-hidden rounded-full">
            <img alt={owner.name} className="h-24 w-24 rounded-full" src={owner.avatar_url} />
          </span>
          <div className="space-y-1">
            <h1 className="text-2xl font-bold">{owner.name}</h1>
            <p className="text-gray-500 dark:text-gray-400">@{owner.login}</p>
          </div>
        </div>
        <p>{owner.bio}</p>
        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-2">
            <svg
              className="h-5 w-5"
              fill="none"
              height="24"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              width="24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
              <path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
            <span>{owner.followers} followers</span>
          </div>
          <div className="flex items-center space-x-2">
            <svg
              className="h-5 w-5"
              fill="none"
              height="24"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              width="24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
              <path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
            <span>{owner.following} following</span>
          </div>
        </div>
      </div>
      <div className="space-y-6 py-6">
        <h2 className="text-xl font-bold">Top repositories</h2>
        <Suspense fallback={<RepositoriesLoading />}>
          <TopRepositories user={user} />
        </Suspense>
      </div>
      <div className="space-y-6 py-6">
        <h2 className="text-xl font-bold">Starred</h2>
        <Suspense fallback={<RepositoriesLoading />}>
          <StarredRepositories user={user} />
        </Suspense>
      </div>
    </div>
  );
}
