import React, {useMemo, useState} from "react";

function escapeRegExp(string ){
    return string.replace (/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function escapeHtml(unsafe){
    return unsafe
    .replace (/&/g, "&amp;")
    .replace (/</g, "&lt;")
    .replace (/>/g, "&gt;")
    .replace (/"/g, "&quot;")
    .replace (/'/g, "&#039;");
}

function highlighMatches (text, terms){
    if (!terms.length) return [text];
    const sorted = [...terms].sort ((a, b)=>b.length - a.length);
    const pattern = sorted.map(escapeRegExp).join("|");
    const regex = new RegExp(pattern, "gi");

    const nodes = [];
    let lastIndex = 0;
    let match;

    while ((match = regex.exec (text)) !== null) {
        const start = match.index;
        const end = regex.lastIndex;
        if (start > lastIndex){
            nodes.push (text.slice (lastIndex, start));
        }
        nodes.push (<mark key={lastIndex} className="sh-highlight">
        {text.slice(start, end)}
        </mark>);
        lastIndex = end;
    }
    if (lastIndex < text.length) nodes.push (text.slice(lastIndex));
    return nodes;
}

export default function search ({items = []}){
    const [query, setQuery] = useState ("");
    const terms = useMemo (
        () => 
            query
        .split (/\s+/)
        .map ((t) => t.trim())
        .filter(Boolean),
        [query]
    );
    const results = useMemo (()=>{
        if (!terms.length) return items;
        const pattern = new RegExp (terms.map (escapeRegExp).join ("|"), "i");
        return items.filter ((it)=> pattern.test (it.text || it));
    },
    [items, terms]);
    return (
        <div className="sh-container">
            <input 
            value = {query}
            onChange={(e) => setQuery (e.target.value)}
            className="sh-input"
            />
            <ul className="sh-results"> 
            {results.map ((it, idx)=> {
                const text = it.text || it;
                return <li key = {idx}>{highlighMatches(text, terms)}</li>
            })
            }

            </ul>
        </div>
    );
};
