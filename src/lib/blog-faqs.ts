import type { FAQItem } from "@/lib/types";

const FAQ_HEADING_RE = /^##\s+Frequently Asked Questions\s*$/im;
const QA_RE = /\*\*(.+?)\*\*[ \t]*\n([\s\S]*?)(?=\n\*\*|$)/g;

export function toPlainFaqText(text: string): string {
  return text.replace(/\[([^\]]+)\]\([^)]+\)/g, "$1").replace(/\s+/g, " ").trim();
}

export function extractBlogFaqs(content: string): {
  body: string;
  faqs: FAQItem[];
  footer: string;
} {
  const normalized = content.replace(/\r\n/g, "\n");
  const headingMatch = normalized.match(FAQ_HEADING_RE);

  if (!headingMatch || headingMatch.index == null) {
    return { body: normalized, faqs: [], footer: "" };
  }

  const body = normalized.slice(0, headingMatch.index).trimEnd();
  const rest = normalized.slice(headingMatch.index + headingMatch[0].length);
  const footerIndex = rest.search(/\n---\s*\n/);
  const faqBlock = (footerIndex === -1 ? rest : rest.slice(0, footerIndex)).trim();
  const footer =
    footerIndex === -1
      ? ""
      : rest
          .slice(footerIndex)
          .replace(/^\n?---\s*/, "")
          .replace(/^\*?[—–-]\s*Raviteja Pendari\*?\s*/u, "")
          .trim();

  const faqs: FAQItem[] = [];
  for (const match of faqBlock.matchAll(QA_RE)) {
    const question = match[1]?.trim();
    const answer = match[2]?.trim();
    if (question && answer) {
      faqs.push({ question, answer });
    }
  }

  return { body, faqs, footer };
}
