// Shared content types consumed by section components.
export type Project = {
  slug: string;
  index: number;
  name: string;
  summary: string;
  stack: string[];
  links: { label: string; href: string }[];
};

export type SkillGroup = {
  label: string;
  items: string[];
};
