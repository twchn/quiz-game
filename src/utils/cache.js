export function setLocal(name, content) {
  if (!name) return;
  localStorage.setItem(name, JSON.stringify(content));
}

export function getLocal(name) {
  if (!name) return null;
  return JSON.parse(localStorage.getItem(name));
}
