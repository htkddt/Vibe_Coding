import { articles, guides } from '../../../mocks/help.js';
export async function getHelp() { return { guides: [...guides], articles: [...articles] }; }
