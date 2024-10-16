import templates from "./templates.json";

export type Templates = typeof templates;
export type TemplateId = keyof Templates;
export type TemplateConfig = Templates[TemplateId];

export default templates;
