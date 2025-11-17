export function decodeRef(value = '') {
  try {
    return decodeURIComponent(value);
  } catch (err) {
    return value;
  }
}

export function findDatabaseFileMention(text, agent) {
  if (!text || !agent?.database?.length) return null;
  const regex = /!\[([^\]]*)\]\(([^)]+)\)/g;
  let match;
  while ((match = regex.exec(text)) !== null) {
    const altText = (match[1] || '').trim();
    const rawRef = (match[2] || '').trim();
    if (!rawRef) continue;
    const decodedRef = decodeRef(rawRef);
    const normalizedTargets = [rawRef, decodedRef].map((val) =>
      (val || '').toLowerCase(),
    );
    const candidate = agent.database.find((file) => {
      const aliases = [file.storedName, file.originalName, file.id]
        .filter(Boolean)
        .map((val) => val.toLowerCase());
      return aliases.some((alias) =>
        normalizedTargets.some(
          (target) => target === alias || target.includes(alias),
        ),
      );
    });
    if (candidate) {
      return { file: candidate, token: match[0], altText };
    }
  }
  return null;
}
