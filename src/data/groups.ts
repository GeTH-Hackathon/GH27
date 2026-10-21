// Group colours are CSS tokens (src/css/custom.css), so they follow the light/dark theme.
// 'ink' follows the theme; on the always-dark Data panel it is drawn in panel text.
const INK = 'var(--ink)';
const PANEL_TEXT = 'var(--panel-text)';

// One tint per disease group, from the GeTH Slate palette.
export const groupColors: Record<string, string> = {
  'Rare Diseases': 'var(--group-rare)',
  NCD: INK,
  Cancer: 'var(--group-cancer)',
  Pharmacogenomics: 'var(--group-pgx)',
  'Infectious Diseases': 'var(--group-infectious)',
  Popgen: 'var(--group-popgen)',
  'Non-Rare & Non-Cancer': 'var(--group-other)',
};

export function groupColor(group: string, onDark = false): string {
  const c = groupColors[group] ?? 'var(--group-other)';
  return onDark && c === INK ? PANEL_TEXT : c;
}
