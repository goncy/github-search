import type {FC} from "react";

interface RepositoryLanguagesProps {
  repository: string;
  user: string;
}

export const RepositoryLanguages: FC<RepositoryLanguagesProps> = async ({repository, user}) => {
  const repositoryLanguages = await fetch(
    `https://api.github.com/repos/${user}/${repository}/languages`,
  ).then((res) => res.json() as Promise<Record<string, number>>);

  const languages = Object.keys(repositoryLanguages);

  return (
    <div className="flex flex-wrap gap-2">
      {languages.map((language) => (
        <div
          key={language}
          className="rounded bg-gray-400 px-2 py-1 text-xs font-medium text-white"
        >
          {language}
        </div>
      ))}
    </div>
  );
};
