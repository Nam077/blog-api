const extractLinks = (text: string): string[] => {
    const regex = /https?:\/\/[^\s]+/g;
    const matches = text.match(regex);

    return matches || [];
};

const text = 'This is a sample text with a link: https://example.com. Another link: http://google.com';
const links = extractLinks(text);

console.log(links);
